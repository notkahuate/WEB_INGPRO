const { pool } = require("../configures/db"); // mysql2 pool
require("dotenv").config();

let tableEnsured = false;
const PRODUCT_CACHE_TTL_MS = Number(process.env.PRODUCT_CACHE_TTL_MS || 90000);
let productCache = { at: 0, lean: true, data: null };
let productCacheInflight = null;
let sitemapCache = { at: 0, data: null };
let sitemapCacheInflight = null;

// Comprueba que la tabla de Strapi existe. No la crea: el esquema lo gestiona Strapi.
async function ensureTableExists() {
  if (tableEnsured) return;
  await pool.execute("SELECT 1 FROM productos LIMIT 1");
  tableEnsured = true;
}

// Campos del catálogo (sin description/especificaciones/tablas).
// imagenes_url se lee solo para sacar la 1ª imagen y no se envía completa al cliente.
const CATALOG_SELECT = `
  item_id, name, brand, rate, stock_on_hand, sku, status,
  cf_marca, cf_categoria, cf_subcategoria, cf_category, cf_item,
  origen, imagen_url, image_name, imagenes_url, categoria, last_modified_time
`;

function resolveCatalogImageUrl(product) {
  if (product?.imagen_url && String(product.imagen_url).trim()) {
    return String(product.imagen_url).trim();
  }
  if (!product?.imagenes_url) return null;
  try {
    const parsed =
      typeof product.imagenes_url === "string"
        ? JSON.parse(product.imagenes_url)
        : product.imagenes_url;
    if (Array.isArray(parsed) && parsed.length) {
      const first = parsed[0];
      if (typeof first === "string" && first.trim()) return first.trim();
      if (first && typeof first.url === "string") return first.url;
      if (first && typeof first.image_url === "string") return first.image_url;
    }
    if (typeof parsed === "string" && parsed.trim()) return parsed.trim();
  } catch {
    if (typeof product.imagenes_url === "string" && product.imagenes_url.trim()) {
      return product.imagenes_url.trim();
    }
  }
  return null;
}

function toCatalogProduct(p) {
  const imagenUrl = resolveCatalogImageUrl(p);
  // Compatibilidad con home/compras: siguen leyendo imagenes_url[0]
  const imagenesUrl = imagenUrl ? [imagenUrl] : [];
  return {
    id: p.id ?? null,
    item_id: p.item_id,
    name: p.name,
    brand: p.brand,
    rate: p.rate,
    stock_on_hand: p.stock_on_hand,
    sku: p.sku,
    status: p.status,
    cf_marca: p.cf_marca,
    cf_categoria: p.cf_categoria,
    cf_subcategoria: p.cf_subcategoria,
    cf_category: p.cf_category,
    cf_item: p.cf_item,
    origen: p.origen,
    imagen_url: imagenUrl,
    image_name: p.image_name,
    imagenes_url: imagenesUrl,
    categoria: p.categoria,
    last_modified_time: p.last_modified_time,
  };
}

// 📦 Obtener productos locales (MYSQL) — listado lean por defecto
async function loadLocalProducts({ lean = true } = {}) {
  await ensureTableExists();

  if (lean) {
    try {
      const [rows] = await pool.execute(
        `SELECT ${CATALOG_SELECT} FROM productos ORDER BY last_modified_time DESC`
      );
      return rows.map(toCatalogProduct);
    } catch (leanErr) {
      console.warn(
        "⚠️ SELECT lean falló, usando SELECT * recortado:",
        leanErr.message
      );
    }
  }

  const [rows] = await pool.execute(
    "SELECT * FROM productos ORDER BY last_modified_time DESC"
  );

  if (!lean) return rows;
  return rows.map(toCatalogProduct);
}

async function getLocalProducts({ lean = true } = {}) {
  const now = Date.now();
  if (
    productCache.data &&
    productCache.lean === lean &&
    now - productCache.at < PRODUCT_CACHE_TTL_MS
  ) {
    return productCache.data;
  }

  if (productCacheInflight) return productCacheInflight;

  productCacheInflight = loadLocalProducts({ lean })
    .then((data) => {
      productCache = { at: Date.now(), lean, data };
      return data;
    })
    .finally(() => {
      productCacheInflight = null;
    });

  return productCacheInflight;
}

function slugifyProductText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function isOpaqueProductToken(value) {
  const token = String(value || "").trim();
  if (!token) return true;
  return /^[a-f0-9]{10,}$/i.test(token) || /^\d{8,}$/.test(token);
}

/** Extrae la referencia/modelo desde el nombre (ej. 3051T, SP400-SW). */
function extractModelFromName(name) {
  const cleaned = String(name || "")
    .replace(/[™®©]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "";

  const patterns = [
    /\b([A-Za-z]{1,8}-?\d{2,6}[A-Za-z0-9-]{0,16})\b/,
    /\b(\d{3,6}[A-Za-z]{1,6}\d{0,4}[A-Za-z0-9-]{0,12})\b/,
  ];

  for (const re of patterns) {
    const match = cleaned.match(re);
    if (match && match[1] && match[1].length >= 3 && match[1].length <= 28) {
      return match[1];
    }
  }

  const token = cleaned
    .split(/[\s,/|]+/)
    .map((t) => t.replace(/[^A-Za-z0-9-]/g, ""))
    .find((t) => /[A-Za-z]/.test(t) && /\d/.test(t) && t.length >= 3 && t.length <= 28);

  return token || "";
}

function extractProductModel(product) {
  if (!product) return "modelo";

  const explicit = product.modelo || product.model || product.cf_modelo;
  if (explicit && String(explicit).trim()) {
    return String(explicit).trim();
  }

  const fromName = extractModelFromName(product.name);
  if (fromName) return fromName;

  const code = String(
    product.sku ||
      product.cf_codigo ||
      product.codigo ||
      product.code ||
      ""
  ).trim();
  if (code && !isOpaqueProductToken(code)) return code;

  return String(product.item_id || product.id || "modelo");
}

function getProductBrandLabel(product) {
  return String(
    product?.brand || product?.cf_marca || product?.marca || "marca"
  ).trim() || "marca";
}

function getProductCategoryLabel(product) {
  const raw = String(
    product?.categoria ||
      product?.cf_categoria ||
      product?.cf_category ||
      product?.category ||
      "general"
  ).trim() || "general";

  // Quita códigos de taxonomía al final (ej. "Oil Pressure Valves E006B" → sin E006B)
  return stripCategoryTaxonomyCode(raw) || "general";
}

/** Elimina códigos tipo E006B / A12 / (Z001) al final del nombre de categoría */
function stripCategoryTaxonomyCode(label) {
  return String(label || "")
    .replace(/[\s\-_/]*[(\[]?\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*[)\]]?\s*$/g, "")
    .replace(/\s*[|–—-]\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*$/g, "")
    .trim();
}

/** Slug de categoría sin sufijos de código (-e006b, etc.) */
function slugifyCategorySegment(label) {
  const cleaned = stripCategoryTaxonomyCode(label);
  let slug = slugifyProductText(cleaned);
  // Por si el código ya venía pegado en el slug
  slug = slug.replace(/-[a-z]{1,3}\d{2,5}[a-z]{0,2}$/i, "");
  return slug || "general";
}

/** Segmentos SEO: marca / modelo / familia(categoría) */
function buildProductPathSegments(product) {
  return {
    brand: slugifyProductText(getProductBrandLabel(product)) || "marca",
    model: slugifyProductText(extractProductModel(product)) || "modelo",
    category: slugifyCategorySegment(getProductCategoryLabel(product)) || "general",
  };
}

/** Canonical: marca/modelo/categoria (para /product/... y /producto/...) */
function buildProductSlug(product) {
  if (!product) return "";
  const { brand, model, category } = buildProductPathSegments(product);
  return `${brand}/${model}/${category}`;
}

/** Slug antiguo (nombre-codigo) para redirects 301 */
function buildLegacyNameCodeSlug(product) {
  if (!product) return "";

  const nameSlug = slugifyProductText(product.name);
  const code = String(
    product.sku ||
      product.cf_codigo ||
      product.codigo ||
      product.code ||
      ""
  ).trim();
  const codeSlug = slugifyProductText(code);
  const itemIdSlug = slugifyProductText(product.item_id || product.id || "");

  if (nameSlug && codeSlug && !isOpaqueProductToken(code)) {
    if (nameSlug === codeSlug || nameSlug.endsWith(`-${codeSlug}`)) {
      return nameSlug;
    }
    return `${nameSlug}-${codeSlug}`;
  }

  if (nameSlug) return nameSlug;
  if (codeSlug && !isOpaqueProductToken(code)) return codeSlug;
  return itemIdSlug || "producto";
}

function legacySlugifyProductText(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function legacyBuildProductSlug(product) {
  if (!product) return "";

  const nameSlug = legacySlugifyProductText(product.name);
  const code = String(
    product.sku ||
      product.cf_codigo ||
      product.codigo ||
      product.code ||
      ""
  ).trim();
  const codeSlug = legacySlugifyProductText(code);
  const itemIdSlug = legacySlugifyProductText(
    product.item_id || product.id || ""
  );

  if (nameSlug && codeSlug && !isOpaqueProductToken(code)) {
    if (nameSlug === codeSlug || nameSlug.endsWith(`-${codeSlug}`)) {
      return nameSlug;
    }
    return `${nameSlug}-${codeSlug}`;
  }

  if (nameSlug) return nameSlug;
  if (codeSlug && !isOpaqueProductToken(code)) return codeSlug;
  return itemIdSlug || "producto";
}

function productSlugCandidates(product) {
  const candidates = new Set();
  const canonical = buildProductSlug(product);
  if (canonical) candidates.add(canonical);

  const legacyNameCode = buildLegacyNameCodeSlug(product);
  if (legacyNameCode) candidates.add(legacyNameCode);

  const legacyCanonical = legacyBuildProductSlug(product);
  if (legacyCanonical) candidates.add(legacyCanonical);

  const segs = buildProductPathSegments(product);
  if (segs.model) candidates.add(segs.model);

  const nameSlug = slugifyProductText(product.name);
  const skuSlug = slugifyProductText(product.sku);
  const itemIdSlug = slugifyProductText(product.item_id || product.id);
  const legacyNameSlug = legacySlugifyProductText(product.name);

  [nameSlug, skuSlug, itemIdSlug, legacyNameSlug].forEach((value) => {
    if (value) candidates.add(value);
  });

  return candidates;
}

function findProductByPathSegments(products, brand, model, category) {
  const b = slugifyProductText(brand);
  const m = slugifyProductText(model);
  const c = slugifyCategorySegment(category);
  if (!m) return null;

  const exact = products.find((product) => {
    const segs = buildProductPathSegments(product);
    return segs.brand === b && segs.model === m && segs.category === c;
  });
  if (exact) return exact;

  const byBrandModel = products.find((product) => {
    const segs = buildProductPathSegments(product);
    return segs.brand === b && segs.model === m;
  });
  if (byBrandModel) return byBrandModel;

  const byModel = products.filter((product) => {
    const segs = buildProductPathSegments(product);
    return segs.model === m;
  });
  if (byModel.length === 1) return byModel[0];

  return null;
}

function findProductBySlug(products, slug) {
  const raw = String(slug || "").trim().replace(/^\/+|\/+$/g, "");
  if (!raw) return null;

  const parts = raw.split("/").filter(Boolean).map((p) => decodeURIComponent(p));

  if (parts.length >= 3) {
    const found = findProductByPathSegments(
      products,
      parts[0],
      parts[1],
      parts.slice(2).join("-")
    );
    if (found) return found;
  }

  const normalized = slugifyProductText(parts.length === 1 ? parts[0] : raw);
  if (!normalized) return null;

  return (
    products.find((product) => productSlugCandidates(product).has(normalized)) ||
    products.find((product) =>
      productSlugCandidates(product).has(slugifyProductText(parts[parts.length - 1]))
    ) ||
    null
  );
}

// 🔎 Producto por ID
async function getProductById(itemId) {
  try {
    await ensureTableExists();

    const [rows] = await pool.execute(
      "SELECT * FROM productos WHERE item_id = ? LIMIT 1",
      [itemId]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("❌ Error getProductById:", error.message);
    throw error;
  }
}

async function findLocalProductBySlug(slug) {
  const products = await getLocalProducts();
  return findProductBySlug(products, slug);
}

async function getSitemapProductRows() {
  const now = Date.now();
  if (sitemapCache.data && now - sitemapCache.at < PRODUCT_CACHE_TTL_MS) {
    return sitemapCache.data;
  }
  if (sitemapCacheInflight) return sitemapCacheInflight;

  sitemapCacheInflight = (async () => {
    try {
      await ensureTableExists();
      const [rows] = await pool.execute(
        `SELECT item_id, name, brand, sku, cf_marca, cf_categoria, cf_category, categoria, last_modified_time
         FROM productos`
      );
      const data = Array.isArray(rows) ? rows : [];
      sitemapCache = { at: Date.now(), data };
      return data;
    } catch (error) {
      console.error("❌ Error getSitemapProductRows:", error.message);
      return sitemapCache.data || [];
    }
  })().finally(() => {
    sitemapCacheInflight = null;
  });

  return sitemapCacheInflight;
}

module.exports = {
  getLocalProducts,
  getProductById,
  getSitemapProductRows,
  slugifyProductText,
  extractProductModel,
  buildProductPathSegments,
  buildProductSlug,
  buildLegacyNameCodeSlug,
  findProductBySlug,
  findLocalProductBySlug,
};
