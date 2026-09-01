require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require("fs");
const vm = require("vm");

const { testConnection } = require('./configures/db');

const userRoutes = require('./routes/UserRoutes.js');
const productRoutes = require('./routes/ProductRoutes.js');
const { findLocalProductBySlug, buildProductSlug, getLocalProducts, getSitemapProductRows } = require('./models/ProductModel');

const cotizacionRoutes = require("./routes/CotizacionRoutes.js");
const authRoutes = require("./routes/AuthRoutes");

const cotizacionRoutes2 = require("./routes/CrearCotizacionRoutes.js");
const empresaRoutes = require("./routes/CotizacionRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("🔥 NODE INICIADO");

/** URL pública del sitio */
const SITE_ORIGIN =
  process.env.PUBLIC_SITE_URL ||
  "https://ingprosuppliers.com";

// ======================================================
// HELPERS
// ======================================================

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugToTitle(slug) {
  return String(slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

// ======================================================
// HTML SEO
// ======================================================

function renderSeoLanding({
  title,
  description,
  canonicalPath,
  h1,
  bodyParagraphs,
  bodyHtml,
  ctaHref,
  ctaLabel,
  breadcrumbItems,
  redirectUrl,
}) {

  const canonicalUrl =
    `${SITE_ORIGIN}${canonicalPath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: "es",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((b, i) => {
          const item = {
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
          };

          if (b.path) {
            item.item = `${SITE_ORIGIN}${b.path}`;
          }

          return item;
        }),
      },
    ],
  };

  const crumbs = breadcrumbItems
    .map((b, i) => {
      if (b.path && i < breadcrumbItems.length - 1) {
        return `
<a href="${escapeHtml(b.path)}">
${escapeHtml(b.name)}
</a>
`;
      }

      return `<span>${escapeHtml(b.name)}</span>`;
    })
    .join(" · ");

  const paras = bodyParagraphs
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n");

  return `
<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>${escapeHtml(title)}</title>

<meta
  name="description"
  content="${escapeHtml(description)}"
/>

<meta
  name="robots"
  content="index, follow"
/>

<link
  rel="canonical"
  href="${escapeHtml(canonicalUrl)}"
/>

<meta property="og:type" content="website" />
<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:locale" content="es_ES" />

<script type="application/ld+json">
${JSON.stringify(jsonLd)}
</script>

</head>

<body>

<header>
  <p style="font-size:0.9rem">
    ${crumbs}
  </p>
</header>

<main>

<h1>${escapeHtml(h1)}</h1>

${paras}

${bodyHtml || ""}

<p>
  <a href="${escapeHtml(ctaHref)}">
    ${escapeHtml(ctaLabel)}
  </a>
</p>

</main>

<script>
setTimeout(() => {
  window.location.href =
    "${escapeHtml(redirectUrl || ctaHref)}";
}, 1200);
</script>

</body>
</html>
`;
}

// ======================================================
// CACHE DATASET
// ======================================================

const DATA_CACHE = {
  categorias: null,
};

function loadCategoriasFromSubcategoriasJs() {

  if (DATA_CACHE.categorias) {
    return DATA_CACHE.categorias;
  }

  const dataFilePath = path.join(
    __dirname,
    "subcategorias (1).js"
  );

  const raw = fs.readFileSync(
    dataFilePath,
    "utf8"
  );

  const start = raw.indexOf("const categorias");

  if (start === -1) {
    throw new Error(
      "No se encontró const categorias"
    );
  }

  const endMarker = raw.indexOf(
    "const brands",
    start
  );

  const bracketStart = raw.indexOf("[", start);

  let depth = 0;
  let bracketEnd = -1;

  for (let i = bracketStart; i < endMarker; i++) {

    const ch = raw[i];

    if (ch === "[") {
      depth++;
    }

    else if (ch === "]") {

      depth--;

      if (depth === 0) {
        bracketEnd = i;
        break;
      }
    }
  }

  const arrayLiteral = raw.slice(
    bracketStart,
    bracketEnd + 1
  );

  const categorias =
    vm.runInNewContext(arrayLiteral, {});

  DATA_CACHE.categorias = categorias;

  return categorias;
}

function parseItem(itemStr) {

  const parts =
    String(itemStr || "").split(" - ");

  const nameVisible =
    (parts[0] || "").trim();

  const code =
    (parts[1] || "").trim();

  return {
    nameVisible,
    code,
  };
}

function itemCanonicalSlug(nameVisible, code) {

  const base = slugify(nameVisible);

  if (!code) {
    return base;
  }

  return `${base}-${slugify(code)}`;
}

function findSubcategoriaBySlug(subslug) {

  const categorias =
    loadCategoriasFromSubcategoriasJs();

  for (const cat of categorias) {

    for (const sub of cat.subcategorias || []) {

      if (
        slugify(sub.subtitulo) === subslug
      ) {
        return { cat, sub };
      }
    }
  }

  return null;
}

function findItemBySlug(itemSlug) {

  const categorias =
    loadCategoriasFromSubcategoriasJs();

  let best = null;
  let bestScore = 0;

  for (const cat of categorias) {

    for (const sub of cat.subcategorias || []) {

      for (const item of sub.items || []) {

        const {
          nameVisible,
          code,
        } = parseItem(item);

        if (!nameVisible) {
          continue;
        }

        const baseSlug =
          slugify(nameVisible);

        const canonicalSlug =
          itemCanonicalSlug(
            nameVisible,
            code
          );

        let score = 0;

        if (itemSlug === canonicalSlug) {
          score = 3;
        }

        else if (itemSlug === baseSlug) {
          score = 1;
        }

        if (score > bestScore) {

          bestScore = score;

          best = {
            cat,
            sub,
            itemFull: item,
            nameVisible,
            code,
            canonicalSlug,
          };
        }
      }
    }
  }

  return best;
}

// ======================================================
// SEO ROUTES
// ======================================================

function sendSubcategoriaSeo(req, res) {

  try {

    const slug = req.params.slug;

    const found =
      findSubcategoriaBySlug(slug);

    if (!found) {

      const titulo =
        slugToTitle(slug);

      const canonicalPath =
        `/pages/subcategoria/${slug}`;

      const title =
        `${titulo} | Ingpro Suppliers`;

      const description =
        `Equipos industriales de ${titulo} en Ingpro Suppliers.`;

      const ctaHref =
        `/pages/subcategorias.html?subcategoria=${encodeURIComponent(titulo)}`;

      const html = renderSeoLanding({
        title,
        description,
        canonicalPath,
        h1: titulo,

        bodyParagraphs: [
          `Encuentra equipos relacionados con ${titulo}.`,
        ],

        ctaHref,

        ctaLabel:
          `Ver ${titulo}`,

        redirectUrl: ctaHref,

        breadcrumbItems: [
          {
            name: "Inicio",
            path: "/",
          },
          {
            name: titulo,
            path: null,
          },
        ],
      });

      return res.type("html").send(html);
    }

    const { cat, sub } = found;

    const categoriaPadre =
      cat.titulo;

    const titulo =
      sub.subtitulo;

    const canonicalPath =
      `/pages/subcategoria/${slug}`;

    const title =
      `${titulo} | Ingpro Suppliers`;

    const items =
      sub.items || [];

    const parsedItems =
      items.map((itemFull) => {

        const {
          nameVisible,
          code,
        } = parseItem(itemFull);

        return {
          itemFull,
          nameVisible,
          code,

          canonicalItemSlug:
            itemCanonicalSlug(
              nameVisible,
              code
            ),
        };
      });

    const firstKeywords =
      parsedItems
        .slice(0, 10)
        .map((x) => x.nameVisible)
        .filter(Boolean)
        .join(", ");

    const description =
      `Catálogo de ${titulo} en Ingpro Suppliers. Incluye ${items.length} opciones (${firstKeywords}).`;

    const firstItem =
      parsedItems[0]?.itemFull || titulo;

    const ctaHref =
      `/pages_us/filtrado_us.html` +
      `?categoria=${encodeURIComponent(categoriaPadre)}` +
      `&subcategoria=${encodeURIComponent(titulo)}` +
      `&item=${encodeURIComponent(firstItem)}`;

    const bodyHtml = `
<section>

<h2>
Equipos y soluciones en ${escapeHtml(titulo)}
</h2>

<ul>

${parsedItems.map((x) => {

  const name =
    escapeHtml(x.nameVisible);

  const code =
    x.code
      ? ` <span>(${escapeHtml(x.code)})</span>`
      : "";

  const href =
    `/pages/item/${x.canonicalItemSlug}`;

  return `
<li>
<a href="${href}">
${name}
</a>
${code}
</li>
`;

}).join("\n")}

</ul>

</section>
`;

    const html = renderSeoLanding({
      title,
      description,
      canonicalPath,

      h1: titulo,

      bodyParagraphs: [
        `Explora soluciones industriales de ${titulo}.`,
        "Abre cada opción para ver el catálogo completo.",
      ],

      bodyHtml,

      ctaHref,

      ctaLabel:
        `Ver catálogo de ${titulo}`,

      redirectUrl: ctaHref,

      breadcrumbItems: [
        {
          name: "Inicio",
          path: "/",
        },
        {
          name: categoriaPadre,
          path:
            `/pages/categoria/${slugify(categoriaPadre)}`,
        },
        {
          name: titulo,
          path: null,
        },
      ],
    });

    return res.type("html").send(html);

  } catch (error) {

    console.error(error);

    return res
      .status(500)
      .send("Error interno");
  }
}

function sendItemSeo(req, res) {

  try {

    const slug =
      req.params.slug;

    const found =
      findItemBySlug(slug);

    if (!found) {

      const titulo =
        slugToTitle(slug);

      const canonicalPath =
        `/pages/item/${slug}`;

      const title =
        `${titulo} | Ingpro Suppliers`;

      const description =
        `Equipos industriales relacionados con ${titulo}.`;

      const ctaHref =
        `/pages/compras.html?slug=${encodeURIComponent(slug)}`;

      const html = renderSeoLanding({

        title,

        description,

        canonicalPath,

        h1: titulo,

        bodyParagraphs: [
          `Encuentra ${titulo} en Ingpro Suppliers.`,
        ],

        ctaHref,

        ctaLabel:
          `Ver ${titulo}`,

        redirectUrl: ctaHref,

        breadcrumbItems: [
          {
            name: "Inicio",
            path: "/",
          },
          {
            name: titulo,
            path: null,
          },
        ],
      });

      return res.type("html").send(html);
    }

    const {
      cat,
      sub,
      itemFull,
      nameVisible,
      code,
      canonicalSlug,
    } = found;

    const categoriaPadre =
      cat.titulo;

    const tituloSub =
      sub.subtitulo;

    const canonicalPath =
      `/pages/item/${canonicalSlug}`;

    const title =
      `${nameVisible} | Ingpro Suppliers`;

    const description =
      `${nameVisible} en Ingpro Suppliers. Subcategoría ${tituloSub}.`;

    const ctaHref =
      `/pages_us/filtrado_us.html` +
      `?categoria=${encodeURIComponent(categoriaPadre)}` +
      `&subcategoria=${encodeURIComponent(tituloSub)}` +
      `&item=${encodeURIComponent(itemFull)}`;

    const h1 =
      code
        ? `${nameVisible} (${code})`
        : nameVisible;

    const html = renderSeoLanding({

      title,

      description,

      canonicalPath,

      h1,

      bodyParagraphs: [
        `Encuentra ${nameVisible} dentro de ${tituloSub}.`,
        "Accede al catálogo completo y disponibilidad.",
      ],

      ctaHref,

      ctaLabel:
        `Ver ${nameVisible}`,

      redirectUrl: ctaHref,

      breadcrumbItems: [
        {
          name: "Inicio",
          path: "/",
        },
        {
          name: categoriaPadre,
          path:
            `/pages/categoria/${slugify(categoriaPadre)}`,
        },
        {
          name: tituloSub,
          path:
            `/pages/subcategoria/${slugify(tituloSub)}`,
        },
        {
          name: nameVisible,
          path: null,
        },
      ],
    });

    return res.type("html").send(html);

  } catch (error) {

    console.error(error);

    return res
      .status(500)
      .send("Error interno");
  }
}

function sendCategoriaSeo(req, res) {

  try {

    const slug =
      req.params.slug;

    const titulo =
      slugToTitle(slug);

    const canonicalPath =
      `/pages/categoria/${slug}`;

    const title =
      `${titulo} | Ingpro Suppliers`;

    const description =
      `Explora ${titulo} en Ingpro Suppliers.`;

    const ctaHref =
      `/pages/subcategorias.html` +
      `?subcategoria=${encodeURIComponent(titulo)}`;

    const html = renderSeoLanding({

      title,

      description,

      canonicalPath,

      h1: titulo,

      bodyParagraphs: [
        `Explora la categoría ${titulo}.`,
      ],

      ctaHref,

      ctaLabel:
        `Explorar ${titulo}`,

      redirectUrl: ctaHref,

      breadcrumbItems: [
        {
          name: "Inicio",
          path: "/",
        },
        {
          name: titulo,
          path: null,
        },
      ],
    });

    return res.type("html").send(html);

  } catch (error) {

    console.error(error);

    return res
      .status(500)
      .send("Error interno");
  }
}

function getProductImageUrl(product) {
  if (product.imagen_url && String(product.imagen_url).trim()) {
    return product.imagen_url;
  }

  if (product.image_name && String(product.image_name).trim()) {
    return product.image_name;
  }

  if (product.imagenes_url) {
    try {
      const parsed =
        typeof product.imagenes_url === "string"
          ? JSON.parse(product.imagenes_url)
          : product.imagenes_url;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0];
      }

      if (typeof parsed === "string" && parsed.length > 0) {
        return parsed;
      }
    } catch (error) {
      return product.imagenes_url;
    }
  }

  return `${SITE_ORIGIN}/img/no-image.png`;
}

function resolveLocalizedField(value, lang) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value !== "object") return "";

  const primary = lang === "en" ? value.en : value.es;
  const fallback = lang === "en" ? value.es : value.en;

  if (primary != null && String(primary).trim() !== "") return String(primary);
  if (fallback != null && String(fallback).trim() !== "") return String(fallback);
  return "";
}

function extractProductDescriptionText(product, lang) {
  const raw = product && product.description;
  if (raw == null || raw === "") return product.name || "";

  let data = raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") data = parsed;
    } catch (error) {
      return raw;
    }
  }

  if (
    data &&
    typeof data === "object" &&
    Array.isArray(data.secciones)
  ) {
    const parts = data.secciones
      .map((section) => resolveLocalizedField(section && section.contenido, lang))
      .map((text) => String(text || "").replace(/\s+/g, " ").trim())
      .filter(Boolean);

    if (parts.length) return parts.join(" ");
  }

  if (typeof data === "string") return data;
  return product.name || "";
}

function buildProductSeoHead(product, lang, canonicalPath) {
  const title = `${product.name} | Ingpro Suppliers`;
  const rawDescription = extractProductDescriptionText(product, lang);
  const description = rawDescription
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
  const imageUrl = getProductImageUrl(product);
  const price =
    product.rate != null ? Number(product.rate) : null;
  const locale = lang === "en" ? "en_US" : "es_ES";
  const brandName = product.brand || product.cf_marca || "";
  const categoryName =
    product.categoria ||
    product.cf_categoria ||
    product.cf_category ||
    "";

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: lang === "en" ? "Home" : "Inicio",
      item: `${SITE_ORIGIN}/`,
    },
  ];

  if (brandName) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: brandName,
      item: canonicalUrl,
    });
  }

  if (categoryName) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: categoryName,
      item: canonicalUrl,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: product.name,
    item: canonicalUrl,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: rawDescription.slice(0, 500),
        sku: product.sku || product.item_id,
        mpn: product.sku || product.cf_codigo || undefined,
        image: imageUrl,
        category: categoryName || undefined,
        brand: brandName
          ? {
              "@type": "Brand",
              name: brandName,
            }
          : undefined,
        offers:
          price != null && !Number.isNaN(price)
            ? {
                "@type": "Offer",
                priceCurrency: "USD",
                price: price.toFixed(2),
                availability:
                  Number(product.stock_on_hand) > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                url: canonicalUrl,
              }
            : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    ],
  };

  const safeProductJson = JSON.stringify(product).replace(
    /</g,
    "\\u003c"
  );
  const productSlug = canonicalPath.replace(/^\/(producto|product)\//, "");

  return `
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description || title)}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
<link rel="alternate" hreflang="es" href="${escapeHtml(`${SITE_ORIGIN}/producto/${productSlug}`)}" />
<link rel="alternate" hreflang="en" href="${escapeHtml(`${SITE_ORIGIN}/product/${productSlug}`)}" />
<link rel="alternate" hreflang="x-default" href="${escapeHtml(`${SITE_ORIGIN}/producto/${productSlug}`)}" />
<meta property="og:type" content="product" />
<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description || title)}" />
<meta property="og:image" content="${escapeHtml(imageUrl)}" />
<meta property="og:locale" content="${locale}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description || title)}" />
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<script>window.__BOOTSTRAP_PRODUCT__=${safeProductJson};</script>
`;
}

async function sendProductPage(req, res, lang, slugParam) {
  try {
    const slug = slugParam || req.params.slug;
    const product = await findLocalProductBySlug(slug);

    if (!product) {
      const prefix = lang === "en" ? "product" : "producto";

      return res.status(404).type("html").send(
        renderSeoLanding({
          title: "Producto no encontrado | Ingpro Suppliers",
          description:
            "El producto solicitado no está disponible.",
          canonicalPath: `/${prefix}/${slug}`,
          h1: "Producto no encontrado",
          bodyParagraphs: [
            "Este producto no existe o ya no está disponible.",
          ],
          ctaHref:
            lang === "en"
              ? "/pages_us/productos_us.html"
              : "/pages/productos.html",
          ctaLabel: "Ver catálogo",
          breadcrumbItems: [
            {
              name: lang === "en" ? "Home" : "Inicio",
              path: "/",
            },
            {
              name: "Producto no encontrado",
              path: null,
            },
          ],
        })
      );
    }

    const canonicalSlug = buildProductSlug(product);
    const prefix = lang === "en" ? "product" : "producto";
    const canonicalPath = `/${prefix}/${canonicalSlug}`;
    const incomingSlug = String(slug || "")
      .trim()
      .replace(/^\/+|\/+$/g, "");

    if (incomingSlug !== canonicalSlug) {
      return res.redirect(301, canonicalPath);
    }

    const htmlPath = path.join(
      __dirname,
      lang === "en"
        ? "../../frontend/pages_us/compras_us.html"
        : "../../frontend/pages/compras.html"
    );

    let html = fs.readFileSync(htmlPath, "utf8");
    const seoHead = buildProductSeoHead(
      product,
      lang,
      canonicalPath
    );

    html = html.replace(/<title>[\s\S]*?<\/title>/i, "");
    html = html.replace("</head>", `${seoHead}\n</head>`);

    return res.type("html").send(html);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno");
  }
}

async function handleProductRoute(req, res, lang) {
  const segs = String(req.params[0] || "")
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));

  const prefix = lang === "en" ? "product" : "producto";

  if (segs.length === 0) {
    return res.status(404).send("Not found");
  }

  // Ruta SEO canónica: /product|producto/marca/modelo/categoria
  if (segs.length === 3) {
    return sendProductPage(req, res, lang, segs.join("/"));
  }

  // Slugs antiguos (1 segmento u otras rutas) → 301 a marca/modelo/categoria
  const lookupSlug =
    segs.length === 1 ? segs[0] : segs.join("/");
  const product =
    (await findLocalProductBySlug(lookupSlug)) ||
    (await findLocalProductBySlug(segs[segs.length - 1]));

  if (product) {
    return res.redirect(301, `/${prefix}/${buildProductSlug(product)}`);
  }

  return sendProductPage(req, res, lang, lookupSlug);
}

async function sendSitemap(req, res) {
  const staticUrls = [
    { loc: `${SITE_ORIGIN}/`, priority: "1.0" },
    { loc: `${SITE_ORIGIN}/es`, priority: "0.9" },
    { loc: `${SITE_ORIGIN}/productos`, priority: "0.9" },
    { loc: `${SITE_ORIGIN}/products`, priority: "0.9" },
    { loc: `${SITE_ORIGIN}/pages/brands.html`, priority: "0.7" },
    { loc: `${SITE_ORIGIN}/pages_us/brands_us.html`, priority: "0.7" },
  ];

  const toLastmod = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  };

  const urlXml = (loc, changefreq, priority, lastmod) => `  <url>
    <loc>${escapeHtml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

  try {
    const products = await getSitemapProductRows();
    const seen = new Set();
    const productUrls = [];

    for (const product of products) {
      const slug = buildProductSlug(product);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const lastmod = toLastmod(product.last_modified_time);
      productUrls.push(
        urlXml(`${SITE_ORIGIN}/producto/${slug}`, "weekly", "0.8", lastmod)
      );
      productUrls.push(
        urlXml(`${SITE_ORIGIN}/product/${slug}`, "weekly", "0.7", lastmod)
      );
    }

    const body = [
      ...staticUrls.map((u) => urlXml(u.loc, "weekly", u.priority, "")),
      ...productUrls,
    ].join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

    res.set("Cache-Control", "public, max-age=3600");
    return res.type("application/xml").send(xml);
  } catch (error) {
    console.error("Error generando sitemap:", error);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map((u) => urlXml(u.loc, "weekly", u.priority, "")).join("\n")}
</urlset>`;
    return res.type("application/xml").send(fallback);
  }
}

// ======================================================
// TEST
// ======================================================

app.get('/test', (req, res) => {
  res.send('NODE OK');
});

// ======================================================
// MIDDLEWARES
// ======================================================

app.use(cors());

app.use(express.json());

// ======================================================
// API ROUTES
// ======================================================

console.log('🛠 Cargando rutas de usuario...');

app.use("/api/users", userRoutes);

console.log(
  '✅ Rutas de usuario montadas en /api/users'
);

app.use("/api", empresaRoutes);

app.use(
  "/api/cotizaciones",
  cotizacionRoutes2
);

app.use(
  "/api/products",
  productRoutes
);

console.log(
  '✅ Rutas de productos montadas en /api/products'
);

app.use(
  "/api/cotizacion",
  cotizacionRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

// ======================================================
// SEO ROUTES
// IMPORTANTE: ANTES DEL STATIC
// ======================================================

app.get(
  "/pages/subcategoria/:slug",
  sendSubcategoriaSeo
);

app.get(
  "/pages/subcategorias/:slug",
  sendSubcategoriaSeo
);

app.get(
  "/pages/item/:slug",
  sendItemSeo
);

app.get(
  "/pages/categoria/:slug",
  sendCategoriaSeo
);

// ======================================================
// REDIRECCIONES SEO
// ======================================================

app.get("/subcategoria/:slug", (req, res) => {

  res.redirect(
    301,
    `/pages/subcategoria/${req.params.slug}`
  );
});

app.get("/categoria/:slug", (req, res) => {

  res.redirect(
    301,
    `/pages/categoria/${req.params.slug}`
  );
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(`User-agent: *
Allow: /
Disallow: /pages/carrito
Disallow: /pages/login
Disallow: /pages/usuario
Disallow: /pages/opciones
Disallow: /pages/busquedas
Disallow: /pages_us/carrito
Disallow: /pages_us/login
Disallow: /pages_us/usuario
Disallow: /pages_us/Opciones
Disallow: /pages_us/busqueda

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`);
});

app.get("/sitemap.xml", sendSitemap);

app.get(/^\/product\/(.+)$/, (req, res) =>
  handleProductRoute(req, res, "en")
);

app.get(/^\/producto\/(.+)$/, (req, res) =>
  handleProductRoute(req, res, "es")
);

const FRONTEND_DIR = path.join(__dirname, "../../frontend");

app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "pages_us/Home_us.html"));
});

app.get("/es", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "pages/index.html"));
});

app.get("/productos", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "pages/productos.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "pages_us/productos_us.html"));
});

// ======================================================
// STATIC
// ======================================================

app.use(express.static(FRONTEND_DIR));

// ======================================================
// TEST DB
// ======================================================

testConnection();

// ======================================================
// START SERVER
// ======================================================

const httpServer = app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});

httpServer.keepAliveTimeout = 65000;
httpServer.headersTimeout = 66000;
httpServer.on("error", (err) => {
  console.error("❌ Error al arrancar el servidor:", err.message);
});