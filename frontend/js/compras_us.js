// --- UTILIDADES ---
function getImageUrl(product) {
  if (!product) return '/img/no-image.png';

  if (product.imagen_url && product.imagen_url.trim() !== '') return product.imagen_url;
  if (product.image_name && product.image_name.trim() !== '') return product.image_name;

  if (product.imagenes_url) {
    try {
      if (typeof product.imagenes_url === 'string') {
        const parsed = JSON.parse(product.imagenes_url);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
        if (typeof parsed === 'string' && parsed.length > 0) return parsed;
      } else if (Array.isArray(product.imagenes_url) && product.imagenes_url.length > 0) {
        return product.imagenes_url[0];
      }
    } catch (err) {
      console.warn('⚠️ No se pudo parsear imagenes_url:', err);
      return product.imagenes_url;
    }
  }

  return '/img/no-image.png';
}

/** UI-only English name from cf_item. Keep product.name (Spanish) for cart/quotes. */
function getProductDisplayName(product) {
  if (!product) return '';
  const en = String(product.cf_item || product.nameEn || '').trim();
  if (en) return en;
  return String(product.name || '').trim() || 'Product';
}

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[”"]/g, '"')
    .replace(/®/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text) {
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
  if (!product) return "model";
  const explicit = product.modelo || product.model || product.cf_modelo;
  if (explicit && String(explicit).trim()) return String(explicit).trim();

  const fromName = extractModelFromName(product.name);
  if (fromName) return fromName;

  const code = String(
    product.sku || product.cf_codigo || product.codigo || product.code || ""
  ).trim();
  if (code && !isOpaqueProductToken(code)) return code;

  return String(product.item_id || product.id || "model");
}

function stripCategoryTaxonomyCode(label) {
  return String(label || "")
    .replace(/[\s\-_/]*[(\[]?\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*[)\]]?\s*$/g, "")
    .replace(/\s*[|–—-]\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*$/g, "")
    .trim();
}

function slugifyCategorySegment(label) {
  let slug = slugify(stripCategoryTaxonomyCode(label));
  slug = slug.replace(/-[a-z]{1,3}\d{2,5}[a-z]{0,2}$/i, "");
  return slug || "general";
}

function buildProductPathSegments(product) {
  const brand = slugify(
    product?.brand || product?.cf_marca || product?.marca || "brand"
  ) || "brand";
  const model = slugify(extractProductModel(product)) || "model";
  const category = slugifyCategorySegment(
    product?.categoria ||
      product?.cf_categoria ||
      product?.cf_category ||
      product?.category ||
      "general"
  );
  return { brand, model, category };
}

function buildProductSlug(product) {
  if (!product) return "";
  if (product.slug && String(product.slug).includes("/")) {
    return String(product.slug)
      .split("/")
      .map((p) => slugify(p))
      .filter(Boolean)
      .join("/");
  }
  const { brand, model, category } = buildProductPathSegments(product);
  return `${brand}/${model}/${category}`;
}

function legacySlugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function legacyBuildProductSlug(product) {
  if (!product) return "";
  const nameSlug = legacySlugify(product.name);
  const code = String(
    product.sku ||
      product.cf_codigo ||
      product.codigo ||
      product.code ||
      ""
  ).trim();
  const codeSlug = legacySlugify(code);

  if (nameSlug && codeSlug && !isOpaqueProductToken(code)) {
    if (nameSlug === codeSlug || nameSlug.endsWith(`-${codeSlug}`)) {
      return nameSlug;
    }
    return `${nameSlug}-${codeSlug}`;
  }

  return nameSlug || codeSlug || legacySlugify(product.item_id || product.id || "");
}

function buildProductUrl(product) {
  return `/product/${buildProductSlug(product)}`;
}

/** Hero title like TEHMA mockup: accent on model/reference */
function formatHeroProductTitleHtml(name, product) {
  const raw = String(name || "").trim() || "Product";
  const candidates = [
    String((product && extractProductModel(product)) || extractModelFromName(raw) || "").trim(),
    String(product?.sku || product?.cf_codigo || "").trim(),
  ].filter((value) => value.length >= 2 && !isOpaqueProductToken(value));

  for (const token of candidates) {
    const idx = raw.toLowerCase().indexOf(token.toLowerCase());
    if (idx < 0) continue;
    const before = raw.slice(0, idx);
    const match = raw.slice(idx, idx + token.length);
    const after = raw.slice(idx + token.length);
    return (
      escapeHtml(before) +
      `<span class="accent">${escapeHtml(match)}</span>` +
      escapeHtml(after)
    );
  }

  return escapeHtml(raw);
}

function getProductLeadText(product, maxLen = 260) {
  let text = "";
  const parsed = parseProductJsonField(product?.description);
  const data = parsed || product?.description;

  if (data && typeof data === "object" && Array.isArray(data.secciones)) {
    for (const section of data.secciones) {
      const content = resolveLocalizedText(section && section.contenido);
      if (content) {
        text = content;
        break;
      }
    }
  } else if (typeof product?.description === "string") {
    text = product.description;
  }

  text = String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";
  if (text.length <= maxLen) return text;

  const sliced = text.slice(0, maxLen);
  const lastStop = Math.max(
    sliced.lastIndexOf(". "),
    sliced.lastIndexOf("! "),
    sliced.lastIndexOf("? ")
  );
  if (lastStop > 90) return sliced.slice(0, lastStop + 1).trim();
  return `${sliced.replace(/\s+\S*$/, "").trim()}…`;
}

function renderProductLead(product) {
  const leadEl = document.getElementById("product-lead");
  if (!leadEl) return;
  const lead = getProductLeadText(product);
  if (!lead) {
    leadEl.hidden = true;
    leadEl.textContent = "";
    return;
  }
  leadEl.hidden = false;
  leadEl.textContent = lead;
}

function applyProductTitleScale(nameElement, displayName) {
  if (!nameElement) return;

  nameElement.classList.remove("is-title-md", "is-title-sm", "is-title-xs");
  nameElement.style.fontSize = "";

  const len = String(displayName || nameElement.textContent || "").trim().length;
  if (len > 130) nameElement.classList.add("is-title-xs");
  else if (len > 85) nameElement.classList.add("is-title-sm");
  else if (len > 48) nameElement.classList.add("is-title-md");

  requestAnimationFrame(() => {
    const maxHeight = Math.min(240, Math.round(window.innerHeight * 0.32));
    let size = parseFloat(window.getComputedStyle(nameElement).fontSize);
    const minSize = 18;
    let guard = 24;
    while (nameElement.scrollHeight > maxHeight && size > minSize && guard > 0) {
      size -= 1;
      nameElement.style.fontSize = `${size}px`;
      guard -= 1;
    }
  });
}

function renderProductHeroChrome(product, displayName) {
  const nameElement = document.getElementById("product-name");
  if (nameElement) {
    const titleText =
      displayName || getProductDisplayName(product) || product?.name;
    nameElement.innerHTML = formatHeroProductTitleHtml(titleText, product);
    applyProductTitleScale(nameElement, titleText);
  }

  const eyebrow = document.getElementById("product-eyebrow");
  if (!eyebrow) return;

  const pills = [];
  const category =
    product?.categoria ||
    product?.cf_categoria ||
    product?.cf_category ||
    product?.category ||
    "";
  const brand = product?.cf_marca || product?.brand || "";
  const model = extractProductModel(product);

  if (category) pills.push(String(category).trim());
  if (brand) pills.push(String(brand).trim());
  if (model && !isOpaqueProductToken(model)) pills.push(String(model).trim());

  const unique = [...new Set(pills.filter(Boolean))];
  if (!unique.length) {
    eyebrow.hidden = true;
    eyebrow.innerHTML = "";
    return;
  }

  eyebrow.hidden = false;
  eyebrow.innerHTML = unique
    .slice(0, 4)
    .map((label) => `<span class="pill">${escapeHtml(label)}</span>`)
    .join("");
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseProductJsonField(value) {
  if (value == null || value === "") return null;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch (err) {
    return null;
  }
}

/** Extrae texto localizado desde string plano o { es, en }. */
function resolveLocalizedText(value, preferEnglish) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value !== "object") return "";

  const useEnglish =
    typeof preferEnglish === "boolean"
      ? preferEnglish
      : typeof COMPRAS_IS_ENGLISH !== "undefined" && COMPRAS_IS_ENGLISH;

  const primary = useEnglish ? value.en : value.es;
  const fallback = useEnglish ? value.es : value.en;

  if (primary != null && String(primary).trim() !== "") return String(primary);
  if (fallback != null && String(fallback).trim() !== "") return String(fallback);
  return "";
}

/** Avoid duplicating the section H2 (Description / Descripción). */
function setDescriptionSubtitle(titleEl, title) {
  if (!titleEl) return;
  const clean = String(title || "").trim();
  const isGeneric = /^(description|descripcion)$/i.test(normalizar(clean));
  if (!clean || isGeneric) {
    titleEl.textContent = "";
    titleEl.hidden = true;
    return;
  }
  titleEl.hidden = false;
  titleEl.textContent = clean;
}

function resolveSpecifications(product) {
  const raw = parseProductJsonField(product && product.especificaciones);
  if (!raw) return [];

  const items = [];

  function pushItem(label, value) {
    const cleanLabel = resolveLocalizedText(label).trim();
    const cleanValue = resolveLocalizedText(value).trim();
    if (!cleanLabel && !cleanValue) return;
    items.push({ label: cleanLabel, value: cleanValue });
  }

  function parseEntry(entry) {
    if (entry == null) return;

    if (typeof entry === "string") {
      const match = entry.match(/^([^:]+):\s*(.+)$/);
      if (match) pushItem(match[1], match[2]);
      else pushItem("", entry);
      return;
    }

    if (typeof entry !== "object") return;

    const label =
      entry.label ||
      entry.nombre ||
      entry.name ||
      entry.key ||
      entry.titulo ||
      entry.caracteristica ||
      "";
    const value =
      entry.value ||
      entry.valor ||
      entry.contenido ||
      entry.text ||
      entry.descripcion ||
      "";

    pushItem(label, value);
  }

  if (Array.isArray(raw)) {
    raw.forEach(parseEntry);
    return items;
  }

  if (typeof raw === "object") {
    if (Array.isArray(raw.items)) {
      raw.items.forEach(parseEntry);
      return items;
    }
    if (Array.isArray(raw.especificaciones)) {
      raw.especificaciones.forEach(parseEntry);
      return items;
    }

    Object.entries(raw).forEach(([key, value]) => {
      if (value == null || value === "") return;
      // Permite valores bilingües { es, en } en formato plano clave→valor
      if (typeof value === "object" && value.es == null && value.en == null) return;
      pushItem(key, value);
    });
  }

  return items;
}

function formatSpecsPreview(specs, limit = 5) {
  return specs
    .slice(0, limit)
    .map((spec) => (spec.label ? `${spec.label}: ${spec.value}` : spec.value))
    .join(" | ");
}

function toggleSpecsTabVisibility(hasSpecs) {
  document.querySelectorAll(".js-specs-tab").forEach((btn) => {
    btn.hidden = !hasSpecs;
  });

  const specsSection = document.getElementById("specs");
  if (specsSection) {
    specsSection.hidden = !hasSpecs;
    if (!hasSpecs) specsSection.classList.remove("active");
  }
  updateActiveProductTabOnScroll();
}

function getSpecKpiIcon(label, index = 0) {
  const key = normalizar(label || "");

  if (/eficiencia|efficiency/.test(key)) return "fa-leaf";
  if (/voltaje|voltage|tension/.test(key)) return "fa-bolt";
  if (/proteccion|protection|ip\b/.test(key)) return "fa-shield-halved";
  if (/\bex\b|explosion|marcad|certific/.test(key)) return "fa-certificate";
  if (/temperatura|temperature|ambiente|ambient/.test(key)) return "fa-temperature-half";
  if (/frecuencia|frequency|hz/.test(key)) return "fa-wave-square";
  if (/confiabilidad|reliability/.test(key)) return "fa-shield-heart";
  if (/aplicacion|application/.test(key)) return "fa-chart-column";
  if (/potencia|power|kw/.test(key)) return "fa-gauge-high";
  if (/polo|pole/.test(key)) return "fa-circle-nodes";
  if (/enfriamiento|cooling/.test(key)) return "fa-fan";
  if (/montaje|mounting/.test(key)) return "fa-industry";
  if (/color/.test(key)) return "fa-palette";
  if (/termic|thermal|clase/.test(key)) return "fa-fire";

  if (/tipo de equipo|equipment type|tipo equipo/.test(key)) return "fa-screwdriver-wrench";
  if (/tipo de motor|motor type|tipo motor|\bmotor\b/.test(key)) return "fa-gears";
  if (/marca|brand/.test(key)) return "fa-trademark";
  if (/modelo|model/.test(key)) return "fa-tag";
  if (/componente|component|parts|piezas/.test(key)) return "fa-puzzle-piece";
  if (/capacidad de elevacion|lifting capacity|capacidad elevacion/.test(key)) return "fa-arrow-up-from-bracket";
  if (/capacidad de traccion|pulling capacity|capacidad traccion|traccion/.test(key)) return "fa-link";
  if (/altura|lifting height|height|altura de elevacion/.test(key)) return "fa-ruler-vertical";
  if (/velocidad|lifting speed|speed|velocidad de elevacion/.test(key)) return "fa-gauge";
  if (/capacidad|capacity|carga|load/.test(key)) return "fa-weight-hanging";
  if (/garantia|warranty/.test(key)) return "fa-award";
  if (/material|cast iron|steel|hierro|acero|construccion/.test(key)) return "fa-cubes";
  if (/engranaje|gear|pinion|caja|gearbox/.test(key)) return "fa-gears";
  if (/brazo|arm|cutting|corte|doblado|bending/.test(key)) return "fa-scissors";
  if (/hoist|winch|capstan|polipasto|malacate|cabrestante/.test(key)) return "fa-truck-ramp-box";
  if (/freno|brake|autorenante|self-braking/.test(key)) return "fa-hand";
  if (/control|panel|pendant|mando/.test(key)) return "fa-sliders";
  if (/peso|weight|mass/.test(key)) return "fa-weight-scale";
  if (/dimension|size|tamano|medida/.test(key)) return "fa-ruler-combined";
  if (/serie|series|sku|codigo|code/.test(key)) return "fa-barcode";
  if (/presion|pressure/.test(key)) return "fa-gauge-simple-high";
  if (/caudal|flow/.test(key)) return "fa-water";
  if (/ruido|noise|db/.test(key)) return "fa-volume-high";

  const fallbackIcons = [
    "fa-microchip",
    "fa-gears",
    "fa-industry",
    "fa-cubes",
    "fa-screwdriver-wrench",
    "fa-sliders",
    "fa-compass-drafting",
    "fa-layer-group",
  ];
  return fallbackIcons[Math.abs(Number(index) || 0) % fallbackIcons.length];
}

function resolveProductIndustryKpi(product) {
  if (!product || typeof resolveIndustry !== "function") return null;
  // EN page: industry comes from cf_category
  const raw =
    product.cf_category ||
    product.industryName ||
    product.industry ||
    "";
  const industry = resolveIndustry(raw);
  if (!industry && !String(raw || "").trim()) return null;

  const value = industry
    ? (typeof getIndustryLabel === "function"
        ? getIndustryLabel(industry, true)
        : industry.en)
    : String(raw).trim();

  if (!value) return null;

  return {
    label: "Industry",
    value,
    icon: industry && typeof getIndustryIconClass === "function"
      ? getIndustryIconClass(industry)
      : "fa-industry",
  };
}

function renderSpecsPreview(product) {
  const preview = document.getElementById("product-specs-preview");
  if (!preview) return;

  const MAX_KPI = 7; // total máximo incluyendo industria
  const industryKpi = resolveProductIndustryKpi(product);
  const specs = resolveSpecifications(product).filter((spec) => {
    if (!spec.label && !spec.value) return false;
    // Evitar duplicar industria si también viene en especificaciones
    const label = normalizar(spec.label || "");
    return !/^(industria|industry)$/.test(label);
  });

  if (!specs.length && !industryKpi) {
    preview.hidden = true;
    preview.innerHTML = "";
    return;
  }

  const kpiItems = [];
  if (industryKpi) kpiItems.push(industryKpi);

  // Con industria: máximo 6 specs (7 total). Sin industria: máximo 7 specs.
  const specsLimit = Math.max(0, MAX_KPI - kpiItems.length);
  specs.slice(0, specsLimit).forEach((spec, index) => {
    kpiItems.push({
      label: spec.label || (COMPRAS_IS_ENGLISH ? "Spec" : "Dato"),
      value: spec.value || "—",
      icon: getSpecKpiIcon(spec.label, index),
    });
  });

  const items = kpiItems
    .slice(0, MAX_KPI)
    .map((item) => {
      return (
        `<div class="specs-kpi-item">` +
        `<i class="fa-solid ${item.icon} specs-kpi-icon" aria-hidden="true"></i>` +
        `<div class="specs-kpi-text">` +
        `<strong class="specs-kpi-value">${escapeHtml(item.value)}</strong>` +
        `<span class="specs-kpi-label">${escapeHtml(item.label)}</span>` +
        `</div>` +
        `</div>`
      );
    })
    .join("");

  preview.hidden = false;
  preview.innerHTML = `<div class="specs-kpi-bar" role="list">${items}</div>`;
}

function renderSpecsSection(product) {
  const container = document.getElementById("specsContainer");
  if (!container) return;

  const specs = resolveSpecifications(product);
  toggleSpecsTabVisibility(specs.length > 0);

  if (!specs.length) {
    container.innerHTML = "";
    return;
  }

  const labelHeader = COMPRAS_IS_ENGLISH ? "Characteristic" : "Característica";
  const valueHeader = COMPRAS_IS_ENGLISH ? "Value" : "Valor";

  const rows = specs
    .map(
      (spec) =>
        `<tr><td><b>${escapeHtml(spec.label || "—")}</b></td><td>${escapeHtml(spec.value || "—")}</td></tr>`
    )
    .join("");

  container.innerHTML =
    `<div class="table-wrap specs-table-wrap">` +
    `<table class="spec-data-table specs-data-table">` +
    `<thead><tr><th>${labelHeader}</th><th>${valueHeader}</th></tr></thead>` +
    `<tbody>${rows}</tbody>` +
    `</table></div>`;
}

function splitPackageText(value) {
  return String(value || "")
    .split(/\n|;|•|·|\||,(?=\s)/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function resolvePackageItems(product) {
  const items = [];
  const directFields = [
    "en_el_paquete",
    "in_the_box",
    "package_contents",
    "contenido_paquete",
    "cf_en_el_paquete"
  ];

  directFields.forEach((field) => {
    const value = product[field];
    if (!value) return;

    if (Array.isArray(value)) {
      items.push(...value);
      return;
    }

    const parsed = parseProductJsonField(value);
    if (Array.isArray(parsed)) {
      items.push(...parsed);
      return;
    }

    if (typeof parsed === "object" && parsed !== null && Array.isArray(parsed.items)) {
      items.push(...parsed.items);
      return;
    }

    if (typeof value === "string") {
      items.push(...splitPackageText(value));
    }
  });

  const description = parseProductJsonField(product.description);
  if (description && Array.isArray(description.secciones)) {
    description.secciones.forEach((section) => {
      const type = String(section.tipo || "").toLowerCase();
      const title = resolveLocalizedText(section.titulo).toLowerCase();
      const isPackageSection =
        ["paquete", "lista", "inbox", "in_the_box", "contenido"].includes(type) ||
        /paquete|incluye|contenido|box|package/.test(title);

      if (!isPackageSection) return;

      if (Array.isArray(section.items)) {
        items.push(...section.items);
      } else if (section.contenido) {
        items.push(...splitPackageText(resolveLocalizedText(section.contenido)));
      }
    });
  } else if (typeof product.description === "string" && product.description.trim()) {
    const plain = product.description.replace(/\s+/g, " ").trim();
    const includeMatch = plain.match(/(?:includes|package contents|in the box)\s*:?\s*(.+)$/i);
    if (includeMatch) {
      items.push(...splitPackageText(includeMatch[1]));
    }
  }

  if (items.length === 0) {
    if (product.name) items.push(product.name);
    if (product.sku) {
      items.push(COMPRAS_IS_ENGLISH ? `SKU: ${product.sku}` : `Referencia: ${product.sku}`);
    }
  }

  return [...new Set(items.map((item) => String(item).trim()).filter(Boolean))];
}

function renderInboxContent(product) {
  const container = document.getElementById("inbox-content");
  if (!container) return;

  const items = resolvePackageItems(product);
  const emptyMessage = COMPRAS_IS_ENGLISH
    ? "Package contents are not available for this product."
    : "No hay contenido del paquete disponible para este producto.";

  if (!items.length) {
    container.innerHTML = `<p class="info-card-empty">${emptyMessage}</p>`;
    return;
  }

  container.innerHTML =
    `<ul class="package-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function parseDocUrls(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item : item && item.url))
      .map((url) => String(url || "").trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      return parseDocUrls(JSON.parse(trimmed));
    } catch {
      return [trimmed];
    }
  }
  return [];
}

function renderManualsSection(product) {
  const container = document.getElementById("manualsContainer");
  if (!container) return;

  const extraManuals = parseDocUrls(product.manuales_url);
  const primaryManual = String(product.user_manual || extraManuals[0] || "").trim();
  const moreManuals = extraManuals.filter((url) => url !== primaryManual);

  const docs = [
    {
      key: "datasheet",
      label: COMPRAS_IS_ENGLISH ? "Data Sheet" : "Hoja de datos",
      url: product.datasheet_url,
      icon: "fa-file-pdf"
    },
    {
      key: "manual",
      label: COMPRAS_IS_ENGLISH ? "User Manual" : "Manual de usuario",
      url: primaryManual,
      icon: "fa-book"
    },
    ...moreManuals.map((url, index) => ({
      key: `manual-${index + 2}`,
      label: COMPRAS_IS_ENGLISH
        ? `User Manual ${index + 2}`
        : `Manual de usuario ${index + 2}`,
      url,
      icon: "fa-book"
    })),
    {
      key: "quickstart",
      label: COMPRAS_IS_ENGLISH ? "Quick Start Guide" : "Guía de inicio rápido",
      url: product.quickstart_url || product.quick_start_url,
      icon: "fa-bolt"
    }
  ];

  container.innerHTML = docs
    .map((doc) => {
      const available = !!(doc.url && String(doc.url).trim());
      const status = available
        ? (COMPRAS_IS_ENGLISH ? "Available" : "Disponible")
        : (COMPRAS_IS_ENGLISH ? "Not available" : "No disponible");

      if (available) {
        return (
          `<a class="doc-card doc-card--available" href="${escapeHtml(doc.url)}" target="_blank" rel="noopener noreferrer">` +
          `<span class="doc-card-icon" aria-hidden="true"><i class="fa-solid ${doc.icon}"></i></span>` +
          `<span class="doc-card-body"><strong>${escapeHtml(doc.label)}</strong><span class="doc-card-status doc-card-status--ok">${status}</span></span>` +
          `<span class="doc-card-action" aria-hidden="true"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>` +
          `</a>`
        );
      }

      return (
        `<div class="doc-card doc-card--unavailable">` +
        `<span class="doc-card-icon" aria-hidden="true"><i class="fa-solid ${doc.icon}"></i></span>` +
        `<span class="doc-card-body"><strong>${escapeHtml(doc.label)}</strong><span class="doc-card-status">${status}</span></span>` +
        `</div>`
      );
    })
    .join("");
}

// --- EVENTOS GLOBALES ---

const COMPRAS_IS_ENGLISH = /pages_us|_us\.html|^\/product(\/|$)/i.test(
  window.location.pathname
);

const COMPRAS_COUNTRY_FLAGS = {
  'united states': { flag: '🇺🇸', es: 'Estados Unidos', en: 'United States' },
  'germany': { flag: '🇩🇪', es: 'Alemania', en: 'Germany' },
  'switzerland': { flag: '🇨🇭', es: 'Suiza', en: 'Switzerland' },
  'japan': { flag: '🇯🇵', es: 'Japón', en: 'Japan' },
  'sweden': { flag: '🇸🇪', es: 'Suecia', en: 'Sweden' },
  'france': { flag: '🇫🇷', es: 'Francia', en: 'France' },
  'italy': { flag: '🇮🇹', es: 'Italia', en: 'Italy' },
  'united kingdom': { flag: '🇬🇧', es: 'Reino Unido', en: 'United Kingdom' },
  'china': { flag: '🇨🇳', es: 'China', en: 'China' },
  'south korea': { flag: '🇰🇷', es: 'Corea del Sur', en: 'South Korea' },
  'denmark': { flag: '🇩🇰', es: 'Dinamarca', en: 'Denmark' },
  'netherlands': { flag: '🇳🇱', es: 'Países Bajos', en: 'Netherlands' },
  'canada': { flag: '🇨🇦', es: 'Canadá', en: 'Canada' },
  'brazil': { flag: '🇧🇷', es: 'Brasil', en: 'Brazil' },
  'mexico': { flag: '🇲🇽', es: 'México', en: 'Mexico' },
  'taiwan': { flag: '🇹🇼', es: 'Taiwán', en: 'Taiwan' },
  'austria': { flag: '🇦🇹', es: 'Austria', en: 'Austria' },
  'belgium': { flag: '🇧🇪', es: 'Bélgica', en: 'Belgium' },
  'slovenia': { flag: '🇸🇮', es: 'Eslovenia', en: 'Slovenia' },
  'spain': { flag: '🇪🇸', es: 'España', en: 'Spain' },
  'liechtenstein': { flag: '🇱🇮', es: 'Liechtenstein', en: 'Liechtenstein' },
  'unknown/international': { flag: '🌍', es: 'Internacional', en: 'International' }
};

const _marcasPaisesLookup = (() => {
  const map = new Map();
  if (typeof marcasPaises === 'object' && marcasPaises) {
    Object.keys(marcasPaises).forEach((key) => {
      map.set(normalizar(key), marcasPaises[key]);
    });
  }
  return map;
})();

function normalizeCountryKey(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9/ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function resolveCountryFromBrand(brandName) {
  if (!brandName) return null;
  const countryName = _marcasPaisesLookup.get(normalizar(brandName));
  if (!countryName) return null;

  const key = normalizeCountryKey(countryName);
  if (COMPRAS_COUNTRY_FLAGS[key]) {
    const entry = COMPRAS_COUNTRY_FLAGS[key];
    return {
      flag: entry.flag,
      name: COMPRAS_IS_ENGLISH ? entry.en : entry.es
    };
  }

  return {
    flag: '🌍',
    name: countryName
  };
}

function renderProductCountry(brandName) {
  const country = resolveCountryFromBrand(brandName);
  const row = document.getElementById('product-origin-row');
  const badge = document.getElementById('product-country');
  if (!row || !badge) return;

  if (!country) {
    row.hidden = true;
    badge.innerHTML = '';
    return;
  }

  row.hidden = false;
  badge.innerHTML =
    `<span class="product-country-flag" aria-hidden="true">${country.flag}</span>` +
    `<span class="product-country-name">${country.name}</span>`;
}

const PRODUCT_TAB_ORDER = [
  "description",
  "specs",
  "inbox",
  "manuals",
  "cms-secciones",
  "tablas",
];

function syncTabButtonStates(activeTabName) {
  document.querySelectorAll('.tab-button[data-target], .sticky-tab-btn[data-target]').forEach((btn) => {
    const isActive = btn.dataset.target === activeTabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function isProductSectionVisible(section) {
  if (!section) return false;
  if (section.hidden || section.hasAttribute('hidden')) return false;
  const style = window.getComputedStyle(section);
  if (style.display === 'none' || style.visibility === 'hidden') return false;
  const rect = section.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function getVisibleProductTabIds() {
  return PRODUCT_TAB_ORDER.filter((id) => {
    const btn = document.querySelector(
      `.sticky-tab-btn[data-target="${id}"], .tabs-header .tab-button[data-target="${id}"]`
    );
    if (!btn || btn.hidden || btn.hasAttribute('hidden')) return false;
    return isProductSectionVisible(document.getElementById(id));
  });
}

function scrollToProductTab(tabName) {
  const tabEl = document.getElementById(tabName);
  if (!tabEl) return;

  const navbar = document.querySelector('.navbar');
  const stickyTabs = document.getElementById('stickyTabs');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const stickyActive = stickyTabs && stickyTabs.classList.contains('active');
  const stickyHeight = stickyActive ? stickyTabs.offsetHeight : 0;
  const offset = navbarHeight + stickyHeight + 20;
  const y = tabEl.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}

function updateStickyProductTabs() {
  const tabsTrigger = document.getElementById('tabsTrigger');
  const stickyTabs = document.getElementById('stickyTabs');
  if (!tabsTrigger || !stickyTabs) return;

  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  stickyTabs.style.top = `${navbarHeight}px`;
  const isActive = tabsTrigger.getBoundingClientRect().top <= navbarHeight;
  stickyTabs.classList.toggle('active', isActive);
  stickyTabs.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  document.body.classList.toggle('compras-sticky-tabs-visible', isActive);
}

function updateActiveProductTabOnScroll() {
  const tabIds = getVisibleProductTabIds();
  if (!tabIds.length) return;

  const navbar = document.querySelector('.navbar');
  const stickyTabs = document.getElementById('stickyTabs');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const stickyHeight =
    stickyTabs && stickyTabs.classList.contains('active') ? stickyTabs.offsetHeight : 0;
  const probeY = navbarHeight + stickyHeight + 48;

  let current = tabIds[0];

  for (let i = 0; i < tabIds.length; i++) {
    const id = tabIds[i];
    const section = document.getElementById(id);
    if (!isProductSectionVisible(section)) continue;

    const rect = section.getBoundingClientRect();
    const next = document.getElementById(tabIds[i + 1]);
    const nextTop = next && isProductSectionVisible(next)
      ? next.getBoundingClientRect().top
      : Number.POSITIVE_INFINITY;

    // Activo mientras la sonda esté dentro de esta sección
    if (rect.top <= probeY && nextTop > probeY) {
      current = id;
      break;
    }
    if (rect.top <= probeY) current = id;
  }

  syncTabButtonStates(current);
}

function initStickyProductTabs() {
  document.querySelectorAll('.tabs-header .tab-button[data-target]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      openTab(event, btn.dataset.target);
    });
  });

  document.querySelectorAll('.sticky-tab-btn[data-target]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      openTab(event, btn.dataset.target);
    });
  });

  document.querySelectorAll('.js-goto-tablas').forEach((btn) => {
    btn.addEventListener('click', () => {
      openTab({ currentTarget: document.querySelector('.tab-button[data-target="tablas"]') }, 'tablas');
    });
  });

  updateStickyProductTabs();
  updateActiveProductTabOnScroll();
}

// --- EVENTOS GLOBALES ---

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const offsetTop = navbar.offsetTop;
    if (window.scrollY > offsetTop + 100) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  }

  updateStickyProductTabs();
  updateActiveProductTabOnScroll();
});

// --- FUNCIONES PRINCIPALES ---
function openTab(evt, tabName) {
  const tabButtons = document.getElementsByClassName("tab-button");

  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  const currentTab = document.getElementById(tabName);
  if (currentTab) currentTab.classList.add("active");
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }

  syncTabButtonStates(tabName);
  scrollToProductTab(tabName);
}

function setupThumbnails() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const frame = document.querySelector('.main-image');
  const mainImage = document.querySelector('.main-image img');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const imgSrc = this.querySelector('img').src;
      if (mainImage) {
        mainImage.src = imgSrc;
        mainImage.style.transform = '';
        mainImage.style.transformOrigin = 'center center';
      }
      if (frame) frame.classList.remove('is-zooming');
    });
  });

  setupImageZoom();
}

function setupImageZoom() {
  const frame = document.querySelector('.main-image');
  const img = frame && frame.querySelector('img');
  if (!frame || !img) return;
  if (frame.dataset.zoomInit === '1') return;
  frame.dataset.zoomInit = '1';

  const isFinePointer = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const resetZoom = () => {
    frame.classList.remove('is-zooming');
    img.style.transform = '';
    img.style.transformOrigin = 'center center';
  };

  const updateZoom = (event) => {
    if (!isFinePointer()) {
      resetZoom();
      return;
    }
    if (!img.src || img.src.includes('no-image')) {
      resetZoom();
      return;
    }

    const rect = frame.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const originX = Math.min(100, Math.max(0, x));
    const originY = Math.min(100, Math.max(0, y));

    frame.classList.add('is-zooming');
    img.style.transformOrigin = `${originX}% ${originY}%`;
    img.style.transform = 'scale(2.35)';
  };

  frame.addEventListener('mouseenter', updateZoom);
  frame.addEventListener('mousemove', updateZoom);
  frame.addEventListener('mouseleave', resetZoom);

  window.addEventListener('resize', () => {
    if (!isFinePointer()) resetZoom();
  }, { passive: true });
}

function updateCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;

  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const totalItems = cartItems.reduce((acc, p) => acc + p.quantity, 0);
  cartCountEl.textContent = `Cart (${totalItems})`;
}

async function fetchFullProduct(productOrId) {
  const id =
    typeof productOrId === "string" || typeof productOrId === "number"
      ? productOrId
      : productOrId?.item_id || productOrId?.id || productOrId?.product_id;
  if (!id) return productOrId && typeof productOrId === "object" ? productOrId : null;

  try {
    const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const full = await res.json();
    if (full && (full.item_id || full.name)) return full;
  } catch (err) {
    console.warn("Could not hydrate full product:", err.message || err);
  }
  return productOrId && typeof productOrId === "object" ? productOrId : null;
}

function productNeedsHydration(product) {
  if (!product) return false;
  const hasGallery =
    (Array.isArray(product.imagenes_url) && product.imagenes_url.length > 0) ||
    (typeof product.imagenes_url === "string" && product.imagenes_url.trim()) ||
    (product.imagen_url && String(product.imagen_url).trim());
  const hasDetails =
    product.description != null ||
    product.especificaciones != null ||
    product.tablas != null;
  return !hasGallery || !hasDetails;
}

async function cargarProductoPorSlug() {
  if (window.__BOOTSTRAP_PRODUCT__) {
    const full = await fetchFullProduct(window.__BOOTSTRAP_PRODUCT__);
    localStorage.setItem("selectedProduct", JSON.stringify(full || window.__BOOTSTRAP_PRODUCT__));
    return true;
  }

  const params = new URLSearchParams(window.location.search);
  let slug = params.get("slug");

  if (!slug) {
    const shortMatch = window.location.pathname.match(
      /^\/product\/(.+?)\/?$/
    );
    if (shortMatch) slug = decodeURIComponent(shortMatch[1]);
  }

  if (!slug) return false;

  try {
    const res = await fetch("/api/products");
    const products = await res.json();
    const parts = String(slug)
      .split("/")
      .filter(Boolean)
      .map((p) => decodeURIComponent(p));

    let product = null;

    if (parts.length >= 3) {
      const brand = slugify(parts[0]);
      const model = slugify(parts[1]);
      const category = slugifyCategorySegment(parts.slice(2).join("-"));
      product =
        products.find((p) => {
          const segs = buildProductPathSegments(p);
          return (
            segs.brand === brand &&
            segs.model === model &&
            segs.category === category
          );
        }) ||
        products.find((p) => {
          const segs = buildProductPathSegments(p);
          return segs.brand === brand && segs.model === model;
        }) ||
        null;
    }

    if (!product) {
      const normalizedSlug = slugify(parts.length === 1 ? parts[0] : parts[parts.length - 1]);
      product = products.find((p) => {
        const canonicalSlug = buildProductSlug(p);
        const legacySlug = legacyBuildProductSlug(p);
        const nameSlug = slugify(p.name);
        const skuSlug = slugify(p.sku);
        const modelSlug = slugify(extractProductModel(p));
        const codeSlug = slugify(p.codigo || p.code || p.id);

        return (
          canonicalSlug === parts.join("/") ||
          canonicalSlug ===
            `${slugify(parts[0] || "")}/${slugify(parts[1] || "")}/${slugifyCategorySegment(parts.slice(2).join("-") || "")}` ||
          legacySlug === normalizedSlug ||
          nameSlug === normalizedSlug ||
          skuSlug === normalizedSlug ||
          modelSlug === normalizedSlug ||
          codeSlug === normalizedSlug ||
          String(p.sku || "").toLowerCase() === normalizedSlug
        );
      });
    }

    if (product) {
      const full = await fetchFullProduct(product);
      localStorage.setItem("selectedProduct", JSON.stringify(full || product));
      return true;
    }
  } catch (err) {
    console.error("Error cargando producto por slug:", err);
  }

  return false;
}

function loadSelectedProduct() {
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!selectedProduct) {
    console.error("No se encontró ningún producto en localStorage");
    return;
  }

  // Name (TEHMA-style hero title)
  renderProductHeroChrome(
    selectedProduct,
    getProductDisplayName(selectedProduct)
  );
  renderProductLead(selectedProduct);

  const itemIdElement = document.getElementById("product-item-id");
  if (itemIdElement) {
    itemIdElement.textContent =
      selectedProduct.id != null && selectedProduct.id !== ""
        ? String(selectedProduct.id)
        : "—";
  }

  // Marca
  const brandElement = document.getElementById("product-brand");
  if (brandElement) brandElement.textContent = selectedProduct.cf_marca || selectedProduct.brand || "Sin marca";

  // SKU
  const skuElement = document.getElementById("product-sku");
  if (skuElement) skuElement.textContent = selectedProduct.sku || "Sin SKU";

  // Stock display hidden by design

  // Proveedor
  const brandContainer = document.getElementById("product-supplier-meta");
  if (brandContainer) brandContainer.innerHTML = "";
  if (brandContainer && selectedProduct.proveedor) {
    const supplierSpan = document.createElement("span");
    supplierSpan.innerHTML = `Supplier: <strong>${selectedProduct.proveedor}</strong>`;
    brandContainer.appendChild(supplierSpan);
  }

  renderProductCountry(selectedProduct.cf_marca || selectedProduct.brand);
  renderSpecsPreview(selectedProduct);
  renderSpecsSection(selectedProduct);
  renderInboxContent(selectedProduct);
  renderManualsSection(selectedProduct);

  // Descripción
  const descriptionTitle = document.getElementById("description-title");
  const descriptionList = document.getElementById("product-features");

  if (selectedProduct.description) {
    let descriptionData = selectedProduct.description;

    if (typeof descriptionData === 'string') {
      try {
        const parsed = JSON.parse(descriptionData);
        if (parsed && typeof parsed === 'object') {
          descriptionData = parsed;
        }
      } catch (e) {
        // Mantener como texto plano
      }
    }

    if (
      descriptionData &&
      typeof descriptionData === 'object' &&
      descriptionData.titulo &&
      Array.isArray(descriptionData.secciones)
    ) {
      // Formato JSON bilingüe: titulo/contenido = string o { es, en }
      const localizedTitle = resolveLocalizedText(descriptionData.titulo);
      setDescriptionSubtitle(descriptionTitle, localizedTitle);
      if (descriptionList) {
        const resultado = descriptionData.secciones
          .map((seccion) => {
            const content = resolveLocalizedText(seccion.contenido);
            if (!content) return "";
            return `<p>${escapeHtml(content)}</p>`;
          })
          .filter(Boolean);
        descriptionList.innerHTML = resultado.join("");
      }
    } else if (typeof descriptionData === 'string') {
      // Formato anterior de texto plano
      setDescriptionSubtitle(descriptionTitle, "");
      if (descriptionList) {
        let texto = descriptionData.replace(/\s+/g, " ").trim();
        let partes = texto.split(/(?<=\.)\s+/);

        const resultado = partes.map(p => {
          if (p.includes(":")) {
            const [titulo, contenido] = p.split(":");
            const items = contenido.split(/;|,|\./).filter(i => i.trim() !== "");

            return `
              <div class="desc-block">
                <strong>${titulo.trim()}</strong>
                <ul>
                  ${items.map(i => `<li>${i.trim()}</li>`).join("")}
                </ul>
              </div>
            `;
          }
          return `<p>${p.trim()}</p>`;
        });

        descriptionList.innerHTML = resultado.join("");
      }
    }
  }

  // Imagen principal y miniaturas
  const mainImage = document.querySelector(".main-image img");
  const thumbnailsContainer = document.querySelector(".thumbnail-gallery");

  let images = [];
  try {
    if (typeof selectedProduct.imagenes_url === "string") {
      images = JSON.parse(selectedProduct.imagenes_url);
    } else if (Array.isArray(selectedProduct.imagenes_url)) {
      images = selectedProduct.imagenes_url;
    }
  } catch (e) {
    console.warn("Error parseando imagenes_url:", e);
    images = [];
  }
  if (!Array.isArray(images)) images = [];
  if (!images.length) {
    const fallback = getImageUrl(selectedProduct);
    if (fallback && fallback !== "/img/no-image.png") images = [fallback];
  }

  if (mainImage) {
    mainImage.src = images[0] || getImageUrl(selectedProduct) || "/img/no-image.png";
    mainImage.alt = getProductDisplayName(selectedProduct);
  }

  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = "";
    if (images.length <= 1) {
      thumbnailsContainer.hidden = true;
    } else {
      thumbnailsContainer.hidden = false;
      images.forEach((imgUrl, index) => {
        const thumb = document.createElement("div");
        thumb.classList.add("thumbnail");
        if (index === 0) thumb.classList.add("active");
        thumb.innerHTML = `<img src="${imgUrl}" alt="Thumbnail ${index + 1}">`;
        thumbnailsContainer.appendChild(thumb);
      });
    }
  }

  setTimeout(setupThumbnails, 0);

  renderProductTables(selectedProduct);

  console.log("✅ Producto cargado correctamente:", selectedProduct);
}

function loadRelatedProducts() {
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!selectedProduct) {
    console.warn("No hay producto en localStorage");
    return;
  }

  const currentProductTitle = selectedProduct.name || "";
  const currentBrand = selectedProduct.brand || selectedProduct.cf_marca || "";
  if (!currentProductTitle) return console.warn("No se encontró el título del producto actual");

  async function loadProducts() {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Error al obtener productos del servidor");

      const products = await response.json();

      if (!currentBrand) return console.warn("No se pudo determinar la marca del producto actual");

      const relatedProducts = products.filter(
        p => p.brand?.toLowerCase() === currentBrand.toLowerCase() &&
             !currentProductTitle.toLowerCase().includes(p.name?.toLowerCase())
      );

      const maxItems = relatedProducts.slice(0, 6);
      const tbody = document.getElementById("seriesTableBody");
      tbody.innerHTML = "";

      if (maxItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No related products found for ${currentBrand}</td></tr>`;
        return;
      }

      maxItems.forEach(prod => {
        const imageUrl = getImageUrl(prod);
        const displayName = getProductDisplayName(prod);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>
            <div class="series-product-cell">
              <img src="${imageUrl}" alt="${displayName}" class="series-product-image">
              <a class="series-product-title" href="#" data-product='${JSON.stringify(prod).replace(/'/g, "&#39;")}'>
                ${displayName}
              </a>
            </div>
          </td>
          <td><span class="series-brand">${prod.brand ?? 'N/A'}</span></td>
        `;
        tbody.appendChild(row);

        row.querySelector('.series-product-title').addEventListener('click', (e) => {
          e.preventDefault();
          const product = JSON.parse(e.currentTarget.getAttribute('data-product'));
          localStorage.setItem('selectedProduct', JSON.stringify(product));
          window.location.href = buildProductUrl(product);
        });
      });
    } catch (error) {
      console.error("Error al cargar los productos relacionados:", error);
    }
  }

  loadProducts();
}

function setupDatasheetLinks() {
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!selectedProduct) return;
  renderManualsSection(selectedProduct);
}

function setupAddToCart() {
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // Enviar siempre el nombre en español (campo name), no el de pantalla (cf_item)
      const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct") || "null");
      const nombreEs =
        (selectedProduct && selectedProduct.name) ||
        document.querySelector(".product-title")?.textContent.trim() ||
        "";
      const producto = { nombre: nombreEs };
      localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
      window.location.href = "/pages_us/Opciones_us.html";
    });
  }
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchInput || !searchResults) return;

  let allProducts = [];

  async function loadProducts() {
    try {
      const response = await fetch("https://ingprosuppliers.com/api/products");
      allProducts = await response.json();
    } catch (error) {
      console.error("❌ Error cargando productos:", error);
    }
  }

  loadProducts();

  searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const texto = searchInput.value.trim();

    if (texto.length > 0) {
      window.location.href = `/pages_us/productos_us.html?q=${encodeURIComponent(texto)}`;
    }
  }
  });

  searchInput.addEventListener("input", () => {
    const texto = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (texto.length === 0) {
      searchResults.style.display = "none";
      return;
    }

    const textoNormalizado = normalizar(texto);
    const palabras = textoNormalizado.split(" ");

    const filtrados = allProducts.filter(p => {
      const name = normalizar(p.name || "");
      const nameEn = normalizar(p.cf_item || p.nameEn || "");
      const marca = normalizar(p.cf_marca || "");
      const sku = normalizar(p.sku || "");

      return palabras.every(palabra =>
        name.includes(palabra) ||
        nameEn.includes(palabra) ||
        marca.includes(palabra) ||
        sku.includes(palabra)
      );
    });

    if (filtrados.length === 0) {
      searchResults.innerHTML = `<div class="result-item"><div class="result-info">No results found</div></div>`;
      searchResults.style.display = "block";
      return;
    }

    filtrados.slice(0, 8).forEach(p => {
      const imagenPrincipal = getImageUrl(p);
      const displayName = getProductDisplayName(p);

      const div = document.createElement("div");
      div.classList.add("result-item");

      div.innerHTML = `
        <img src="${imagenPrincipal}" alt="${displayName || ""}">
        <div class="result-info">
          <strong>${displayName || "Product"}</strong>
          <span>${p.cf_marca || p.brand || "Unknown brand"}</span>
        </div>
      `;

      div.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(p));
        window.location.href = buildProductUrl(p);
      });

      searchResults.appendChild(div);
    });

    searchResults.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar")) {
      searchResults.style.display = "none";
    }
  });
}

function setupBrands() {
  const brands = [
    "3M","AURAND","BAKER HUGHES","BENTLY","CAT","COMET","COPPUS",
    "CUMMINS","DEEP SEA","DETCON","DJI","EDILGRAPPA","ELCOMETER","EMERSON",
    "ENERPAC","ESAB","FAMECA","FLUKE","FW MURPHY","GENERAC","GENERICA",
    "GORE","HILTI","INGPRO","KLUBER","KUBOTA","KYORITSU","LAPMASTER",
    "LEISTER","LOCTITE","MARTEL","METREL","OFMER","PARKER","PERKINS",
    "QLIGHT","SHIBUYA","SIEMENS","SKF","STREAMLIGHT","TEHMA","TENTECH",
    "TRIMBLE","TUFF BUCKET","TWECO","UNIT T","VEGA","YOKOGAWA"
  ];

  function agrupar(brands) {
    const grupos = {};

    brands.forEach(b => {
      let letra = b[0].toUpperCase();
      if (!/[A-Z]/.test(letra)) letra = "#";

      if (!grupos[letra]) grupos[letra] = [];
      grupos[letra].push(b);
    });

    return Object.keys(grupos)
      .sort((a,b)=>{
        if(a==="#") return 1;
        if(b==="#") return -1;
        return a.localeCompare(b);
      })
      .reduce((acc,k)=>{
        acc[k] = grupos[k].sort();
        return acc;
      },{});
  }

  function renderBrands() {
    const container = document.getElementById("brands-list");
    if (!container) return;

    const data = agrupar(brands);
    container.innerHTML = "";

    Object.entries(data).forEach(([letra, lista]) => {
      const col = document.createElement("div");
      col.className = "dropdown-column";

      col.innerHTML = `
        <h3 class="letter-title">${letra}</h3>
        <ul>
          ${lista.map(b => `
            <li>
              <span class="brand-link" data-brand="${b}">
                ${b}
              </span>
            </li>
          `).join("")}
        </ul>
      `;

      container.appendChild(col);
    });
  }

  renderBrands();

  const brandsList = document.getElementById("brands-list");
  if (brandsList) {
    brandsList.addEventListener("click", (e) => {
      if (e.target.classList.contains("brand-link")) {
        const brand = e.target.dataset.brand;
        window.location.href = `/pages_us/brands_us.html?brand=${encodeURIComponent(brand)}`;
      }
    });
  }
}

function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle?.dataset.menuInit) return;

  document.querySelectorAll(".dropdown > .nav-item").forEach(button => {
    button.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        const dropdown = this.nextElementSibling;
        dropdown.classList.toggle("mobile-open");
      }
    });
  });

  document.querySelectorAll(".category-item > span").forEach(category => {
    category.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        const sub = this.nextElementSibling;
        category.classList.toggle("active");
        sub.classList.toggle("mobile-open");
      }
    });
  });
}

function setupCategoryDropdown() {
  const categoryItems = document.querySelectorAll(".category-item > span");

  categoryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      const parentItem = this.parentElement;

      document.querySelectorAll(".category-item").forEach((otherItem) => {
        if (otherItem !== parentItem) {
          otherItem.classList.remove("active");
        }
      });

      parentItem.classList.toggle("active");
    });
  });

  const subcategoryItems = document.querySelectorAll(".subcategory-list li");

  subcategoryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("[v0] Subcategory clicked:", this.textContent);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".category-item").forEach((item) => {
        item.classList.remove("active");
      });
    }
  });
}

function setupTabsPlaceholder() {
  const tabsSection = document.querySelector('.tabs-section');
  if (!tabsSection) return;
  if (document.querySelector('.tabs-placeholder')) return;

  const placeholder = document.createElement('div');
  placeholder.classList.add('tabs-placeholder');
  tabsSection.parentNode.insertBefore(placeholder, tabsSection);
}

// --- INICIALIZACIÓN ---
function toggleTable(element) {
  const icon = element.querySelector('.toggle-icon');
  const content = element.nextElementSibling;
  if (content.style.display === 'none' || content.style.display === '') {
    content.style.display = 'block';
    icon.textContent = '▼';
    element.classList.remove('collapsed');
    element.classList.add('expanded');
  } else {
    content.style.display = 'none';
    icon.textContent = '▶';
    element.classList.remove('expanded');
    element.classList.add('collapsed');
  }
}

function shouldEnableTableFilters(tabla) {
  if (!tabla) return false;
  if (tabla.filtros === true || tabla.filtrable === true) return true;
  if (tabla.filters === true || tabla.filterable === true) return true;
  if (tabla.filtros && typeof tabla.filtros === "object") {
    return tabla.filtros.activo === true || tabla.filtros.active === true;
  }
  return false;
}

function getTableFilterConfig(tabla) {
  const raw = tabla && tabla.filtros;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw;
  return {};
}

function parseNumericCell(value) {
  if (value == null || value === "") return NaN;
  const cleaned = String(value).replace(/,/g, "").trim();
  if (!isPureNumericValue(cleaned)) return NaN;
  const match = cleaned.match(/-?\d+(?:\.\d+)?/);
  return match ? parseFloat(match[0]) : NaN;
}

function isPureNumericValue(value) {
  const cleaned = String(value == null ? "" : value).replace(/,/g, "").trim();
  if (!cleaned) return false;
  if (/^-?\d+(?:\.\d+)?$/.test(cleaned)) return true;
  return /^-?\d+(?:\.\d+)?\s*(?:kw|kv|v|a|rpm|kg|%|w|hz|nm|mm|cm|m|hp|vac|vdc|n·m|n\.m)?$/i.test(
    cleaned
  );
}

function looksLikeCodeOrTextColumn(columnName) {
  return /model|modelo|sku|code|codigo|c[oó]digo|name|nombre|series|serie|ref|referencia|part|descripci[oó]n/i.test(
    String(columnName || "")
  );
}

function looksLikeCategoryColumn(columnName) {
  return /voltage|tensi[oó]n|voltaje|poles?|polos?|frame|carcasa|cooling|enfriamiento|protection|protecci[oó]n/i.test(
    String(columnName || "")
  );
}

function normalizeFilterText(value) {
  return String(value == null ? "" : value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function analyzeTableColumns(tabla) {
  const columns = Array.isArray(tabla.columnas) ? tabla.columnas : [];
  const rows = Array.isArray(tabla.filas) ? tabla.filas : [];
  const config = getTableFilterConfig(tabla);
  const columnConfig = config.columnas || config.columns || {};

  return columns.map((columnName, columnIndex) => {
    const values = rows
      .map((row) => String((row && row[columnIndex]) ?? "").trim())
      .filter(Boolean);
    const unique = [...new Set(values)].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );

    const pureNumericValues = values.filter((value) => isPureNumericValue(value));
    const mostlyPureNumeric =
      values.length > 0 &&
      pureNumericValues.length >= Math.ceil(values.length * 0.85);
    const numericValues = pureNumericValues
      .map((value) => parseNumericCell(value))
      .filter((num) => !Number.isNaN(num));

    const explicit = columnConfig[columnName];
    if (explicit === false || explicit === "none") {
      return { columnName, columnIndex, type: "none", unique };
    }
    if (explicit === "select" || explicit === "dropdown") {
      return { columnName, columnIndex, type: "select", unique };
    }
    if (explicit === "range" || explicit === "minmax" || explicit === "min-max") {
      return { columnName, columnIndex, type: "range", unique, numericValues };
    }
    if (explicit === "text" || explicit === "search" || explicit === "string") {
      return { columnName, columnIndex, type: "text", unique };
    }

    if (looksLikeCodeOrTextColumn(columnName)) {
      if (unique.length >= 2 && unique.length <= 40) {
        return { columnName, columnIndex, type: "select", unique };
      }
      return { columnName, columnIndex, type: "text", unique };
    }

    if (looksLikeCategoryColumn(columnName) && unique.length >= 2 && unique.length <= 40) {
      return { columnName, columnIndex, type: "select", unique };
    }

    if (mostlyPureNumeric && unique.length >= 4) {
      return { columnName, columnIndex, type: "range", unique, numericValues };
    }

    if (unique.length >= 2 && unique.length <= 30) {
      return { columnName, columnIndex, type: "select", unique };
    }

    if (!mostlyPureNumeric && unique.length > 30) {
      return { columnName, columnIndex, type: "text", unique };
    }

    return { columnName, columnIndex, type: "none", unique };
  });
}

function buildSearchPlaceholder(tabla, columnAnalysis) {
  const config = getTableFilterConfig(tabla);
  const explicit = config.busqueda || config.search || config.searchColumns;
  if (Array.isArray(explicit) && explicit.length) {
    return COMPRAS_IS_ENGLISH
      ? `Search ${explicit.join(", ").toLowerCase()}...`
      : `Buscar ${explicit.join(", ").toLowerCase()}...`;
  }

  const searchable = columnAnalysis
    .filter((col) => col.type === "none" || col.type === "select" || col.type === "text")
    .map((col) => col.columnName)
    .slice(0, 4);

  if (!searchable.length) {
    return COMPRAS_IS_ENGLISH ? "Search table..." : "Buscar en la tabla...";
  }

  return COMPRAS_IS_ENGLISH
    ? `Search ${searchable.join(", ").toLowerCase()}...`
    : `Buscar ${searchable.join(", ").toLowerCase()}...`;
}

function buildTableFilterToolbar(tabla, columnAnalysis) {
  const config = getTableFilterConfig(tabla);
  const toolbar = document.createElement("div");
  toolbar.className = "table-filters-toolbar";

  const topRow = document.createElement("div");
  topRow.className = "table-filters-top";

  if (config.busqueda !== false && config.search !== false) {
    const searchWrap = document.createElement("div");
    searchWrap.className = "table-filters-search";
    searchWrap.innerHTML =
      `<span class="table-filter-search-icon" aria-hidden="true">` +
      `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">` +
      `<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg></span>`;
    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "table-filter-search";
    searchInput.placeholder = buildSearchPlaceholder(tabla, columnAnalysis);
    searchInput.setAttribute("aria-label", COMPRAS_IS_ENGLISH ? "Search table" : "Buscar en la tabla");
    searchWrap.appendChild(searchInput);
    topRow.appendChild(searchWrap);
  }

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "table-filters-clear";
  clearBtn.textContent = COMPRAS_IS_ENGLISH ? "Clear filters" : "Limpiar filtros";
  topRow.appendChild(clearBtn);
  toolbar.appendChild(topRow);

  const controls = document.createElement("div");
  controls.className = "table-filters-controls";

  columnAnalysis.forEach((col) => {
    if (col.type === "select") {
      const field = document.createElement("div");
      field.className = "table-filter-field";
      const label = document.createElement("label");
      label.textContent = col.columnName;
      const select = document.createElement("select");
      select.className = "table-filter-select";
      select.dataset.columnIndex = String(col.columnIndex);
      select.innerHTML =
        `<option value="">${COMPRAS_IS_ENGLISH ? "All" : "Todos"}</option>` +
        col.unique.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
      field.appendChild(label);
      field.appendChild(select);
      controls.appendChild(field);
      return;
    }

    if (col.type === "text") {
      const field = document.createElement("div");
      field.className = "table-filter-field table-filter-field--text";
      const label = document.createElement("label");
      label.textContent = col.columnName;
      const textInput = document.createElement("input");
      textInput.type = "text";
      textInput.className = "table-filter-text-input";
      textInput.dataset.columnIndex = String(col.columnIndex);
      textInput.placeholder = COMPRAS_IS_ENGLISH
        ? `Type ${col.columnName.toLowerCase()}...`
        : `Escribir ${col.columnName.toLowerCase()}...`;
      textInput.setAttribute(
        "aria-label",
        `${col.columnName} ${COMPRAS_IS_ENGLISH ? "text filter" : "filtro de texto"}`
      );
      textInput.autocomplete = "off";
      field.appendChild(label);
      field.appendChild(textInput);
      controls.appendChild(field);
      return;
    }

    if (col.type === "range") {
      const field = document.createElement("div");
      field.className = "table-filter-field table-filter-field--range";
      const label = document.createElement("label");
      label.textContent = col.columnName;
      const rangeWrap = document.createElement("div");
      rangeWrap.className = "table-filter-range";

      const minInput = document.createElement("input");
      minInput.type = "number";
      minInput.className = "table-filter-range-input";
      minInput.dataset.columnIndex = String(col.columnIndex);
      minInput.dataset.rangeBound = "min";
      minInput.placeholder = COMPRAS_IS_ENGLISH ? "Min" : "Mín";
      minInput.setAttribute("aria-label", `${col.columnName} ${COMPRAS_IS_ENGLISH ? "minimum" : "mínimo"}`);

      const maxInput = document.createElement("input");
      maxInput.type = "number";
      maxInput.className = "table-filter-range-input";
      maxInput.dataset.columnIndex = String(col.columnIndex);
      maxInput.dataset.rangeBound = "max";
      maxInput.placeholder = COMPRAS_IS_ENGLISH ? "Max" : "Máx";
      maxInput.setAttribute("aria-label", `${col.columnName} ${COMPRAS_IS_ENGLISH ? "maximum" : "máximo"}`);

      rangeWrap.appendChild(minInput);
      rangeWrap.appendChild(maxInput);
      field.appendChild(label);
      field.appendChild(rangeWrap);
      controls.appendChild(field);
    }
  });

  if (controls.childElementCount) toolbar.appendChild(controls);

  const footer = document.createElement("div");
  footer.className = "table-filters-footer";
  const count = document.createElement("p");
  count.className = "table-filters-count";
  footer.appendChild(count);
  toolbar.appendChild(footer);

  return toolbar;
}

function isBadgeColumn(columnName) {
  return /voltage|tensi[oó]n|voltaje|poles|polos/i.test(String(columnName || ""));
}

function applyTableFilters(tableSection, tabla) {
  const tbody = tableSection.querySelector("tbody");
  const toolbar = tableSection.querySelector(".table-filters-toolbar");
  if (!tbody || !toolbar) return;

  const rows = tbody.querySelectorAll("tr");
  const searchInput = toolbar.querySelector(".table-filter-search");
  const selects = toolbar.querySelectorAll(".table-filter-select");
  const textInputs = toolbar.querySelectorAll(".table-filter-text-input");
  const rangeInputs = toolbar.querySelectorAll(".table-filter-range-input");
  const countEl = toolbar.querySelector(".table-filters-count");
  const total = rows.length;

  const searchTerm = normalizeFilterText(searchInput ? searchInput.value : "");
  const selectFilters = {};
  selects.forEach((select) => {
    const index = Number(select.dataset.columnIndex);
    if (!Number.isNaN(index) && select.value) {
      selectFilters[index] = normalizeFilterText(select.value);
    }
  });

  const textFilters = {};
  textInputs.forEach((input) => {
    const index = Number(input.dataset.columnIndex);
    const term = normalizeFilterText(input.value);
    if (!Number.isNaN(index) && term) {
      textFilters[index] = term;
    }
  });

  const rangeFilters = {};
  rangeInputs.forEach((input) => {
    const index = Number(input.dataset.columnIndex);
    if (Number.isNaN(index)) return;
    if (!rangeFilters[index]) rangeFilters[index] = { min: NaN, max: NaN };
    const value = parseFloat(input.value);
    if (Number.isNaN(value)) return;
    if (input.dataset.rangeBound === "min") rangeFilters[index].min = value;
    if (input.dataset.rangeBound === "max") rangeFilters[index].max = value;
  });

  let visible = 0;
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let show = true;

    if (searchTerm) {
      const rowText = normalizeFilterText(
        Array.from(cells)
          .map((cell) => cell.textContent)
          .join(" ")
      );
      if (!rowText.includes(searchTerm)) show = false;
    }

    Object.entries(selectFilters).forEach(([index, expected]) => {
      const cell = cells[Number(index)];
      if (!cell || normalizeFilterText(cell.textContent) !== expected) show = false;
    });

    Object.entries(textFilters).forEach(([index, term]) => {
      const cell = cells[Number(index)];
      if (!cell || !normalizeFilterText(cell.textContent).includes(term)) show = false;
    });

    Object.entries(rangeFilters).forEach(([index, bounds]) => {
      const cell = cells[Number(index)];
      const numeric = parseNumericCell(cell ? cell.textContent : "");
      if (Number.isNaN(numeric)) {
        show = false;
        return;
      }
      if (!Number.isNaN(bounds.min) && numeric < bounds.min) show = false;
      if (!Number.isNaN(bounds.max) && numeric > bounds.max) show = false;
    });

    row.hidden = !show;
    if (show) visible += 1;
  });

  if (countEl) {
    countEl.innerHTML = COMPRAS_IS_ENGLISH
      ? `<strong>${visible}</strong> of ${total} rows`
      : `<strong>${visible}</strong> de ${total} filas`;
    countEl.classList.toggle("is-filtered", visible !== total);
  }
}

function bindTableFilters(tableSection, tabla) {
  const toolbar = tableSection.querySelector(".table-filters-toolbar");
  if (!toolbar) return;

  const run = () => applyTableFilters(tableSection, tabla);
  toolbar.querySelectorAll("input, select").forEach((control) => {
    const eventName = control.tagName === "SELECT" ? "change" : "input";
    control.addEventListener(eventName, run);
  });

  const clearBtn = toolbar.querySelector(".table-filters-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      toolbar.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
      toolbar.querySelectorAll("select").forEach((select) => {
        select.selectedIndex = 0;
      });
      run();
    });
  }

  run();
}

/** Parsea el JSON `tablas` del producto: tablas genéricas + repuestos opcionales. */
function parseProductTablasPayload(raw) {
  let parsed = raw;
  try {
    if (typeof raw === "string") parsed = JSON.parse(raw);
  } catch (_) {
    return { tablas: [], repuestos: null };
  }
  if (!parsed || typeof parsed !== "object") return { tablas: [], repuestos: null };

  let tablas = [];
  if (Array.isArray(parsed.tablas)) tablas = parsed.tablas;
  else if (Array.isArray(parsed) && parsed[0] && Array.isArray(parsed[0].columnas)) tablas = parsed;

  let repuestos = null;
  if (parsed.repuestos) repuestos = normalizeRepuestosModule(parsed.repuestos);
  else if (parsed.tipo === "repuestos" || parsed.type === "parts") {
    repuestos = normalizeRepuestosModule(parsed);
  } else if (Array.isArray(parsed.parts) && parsed.parts.length) {
    repuestos = normalizeRepuestosModule(parsed);
  }

  return { tablas, repuestos };
}

function normalizeRepuestosModule(data) {
  if (!data) return null;
  const partsRaw = Array.isArray(data)
    ? data
    : Array.isArray(data.parts)
      ? data.parts
      : Array.isArray(data.repuestos)
        ? data.repuestos
        : [];
  if (!partsRaw.length) return null;

  const parts = partsRaw
    .map((p, i) => {
      if (!p || typeof p !== "object") return null;
      const partNo = String(p.part_no || p.partNo || p.codigo || p.sku || "").trim();
      const partName = String(p.part_name || p.partName || p.nombre || p.name || "").trim();
      if (!partNo && !partName) return null;
      return {
        id: String(p.row_id || p.id || `pt-${i + 1}`),
        fig: String(p.fig || p.figure || "").trim(),
        figureTitle: String(p.figure_title || p.figureTitle || p.sistema || p.system || "").trim(),
        image: String(p.image || p.imagen || p.image_url || "").trim(),
        findNo: String(p.find_no || p.findNo || p.ref || "").trim(),
        partNo,
        partName,
        system: String(p.system || p.sistema || p.figure_title || p.figureTitle || "").trim(),
      };
    })
    .filter(Boolean);

  if (!parts.length) return null;
  return {
    titulo:
      (data && !Array.isArray(data) && (data.titulo || data.title)) ||
      (COMPRAS_IS_ENGLISH ? "Spare parts" : "Repuestos"),
    parts,
  };
}

function resolvePartsImageUrl(src) {
  if (!src) return "";
  const t = String(src).trim();
  if (!t) return "";
  if (/^(https?:)?\/\//i.test(t) || t.startsWith("data:")) return t.startsWith("//") ? `https:${t}` : t;
  if (t.startsWith("/")) return t;
  return `/${t.replace(/^\/*/, "")}`;
}

function setTablasTabVisibility(hasContent) {
  document.querySelectorAll('.tab-button[data-target="tablas"], .sticky-tab-btn[data-target="tablas"]').forEach((btn) => {
    btn.hidden = !hasContent;
  });
  document.querySelectorAll(".js-goto-tablas").forEach((btn) => {
    btn.hidden = !hasContent;
  });
  const section = document.getElementById("tablas");
  if (section) {
    section.hidden = !hasContent;
    if (!hasContent) section.classList.remove("active");
  }
  updateActiveProductTabOnScroll();
}

function buildRepuestosModule(repuestos) {
  const root = document.createElement("section");
  root.className = "ip-parts";
  root.setAttribute("aria-label", COMPRAS_IS_ENGLISH ? "Spare parts" : "Repuestos");

  const parts = repuestos.parts || [];
  const systems = [...new Set(parts.map((p) => p.system || p.figureTitle).filter(Boolean))];
  const figures = [];
  const seenFig = new Set();
  for (const p of parts) {
    const key = p.fig || p.figureTitle || p.image;
    if (!key || seenFig.has(key)) continue;
    seenFig.add(key);
    figures.push({
      key,
      fig: p.fig,
      title: p.figureTitle || p.system || p.fig,
      image: p.image,
    });
  }

  const labels = COMPRAS_IS_ENGLISH
    ? {
        title: repuestos.titulo || "Spare parts",
        search: "Search part no. or name…",
        all: "All systems",
        ref: "Ref",
        partNo: "Part no.",
        name: "Description",
        empty: "No parts match your filters.",
        count: (n) => `${n} parts`,
      }
    : {
        title: repuestos.titulo || "Repuestos",
        search: "Buscar código o nombre…",
        all: "Todos los sistemas",
        ref: "Ref",
        partNo: "N.º parte",
        name: "Descripción",
        empty: "Ningún repuesto coincide con los filtros.",
        count: (n) => `${n} repuestos`,
      };

  root.innerHTML = `
    <header class="ip-parts__head">
      <div>
        <h3 class="ip-parts__title">${escapeHtml(labels.title)}</h3>
        <p class="ip-parts__count" data-ip-count>${escapeHtml(labels.count(parts.length))}</p>
      </div>
      <div class="ip-parts__tools">
        <input type="search" class="ip-parts__search" data-ip-search placeholder="${escapeHtml(labels.search)}" autocomplete="off" />
        <select class="ip-parts__system" data-ip-system aria-label="${escapeHtml(labels.all)}">
          <option value="">${escapeHtml(labels.all)}</option>
          ${systems.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("")}
        </select>
      </div>
    </header>
    <div class="ip-parts__body">
      <aside class="ip-parts__visual">
        <div class="ip-parts__figure" data-ip-figure>
          <img src="" alt="" data-ip-image hidden />
          <p class="ip-parts__figure-empty" data-ip-figure-empty>${COMPRAS_IS_ENGLISH ? "Select a part to view its figure" : "Selecciona un repuesto para ver la figura"}</p>
        </div>
        <p class="ip-parts__figure-caption" data-ip-caption></p>
        ${
          figures.length > 1
            ? `<div class="ip-parts__figs" data-ip-figs>${figures
                .map(
                  (f, i) =>
                    `<button type="button" class="ip-parts__fig-btn${i === 0 ? " is-active" : ""}" data-fig-key="${escapeHtml(f.key)}" title="${escapeHtml(f.title)}">${escapeHtml(f.fig || String(i + 1))}</button>`
                )
                .join("")}</div>`
            : ""
        }
      </aside>
      <div class="ip-parts__table-wrap">
        <table class="ip-parts__table">
          <thead>
            <tr>
              <th>${escapeHtml(labels.ref)}</th>
              <th>${escapeHtml(labels.partNo)}</th>
              <th>${escapeHtml(labels.name)}</th>
            </tr>
          </thead>
          <tbody data-ip-tbody></tbody>
        </table>
        <p class="ip-parts__empty" data-ip-empty hidden>${escapeHtml(labels.empty)}</p>
      </div>
    </div>
  `;

  const tbody = root.querySelector("[data-ip-tbody]");
  const searchEl = root.querySelector("[data-ip-search]");
  const systemEl = root.querySelector("[data-ip-system]");
  const countEl = root.querySelector("[data-ip-count]");
  const emptyEl = root.querySelector("[data-ip-empty]");
  const imgEl = root.querySelector("[data-ip-image]");
  const captionEl = root.querySelector("[data-ip-caption]");
  const figureEmpty = root.querySelector("[data-ip-figure-empty]");

  function showFigure(partOrFig) {
    const image = resolvePartsImageUrl(partOrFig && partOrFig.image);
    const caption = (partOrFig && (partOrFig.figureTitle || partOrFig.system || partOrFig.title)) || "";
    if (image) {
      imgEl.src = image;
      imgEl.alt = caption || labels.title;
      imgEl.hidden = false;
      if (figureEmpty) figureEmpty.hidden = true;
    } else {
      imgEl.hidden = true;
      imgEl.removeAttribute("src");
      if (figureEmpty) figureEmpty.hidden = false;
    }
    if (captionEl) captionEl.textContent = caption;
    const key = (partOrFig && (partOrFig.fig || partOrFig.figureTitle || partOrFig.key)) || "";
    root.querySelectorAll("[data-fig-key]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-fig-key") === key || btn.getAttribute("data-fig-key") === (partOrFig && partOrFig.key));
    });
  }

  function renderRows() {
    const q = normalizar(searchEl.value || "");
    const sys = systemEl.value || "";
    const filtered = parts.filter((p) => {
      if (sys && p.system !== sys && p.figureTitle !== sys) return false;
      if (!q) return true;
      const blob = normalizar([p.partNo, p.partName, p.findNo, p.system, p.figureTitle].join(" "));
      return blob.includes(q);
    });

    tbody.innerHTML = filtered
      .map(
        (p) => `<tr data-part-id="${escapeHtml(p.id)}" tabindex="0">
          <td>${escapeHtml(p.findNo || "—")}</td>
          <td><code>${escapeHtml(p.partNo || "—")}</code></td>
          <td>${escapeHtml(p.partName || "—")}</td>
        </tr>`
      )
      .join("");

    countEl.textContent = labels.count(filtered.length);
    emptyEl.hidden = filtered.length > 0;
    root.querySelector(".ip-parts__table").hidden = filtered.length === 0;

    tbody.querySelectorAll("tr").forEach((tr) => {
      const activate = () => {
        tbody.querySelectorAll("tr").forEach((r) => r.classList.remove("is-active"));
        tr.classList.add("is-active");
        const part = parts.find((p) => p.id === tr.getAttribute("data-part-id"));
        if (part) showFigure(part);
      };
      tr.addEventListener("click", activate);
      tr.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          activate();
        }
      });
    });
  }

  searchEl.addEventListener("input", renderRows);
  systemEl.addEventListener("change", renderRows);
  root.querySelectorAll("[data-fig-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const fig = figures.find((f) => f.key === btn.getAttribute("data-fig-key"));
      if (fig) {
        showFigure(fig);
        if (fig.title) systemEl.value = systems.includes(fig.title) ? fig.title : systemEl.value;
        renderRows();
      }
    });
  });

  renderRows();
  if (figures[0]) showFigure(figures[0]);
  else if (parts[0]) showFigure(parts[0]);

  return root;
}

/** Tamaño máximo del ejemplo TEHMA (4 cols × 6 filas) para el selector visual. */
const MODEL_SELECTOR_MAX_COLUMNS = 4;
const MODEL_SELECTOR_MAX_ROWS = 8;

function isComparisonSpecTable(tabla) {
  const columns = Array.isArray(tabla?.columnas) ? tabla.columnas : [];
  if (columns.length < 3) return false;
  const first = normalizar(columns[0] || "");
  const labelLike =
    /caracter|characteristic|feature|parametro|parameter|propiedad|property|descripcion|description|modelo|model|item|dato/.test(
      first
    );
  if (labelLike) return true;
  const modelish = columns.slice(1).filter((c) => {
    const t = String(c || "").trim();
    return t.length > 0 && t.length <= 24 && /[A-Za-z0-9]/.test(t);
  });
  return modelish.length >= 2;
}

function shouldUseModelSelector(tabla) {
  if (!isComparisonSpecTable(tabla)) return false;
  const columns = Array.isArray(tabla?.columnas) ? tabla.columnas : [];
  const rows = Array.isArray(tabla?.filas) ? tabla.filas : [];
  // Solo tablas compactas (mismo tamaño del ejemplo o menores): ≤4 cols y ≤6 filas
  if (columns.length < 3 || columns.length > MODEL_SELECTOR_MAX_COLUMNS) return false;
  if (!rows.length || rows.length > MODEL_SELECTOR_MAX_ROWS) return false;
  // Si pide filtros explícitos, respetar tabla clásica
  if (shouldEnableTableFilters(tabla)) return false;
  return true;
}

function shortMetricLabel(label) {
  const key = normalizar(label || "");
  if (/fuerza|force|demolic/.test(key)) return COMPRAS_IS_ENGLISH ? "Force" : "Fuerza";
  if (/diametro|diameter|orificio|hole/.test(key)) return COMPRAS_IS_ENGLISH ? "Diameter" : "Diámetro";
  if (/profundidad|depth/.test(key)) return COMPRAS_IS_ENGLISH ? "Depth" : "Profundidad";
  if (/separacion|spacing|cu[nñ]a|wedge/.test(key)) return COMPRAS_IS_ENGLISH ? "Spacing" : "Separación";
  if (/peso|weight/.test(key)) return COMPRAS_IS_ENGLISH ? "Weight" : "Peso";
  if (/dimension|size/.test(key)) return COMPRAS_IS_ENGLISH ? "Dimensions" : "Dimensiones";
  const clean = String(label || "").trim();
  return clean.length > 18 ? `${clean.slice(0, 16)}…` : clean || "—";
}

function metricPriority(label) {
  const key = normalizar(label || "");
  if (/fuerza|force|demolic/.test(key)) return 1;
  if (/diametro|diameter|orificio|hole/.test(key)) return 2;
  if (/profundidad|depth/.test(key)) return 3;
  if (/separacion|spacing|cu[nñ]a|wedge/.test(key)) return 4;
  if (/peso|weight/.test(key)) return 5;
  if (/dimension|size/.test(key)) return 6;
  return 50;
}

function buildModelSubtitle(specs) {
  const byKey = (re) => specs.find((s) => re.test(normalizar(s.label)))?.value || "";
  const force = byKey(/fuerza|force|demolic/);
  const hole = byKey(/diametro|diameter|orificio|hole/);
  const depth = byKey(/profundidad|depth/);
  if (hole && force) {
    return COMPRAS_IS_ENGLISH
      ? `${force} / hole ${hole}`
      : `${force} / orificio ${hole}`;
  }
  if (hole) {
    return COMPRAS_IS_ENGLISH ? `Hole ${hole}` : `Orificio ${hole}`;
  }
  if (depth && force) {
    return COMPRAS_IS_ENGLISH
      ? `${force} / depth ${depth}`
      : `${force} / profundidad ${depth}`;
  }
  return specs
    .slice(0, 2)
    .map((s) => s.value)
    .filter(Boolean)
    .join(" · ");
}

function parseComparisonModels(tabla) {
  const columns = Array.isArray(tabla?.columnas) ? tabla.columnas : [];
  const rows = Array.isArray(tabla?.filas) ? tabla.filas : [];
  const modelNames = columns.slice(1).map((c) => String(c || "").trim()).filter(Boolean);
  return modelNames.map((name, modelIndex) => {
    const specs = rows
      .map((fila) => {
        if (!Array.isArray(fila) || !fila.length) return null;
        const label = String(fila[0] ?? "").trim();
        const value = String(fila[modelIndex + 1] ?? "").trim();
        if (!label && !value) return null;
        return { label, value };
      })
      .filter(Boolean);
    const ranked = [...specs].sort((a, b) => metricPriority(a.label) - metricPriority(b.label));
    const primary = ranked.slice(0, 4);
    const secondary = ranked.slice(4);
    return {
      id: `model-${modelIndex}`,
      name,
      subtitle: buildModelSubtitle(specs),
      specs,
      primary,
      secondary,
    };
  });
}

function buildModelSelectorModule(tabla) {
  const models = parseComparisonModels(tabla);
  if (!models.length) return null;

  const labels = COMPRAS_IS_ENGLISH
    ? {
        tag: "Technical selector",
        title: "Choose the model by application",
        lead: "Interactive comparator so sales, engineering and purchasing can quickly see which configuration fits.",
        empty: "No specifications available for this model.",
      }
    : {
        tag: "Selector técnico",
        title: "Elige el modelo por aplicación",
        lead: "Comparador navegable para que ventas, ingeniería y compras entiendan rápido cuál configuración aplica.",
        empty: "Sin especificaciones para este modelo.",
      };

  const root = document.createElement("section");
  root.className = "ip-model-selector";
  root.setAttribute("aria-label", labels.title);

  root.innerHTML = `
    <header class="ip-model-selector__head">
      <div class="ip-model-selector__tag">${escapeHtml(labels.tag)}</div>
      <h3 class="ip-model-selector__title">${escapeHtml(labels.title)}</h3>
      <p class="ip-model-selector__lead">${escapeHtml(labels.lead)}</p>
    </header>
    <div class="ip-model-selector__grid">
      <div class="ip-model-selector__list" data-ip-models>
        ${models
          .map(
            (m, i) =>
              `<button type="button" class="ip-model-btn${i === 0 ? " is-active" : ""}" data-model-id="${escapeHtml(m.id)}">` +
              `${escapeHtml(m.name)}` +
              `<span>${escapeHtml(m.subtitle || "")}</span>` +
              `</button>`
          )
          .join("")}
      </div>
      <div class="ip-model-panel" data-ip-panel></div>
    </div>
  `;

  const panel = root.querySelector("[data-ip-panel]");

  function renderModel(model) {
    if (!model) {
      panel.innerHTML = `<p class="ip-model-panel__desc">${escapeHtml(labels.empty)}</p>`;
      return;
    }
    const metrics = (model.primary || [])
      .map(
        (s) =>
          `<div class="ip-model-metric"><span>${escapeHtml(shortMetricLabel(s.label))}</span>` +
          `<strong>${escapeHtml(s.value || "—")}</strong></div>`
      )
      .join("");
    const fits = (model.secondary || [])
      .map(
        (s) =>
          `<div class="ip-model-fit"><b>${escapeHtml(s.label || "")}</b>${escapeHtml(s.value || "—")}</div>`
      )
      .join("");

    panel.innerHTML =
      `<h4 class="ip-model-panel__name">${escapeHtml(model.name)}</h4>` +
      (model.subtitle
        ? `<p class="ip-model-panel__desc">${escapeHtml(model.subtitle)}</p>`
        : "") +
      `<div class="ip-model-metrics">${metrics || `<p class="ip-model-panel__desc">${escapeHtml(labels.empty)}</p>`}</div>` +
      (fits ? `<div class="ip-model-fits">${fits}</div>` : "");
  }

  root.querySelectorAll("[data-model-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".ip-model-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const model = models.find((m) => m.id === btn.getAttribute("data-model-id"));
      renderModel(model);
    });
  });

  renderModel(models[0]);
  return root;
}

function buildProductTableSection(tabla, index) {
  if (shouldUseModelSelector(tabla)) {
    const selector = buildModelSelectorModule(tabla);
    if (selector) return selector;
  }

  const tableDiv = document.createElement("div");
  tableDiv.classList.add("table-section");
  if (shouldEnableTableFilters(tabla)) {
    tableDiv.classList.add("table-section--filterable");
  }

  const isFirst = index === 0;
  const title = document.createElement("h3");
  title.classList.add("table-title", "collapsible", isFirst ? "expanded" : "collapsed");
  title.innerHTML =
    `<span class="toggle-icon" aria-hidden="true">${isFirst ? "▼" : "▶"}</span>` +
    `<span class="table-title-text">${escapeHtml(tabla.titulo || "")}</span>`;
  title.setAttribute("data-index", index);
  title.addEventListener("click", function () {
    toggleTable(this);
  });
  tableDiv.appendChild(title);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("table-content");
  contentDiv.style.display = isFirst ? "block" : "none";

  const filtersEnabled = shouldEnableTableFilters(tabla);
  const columnAnalysis = filtersEnabled ? analyzeTableColumns(tabla) : [];
  if (filtersEnabled) {
    const toolbar = buildTableFilterToolbar(tabla, columnAnalysis);
    if (toolbar) contentDiv.appendChild(toolbar);
  }

  const tableWrap = document.createElement("div");
  tableWrap.classList.add("table-wrap");

  const table = document.createElement("table");
  const isCompare = isComparisonSpecTable(tabla);
  table.classList.add("spec-data-table", "product-table");
  if (isCompare) table.classList.add("spec-data-table--compare");

  const columns = Array.isArray(tabla.columnas) ? tabla.columnas : [];
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  (tabla.filas || []).forEach((fila) => {
    const tr = document.createElement("tr");
    fila.forEach((cell, cellIndex) => {
      const td = document.createElement("td");
      const value = cell == null ? "" : String(cell);
      if (isBadgeColumn(columns[cellIndex])) {
        td.innerHTML = `<span class="table-value-badge">${escapeHtml(value)}</span>`;
      } else if (cellIndex === 0 && (isCompare || columns.length <= 2)) {
        td.innerHTML = `<b>${escapeHtml(value)}</b>`;
      } else {
        td.textContent = value;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  tableWrap.appendChild(table);
  contentDiv.appendChild(tableWrap);
  tableDiv.appendChild(contentDiv);

  if (filtersEnabled) bindTableFilters(tableDiv, tabla);

  return tableDiv;
}

function renderProductTables(selectedProduct) {
  const tablasContainer = document.getElementById("tablasContainer");
  if (!tablasContainer) return;

  const { tablas: tablasArray, repuestos } = parseProductTablasPayload(
    selectedProduct && selectedProduct.tablas
  );
  const hasContent =
    (Array.isArray(tablasArray) && tablasArray.length > 0) || !!repuestos;

  setTablasTabVisibility(hasContent);

  if (!hasContent) {
    tablasContainer.innerHTML = "";
    return;
  }

  tablasContainer.innerHTML = "";
  if (repuestos) {
    tablasContainer.appendChild(buildRepuestosModule(repuestos));
  }
  (tablasArray || []).forEach((tabla, index) => {
    tablasContainer.appendChild(buildProductTableSection(tabla, index));
  });
}

// --- SECCIONES CMS (Strapi) ---

const STRAPI_SECTIONS_BASE = 'https://sales.ingprosuppliers.com';

function buildStrapiMediaUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${STRAPI_SECTIONS_BASE}${url.startsWith('/') ? url : `/${url}`}`;
}

function renderMarkdownBasic(text) {
  if (!text) return '';
  const raw = String(text).replace(/\r\n/g, '\n').trim();
  if (!raw) return '';

  const blocks = raw.split(/\n\n+/).filter(Boolean);
  const html = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);

    // Lista simple: "1. Item" en líneas consecutivas
    if (lines.length >= 2 && lines.every((l) => /^\d+[.)]\s+\S/.test(l))) {
      html.push(
        `<ol class="cms-step-list">` +
          lines
            .map((line) => {
              const m = line.match(/^(\d+)[.)]\s+(.+)$/);
              const num = m ? m[1].padStart(2, '0') : '01';
              const label = m ? m[2] : line;
              return (
                `<li class="cms-step-list__item">` +
                `<span class="cms-step-list__num" aria-hidden="true">${escapeHtml(num)}</span>` +
                `<span class="cms-step-list__text">${escapeHtml(label)}</span>` +
                `</li>`
              );
            })
            .join('') +
          `</ol>`
      );
      i += 1;
      continue;
    }

    // Paso tipo "01. Título" (+ siguiente bloque como descripción)
    const stepMatch = block.match(/^(\d{1,2})[.)]\s+(.+)$/s);
    if (stepMatch && !block.includes('\n\n')) {
      const num = String(stepMatch[1]).padStart(2, '0');
      const titleLine = String(stepMatch[2]).trim();
      const titleParts = titleLine.split('\n');
      const title = titleParts[0].trim();
      const inlineRest = titleParts.slice(1).join(' ').trim();
      let desc = inlineRest;
      if (!desc && blocks[i + 1] && !/^\d{1,2}[.)]\s+/.test(blocks[i + 1])) {
        desc = blocks[i + 1];
        i += 1;
      }
      html.push(
        `<div class="cms-step">` +
          `<span class="cms-step__num" aria-hidden="true">${escapeHtml(num)}</span>` +
          `<div class="cms-step__body">` +
          `<h4 class="cms-step__title">${escapeHtml(title)}</h4>` +
          (desc
            ? `<p class="cms-step__desc">${escapeHtml(desc).replace(/\n/g, '<br>')}</p>`
            : '') +
          `</div></div>`
      );
      i += 1;
      continue;
    }

    // Imagen markdown: ![alt](url)
    const mdImage = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (mdImage) {
      const alt = escapeHtml(mdImage[1] || 'Image');
      const src = escapeHtml(mdImage[2]);
      html.push(
        `<figure class="cms-inline-image"><img src="${src}" alt="${alt}" loading="lazy"></figure>`
      );
      i += 1;
      continue;
    }

    html.push(`<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`);
    i += 1;
  }

  return html.join('');
}

function normalizeStrapiSecciones(payload) {
  if (!payload) return [];

  const list = Array.isArray(payload.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  return list
    .map((entry) => {
      const attrs = entry?.attributes || entry || {};
      const mediaItems = attrs.imagenes?.data || attrs.imagenes || [];
      const imagenes = (Array.isArray(mediaItems) ? mediaItems : [])
        .map((item) => {
          const media = item?.attributes || item || {};
          return {
            url: buildStrapiMediaUrl(media.url),
            alt: media.alternativeText || media.name || '',
          };
        })
        .filter((img) => img.url);

      return {
        id: entry?.id || attrs.id,
        titulo: attrs.titulo || '',
        informacion: attrs.informacion || '',
        orden: Number(attrs.orden) || 0,
        imagenes,
      };
    })
    .sort((a, b) => a.orden - b.orden);
}

function buildSeccionesApiUrls(itemId) {
  const encodedId = encodeURIComponent(itemId);
  return [
    `${STRAPI_SECTIONS_BASE}/api/secciones/producto/${encodedId}?populate=imagenes&sort=orden:asc`,
    `${STRAPI_SECTIONS_BASE}/api/secciones?filters[producto][item_id][$eq]=${encodedId}&populate=imagenes&sort=orden:asc`,
  ];
}

async function fetchProductSecciones(itemId) {
  if (!itemId) return [];

  let lastError = null;

  for (const url of buildSeccionesApiUrls(itemId)) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }

      const payload = await response.json();
      const secciones = normalizeStrapiSecciones(payload);
      if (secciones.length) return secciones;

      if (Array.isArray(payload?.data) && payload.data.length === 0) {
        return [];
      }
    } catch (error) {
      lastError = error;
      console.warn(`No se pudieron cargar secciones desde ${url}:`, error.message);
    }
  }

  if (lastError) {
    console.warn('Secciones CMS no disponibles para el producto:', lastError.message);
  }

  return [];
}

function toggleCmsSeccionesTabVisibility(hasSections) {
  document.querySelectorAll('.js-cms-secciones-tab').forEach((btn) => {
    btn.hidden = !hasSections;
  });

  const section = document.getElementById('cms-secciones');
  if (section) {
    section.hidden = !hasSections;
    if (!hasSections) section.classList.remove('active');
  }
  updateActiveProductTabOnScroll();
}

function renderCmsSeccionesCard(seccion) {
  const hasImages = Array.isArray(seccion.imagenes) && seccion.imagenes.length > 0;
  const imagesHtml = hasImages
    ? `<div class="cms-seccion-gallery${seccion.imagenes.length === 1 ? ' cms-seccion-gallery--single' : ''}">` +
      seccion.imagenes
        .map(
          (img) =>
            `<figure class="cms-seccion-image">` +
            `<img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.alt || seccion.titulo)}" loading="lazy">` +
            `</figure>`
        )
        .join('') +
      `</div>`
    : '';

  const infoHtml = seccion.informacion
    ? `<div class="cms-seccion-body content-text">${renderMarkdownBasic(seccion.informacion)}</div>`
    : '';

  const layoutClass = hasImages
    ? 'cms-seccion-layout cms-seccion-layout--media'
    : 'cms-seccion-layout';

  return (
    `<article class="cms-seccion-card">` +
    `<h3 class="cms-seccion-title">${escapeHtml(seccion.titulo)}</h3>` +
    `<div class="${layoutClass}">` +
    imagesHtml +
    infoHtml +
    `</div>` +
    `</article>`
  );
}

function renderCmsSecciones(secciones) {
  const container = document.getElementById('cmsSeccionesContainer');
  if (!container) return;

  if (!secciones.length) {
    container.innerHTML = '';
    toggleCmsSeccionesTabVisibility(false);
    return;
  }

  container.innerHTML = secciones.map(renderCmsSeccionesCard).join('');
  toggleCmsSeccionesTabVisibility(true);
}

async function loadProductSecciones() {
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || 'null');
  const itemId = selectedProduct?.item_id;

  if (!itemId) {
    toggleCmsSeccionesTabVisibility(false);
    return;
  }

  try {
    const secciones = await fetchProductSecciones(itemId);
    renderCmsSecciones(secciones);
  } catch (error) {
    console.warn('Error cargando secciones del producto:', error);
    toggleCmsSeccionesTabVisibility(false);
  }
}

function applyProductPageChrome() {
  initProductBreadcrumb();
  window.siteLayout?.setActiveNav?.('productos');
}

document.addEventListener("DOMContentLoaded", async () => {
  await cargarProductoPorSlug();

  // If product came from lean catalog (localStorage), fetch full detail by ID
  try {
    const cached = JSON.parse(localStorage.getItem("selectedProduct") || "null");
    if (cached && productNeedsHydration(cached)) {
      const full = await fetchFullProduct(cached);
      if (full) localStorage.setItem("selectedProduct", JSON.stringify(full));
    }
  } catch (_) {}

  loadSelectedProduct();
  await loadProductSecciones();
  applyProductPageChrome();
  loadRelatedProducts();
  setupDatasheetLinks();
  setupAddToCart();
  updateCartCount();
  setupSearch();
  setupBrands();
  setupMobileMenu();
  setupCategoryDropdown();
  initStickyProductTabs();
});

window.addEventListener('load', applyProductPageChrome);


/* =========================================================
   Product breadcrumb (Category › Subcategory › Item)
   If the DB sends the item as the category (e.g. "Other... - M337"),
   the code is looked up in Categorias.js and the real hierarchy is
   rebuilt. Requires Categorias.js to be loaded BEFORE compras_us.js.
   ========================================================= */
function _bcExtractCode(value) {
  const raw = String(value || '').toUpperCase().trim();
  // G205a, G206, Z204hh, and trailing-hyphen codes like G205a-
  const match = raw.match(/\b([A-Z]\d{3,4}[A-Z]{0,3})-?\b/);
  return match ? match[1] : '';
}

function _bcCleanText(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

function _bcNormalize(value) {
  return _bcCleanText(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/®/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function _bcIsGeneric(value) {
  const text = _bcNormalize(value);
  return !text || ['general', 'sin categoria', 'sin subcategoria', 'no category', 'no subcategory', 'null', 'undefined', 'n a', 'na'].includes(text);
}

function _bcGetCategoriasArray() {
  try {
    if (typeof categorias !== 'undefined' && Array.isArray(categorias)) return categorias;
  } catch (_) {}
  if (window.categorias && Array.isArray(window.categorias)) return window.categorias;
  return [];
}

function lookupCategoriaByCodigo(codigoOTexto) {
  const categoriasData = _bcGetCategoriasArray();
  if (!categoriasData.length) return null;

  const wantedCode = _bcExtractCode(codigoOTexto);
  const wantedText = _bcNormalize(codigoOTexto);
  if (!wantedCode && !wantedText) return null;

  for (const categoriaObj of categoriasData) {
    const categoriaTitulo = _bcCleanText(categoriaObj && (categoriaObj.titulo || categoriaObj.name));
    const subcategorias = Array.isArray(categoriaObj && categoriaObj.subcategorias)
      ? categoriaObj.subcategorias
      : [];

    for (const subcategoriaObj of subcategorias) {
      const subcategoriaTitulo = _bcCleanText(subcategoriaObj && (subcategoriaObj.subtitulo || subcategoriaObj.name));
      const subsubs = Array.isArray(subcategoriaObj && subcategoriaObj.subsubcategorias)
        ? subcategoriaObj.subsubcategorias
        : [];

      if (subsubs.length) {
        for (const ss of subsubs) {
          const subsubTitulo = _bcCleanText(ss && (ss.subtitulo || ss.name));
          const ssCode = _bcExtractCode(ss && ss.code);

          // Direct match on sub-subcategory (e.g. G206 Crimping tools with empty families)
          if (
            (wantedCode && ssCode && ssCode === wantedCode) ||
            (!wantedCode && wantedText && _bcNormalize(subsubTitulo) === wantedText)
          ) {
            return {
              categoria: categoriaTitulo,
              subcategoria: subcategoriaTitulo,
              subsubcategoria: subsubTitulo,
              item: '',
              codigo: ssCode || wantedCode,
              path: _bcCleanText(ss.path) || '',
            };
          }

          const familias = Array.isArray(ss && ss.familias) ? ss.familias : [];
          const familyList = familias.length
            ? familias
            : (Array.isArray(ss && ss.items) ? ss.items.map((it) => {
                const label = _bcCleanText(it);
                return { code: _bcExtractCode(label), name: label.replace(/\s*-\s*[A-Z]\d{3,4}[A-Za-z]{0,3}-?\s*$/i, '').trim(), label, path: '' };
              }) : []);

          for (const fam of familyList) {
            const itemCode = _bcExtractCode(fam.code || fam.label || fam.name);
            const itemName = _bcCleanText(fam.name || String(fam.label || '').replace(/\s*-\s*[A-Z]\d{3,4}[A-Za-z]{0,3}-?\s*$/i, '').trim());
            const itemLabel = _bcCleanText(fam.label || (itemCode ? `${itemName} - ${itemCode}` : itemName));
            const itemNorm = _bcNormalize(itemLabel);
            const nameNorm = _bcNormalize(itemName);

            if ((wantedCode && itemCode === wantedCode) || (!wantedCode && wantedText && (itemNorm === wantedText || nameNorm === wantedText))) {
              const famPath = _bcCleanText(fam.path) || '';
              const pathParts = famPath ? famPath.split(/\s*>\s*/).map(_bcCleanText).filter(Boolean) : [];
              const leafItem = pathParts.length >= 4 ? (itemName || itemLabel) : (pathParts.length === 3 ? '' : (itemName || itemLabel));
              return {
                categoria: categoriaTitulo,
                subcategoria: subcategoriaTitulo,
                subsubcategoria: subsubTitulo,
                item: leafItem,
                codigo: itemCode || wantedCode,
                path: famPath || _bcCleanText(ss.path) || '',
              };
            }
          }
        }
        continue;
      }

      const items = Array.isArray(subcategoriaObj && subcategoriaObj.items)
        ? subcategoriaObj.items
        : [];

      for (const itemOriginal of items) {
        const item = _bcCleanText(itemOriginal);
        const itemCode = _bcExtractCode(item);
        const itemText = _bcNormalize(item);
        const itemName = item.replace(/\s*-\s*[A-Z]\d{3,4}[A-Za-z]{0,3}-?\s*$/i, '').trim();

        if (wantedCode && itemCode === wantedCode) {
          return { categoria: categoriaTitulo, subcategoria: subcategoriaTitulo, subsubcategoria: '', item: itemName || item, codigo: itemCode, path: '' };
        }
        if (!wantedCode && wantedText && itemText === wantedText) {
          return { categoria: categoriaTitulo, subcategoria: subcategoriaTitulo, subsubcategoria: '', item: itemName || item, codigo: itemCode, path: '' };
        }
      }
    }
  }
  return null;
}

function _bcFormatItemLabel(item, codigo) {
  const itemText = _bcCleanText(item);
  const code = _bcExtractCode(codigo) || _bcExtractCode(itemText);
  if (!itemText) return '';
  if (!code || _bcExtractCode(itemText)) return itemText;
  return `${itemText} - ${code}`;
}

function _bcGetSelectedProduct() {
  try { return JSON.parse(localStorage.getItem('selectedProduct') || 'null'); }
  catch (_) { return null; }
}

function _bcAddCandidate(candidates, value) {
  const text = _bcCleanText(value);
  if (text && !candidates.includes(text)) candidates.push(text);
}

function _bcResolveHierarchyFromProduct(params, selectedProduct) {
  const candidates = [];
  // Prefer fields that carry taxonomy codes; cf_item is the EN product name
  _bcAddCandidate(candidates, params.get('codigo'));
  _bcAddCandidate(candidates, params.get('categoria'));
  _bcAddCandidate(candidates, params.get('item'));
  _bcAddCandidate(candidates, params.get('subcategoria'));

  if (selectedProduct) {
    [
      selectedProduct.categoria,
      selectedProduct.category,
      selectedProduct.category_name,
      selectedProduct.codigo_categoria,
      selectedProduct.categoria_codigo,
      selectedProduct.category_code,
      selectedProduct.cf_codigo_categoria,
      selectedProduct.cf_codigo,
      selectedProduct.codigo,
      selectedProduct.code,
      selectedProduct.cf_subcategoria,
      selectedProduct.subcategoria,
      selectedProduct.subcategory,
      selectedProduct.item,
      selectedProduct.cf_item,
      selectedProduct.cf_categoria,
      selectedProduct.cf_category,
    ].forEach(value => _bcAddCandidate(candidates, value));
  }

  for (const candidate of candidates) {
    if (!_bcExtractCode(candidate)) continue;
    const hierarchy = lookupCategoriaByCodigo(candidate);
    if (hierarchy) return hierarchy;
  }
  for (const candidate of candidates) {
    if (_bcExtractCode(candidate)) continue;
    const hierarchy = lookupCategoriaByCodigo(candidate);
    if (hierarchy) return hierarchy;
  }
  return null;
}

function initProductBreadcrumb() {
  const ol = document.getElementById('sectionBreadcrumbList') || document.getElementById('productBreadcrumb');
  if (!ol) return;

  function slugToTitle(s) {
    return String(s || '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  function hydrateParamsFromPath() {
    const path = window.location.pathname || "";
    const shortMatch = path.match(/^\/product\/([^/]+)\/?$/);
    if (shortMatch) {
      const qp = new URLSearchParams(window.location.search);
      if (!qp.get("slug")) {
        qp.set("slug", decodeURIComponent(shortMatch[1]));
      }
      return qp;
    }

    const legacyMatch = path.match(
      /^\/product\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)\/?$/
    );
    if (!legacyMatch) return new URLSearchParams(window.location.search);

    const [, cat, sub, item, slug] = legacyMatch;
    const qp = new URLSearchParams(window.location.search);
    if (!qp.get("categoria")) qp.set("categoria", slugToTitle(decodeURIComponent(cat)));
    if (!qp.get("subcategoria")) qp.set("subcategoria", slugToTitle(decodeURIComponent(sub)));
    if (!qp.get("item")) qp.set("item", slugToTitle(decodeURIComponent(item)));
    if (!qp.get("slug")) qp.set("slug", decodeURIComponent(slug));
    return qp;
  }

  const params = hydrateParamsFromPath();
  const selectedProduct = _bcGetSelectedProduct();

  let categoria    = _bcCleanText(params.get('categoria'));
  let subcategoria = _bcCleanText(params.get('subcategoria'));
  let subsubcategoria = _bcCleanText(params.get('subsubcategoria'));
  let item         = _bcCleanText(params.get('item'));
  let codigo       = _bcExtractCode(params.get('codigo'));

  const resolved = _bcResolveHierarchyFromProduct(params, selectedProduct);
  if (resolved) {
    categoria = resolved.categoria;
    subcategoria = resolved.subcategoria;
    subsubcategoria = resolved.subsubcategoria || '';
    item = resolved.item;
    codigo = resolved.codigo;
    if (resolved.path) {
      const parts = resolved.path.split(/\s*>\s*/).map(_bcCleanText).filter(Boolean);
      if (parts[0]) categoria = parts[0];
      if (parts[1]) subcategoria = parts[1];
      if (parts[2]) subsubcategoria = parts[2];
      if (parts[3]) item = parts[3];
      else if (parts.length <= 3) item = ''; // leaf is sub-sub (e.g. G206); product name follows
    }
  } else if (selectedProduct) {
    // cf_category / cf_categoria son industria, NO categoría técnica
    if (_bcIsGeneric(categoria)) {
      categoria = _bcCleanText(
        selectedProduct.categoria ||
          selectedProduct.category ||
          selectedProduct.category_name ||
          ""
      );
    }
    if (_bcIsGeneric(subcategoria)) subcategoria = _bcCleanText(selectedProduct.cf_subcategoria || selectedProduct.subcategoria || selectedProduct.subcategory);
    if (_bcIsGeneric(item))         item         = _bcCleanText(selectedProduct.cf_item || selectedProduct.item);
    if (!codigo) codigo = _bcExtractCode(selectedProduct.codigo_categoria || selectedProduct.categoria_codigo || selectedProduct.category_code || selectedProduct.cf_codigo_categoria || selectedProduct.cf_codigo || selectedProduct.codigo || selectedProduct.code);
  }

  if (_bcIsGeneric(categoria))    categoria = '';
  if (_bcIsGeneric(subcategoria)) subcategoria = '';
  if (_bcIsGeneric(subsubcategoria)) subsubcategoria = '';
  if (_bcIsGeneric(item))         item = '';

  const itemCode = _bcExtractCode(item);
  if (itemCode && !codigo) codigo = itemCode;

  try {
    const isShortProductUrl = /^\/product\/[^/]+\/?$/.test(window.location.pathname || "");
    if (isShortProductUrl && window.location.search) {
      history.replaceState(null, "", window.location.pathname);
    }
  } catch (_) {}

  const productosUrl = '/pages_us/productos_us.html';
  const esc = (s) => String(s == null ? '' : s)
    .replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  const industryRaw = selectedProduct
    ? (selectedProduct.cf_category || selectedProduct.industryName || '')
    : '';
  const industryMatch =
    typeof resolveIndustry === 'function' ? resolveIndustry(industryRaw) : null;
  const industryLabel = industryMatch
    ? (typeof getIndustryLabel === 'function'
        ? getIndustryLabel(industryMatch, true)
        : industryMatch.en)
    : _bcCleanText(industryRaw);

  function buildCrumbs(productName) {
    const crumbs = [
      { label: 'Home', href: '/pages_us/Home_us.html' },
      { label: 'Products', href: `${productosUrl}?section=inicio` },
    ];
    if (industryLabel && industryMatch) {
      crumbs.push({
        label: industryLabel,
        href: `${productosUrl}?industry=${encodeURIComponent(industryMatch.id)}`,
      });
    }
    if (categoria) {
      crumbs.push({
        label: categoria,
        href: `${productosUrl}?categoria=${encodeURIComponent(categoria)}`,
      });
    }
    if (subcategoria) {
      crumbs.push({
        label: subcategoria,
        href: `${productosUrl}?subcategoria=${encodeURIComponent(subcategoria)}`
              + (categoria ? `&categoria=${encodeURIComponent(categoria)}` : ''),
      });
    }
    if (subsubcategoria) {
      crumbs.push({
        label: subsubcategoria,
        href: `${productosUrl}?subsubcategoria=${encodeURIComponent(subsubcategoria)}`
              + (subcategoria ? `&subcategoria=${encodeURIComponent(subcategoria)}` : '')
              + (categoria ? `&categoria=${encodeURIComponent(categoria)}` : ''),
      });
    }
    const itemLabel = _bcCleanText(item) || _bcFormatItemLabel(item, codigo);
    if (itemLabel) {
      crumbs.push({
        label: itemLabel,
        href: `${productosUrl}?item=${encodeURIComponent(itemLabel)}`
              + (codigo ? `&codigo=${encodeURIComponent(codigo)}` : '')
              + (subsubcategoria ? `&subsubcategoria=${encodeURIComponent(subsubcategoria)}` : '')
              + (subcategoria ? `&subcategoria=${encodeURIComponent(subcategoria)}` : '')
              + (categoria    ? `&categoria=${encodeURIComponent(categoria)}`       : ''),
      });
    }
    if (productName) crumbs.push({ label: productName, href: null });
    return crumbs;
  }

  function render(productName) {
    const crumbs = buildCrumbs(_bcCleanText(productName));
    ol.innerHTML = crumbs.map((c, i) => {
      const isLast = i === crumbs.length - 1;
      if (!c.href || isLast) {
        return `<li${isLast ? ' aria-current="page"' : ''}><span class="${isLast ? 'bc-current' : ''}">${esc(c.label)}</span></li>`;
      }
      return `<li><a href="${c.href}">${esc(c.label)}</a></li>`;
    }).join('');
  }

  const initialName = (selectedProduct && getProductDisplayName(selectedProduct)) || '';
  render(initialName);

  const nameEl = document.getElementById('product-name');
  if (nameEl) {
    const tryRender = () => {
      const txt = _bcCleanText(nameEl.textContent);
      if (txt && !/^loading/i.test(txt) && !/^cargando/i.test(txt)) {
        render(txt);
        return true;
      }
      return false;
    };
    if (!tryRender()) {
      const obs = new MutationObserver(() => { if (tryRender()) obs.disconnect(); });
      obs.observe(nameEl, { childList: true, characterData: true, subtree: true });
      setTimeout(() => obs.disconnect(), 10000);
    }
  }
}

window.initProductBreadcrumb = initProductBreadcrumb;
