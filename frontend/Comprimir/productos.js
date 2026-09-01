// ========================================
// INGPROSUPPLIERS - JavaScript Principal
// ========================================

// Datos de categorias con subcategorias (estructura del archivo subcategorias.js)
// categorias + marcasPaises: ver Categorias*.js y marcasPaises.js


// Datos de paises con banderas
const countries = [
  { id: 'us', name: 'Estados Unidos', flag: '🇺🇸', code: 'US' },
  { id: 'de', name: 'Alemania', flag: '🇩🇪', code: 'DE' },
  { id: 'ch', name: 'Suiza', flag: '🇨🇭', code: 'CH' },
  { id: 'jp', name: 'Japon', flag: '🇯🇵', code: 'JP' },
  { id: 'se', name: 'Suecia', flag: '🇸🇪', code: 'SE' },
  { id: 'fr', name: 'Francia', flag: '🇫🇷', code: 'FR' },
  { id: 'it', name: 'Italia', flag: '🇮🇹', code: 'IT' },
  { id: 'uk', name: 'Reino Unido', flag: '🇬🇧', code: 'UK' },
  { id: 'cn', name: 'China', flag: '🇨🇳', code: 'CN' },
  { id: 'kr', name: 'Corea del Sur', flag: '🇰🇷', code: 'KR' },
  { id: 'dk', name: 'Dinamarca', flag: '🇩🇰', code: 'DK' },
  { id: 'nl', name: 'Paises Bajos', flag: '🇳🇱', code: 'NL' }
];

// Datos de marcas
const brands = [
  { id: 'Wika', name: 'Wika', country: 'us', logo: "https://ingprosuppliers.com/imagenes/logos/Wika.png", color: '#FFD700' },
  { id: 'siemens', name: 'Siemens', country: 'de', logo: null, color: '#009999' },
  { id: 'Arc Guard', name: 'Arc Guard', country: 'ch', logo: "https://ingprosuppliers.com/imagenes/logos/ABB.png", color: '#FF000F' },
   { id: 'Hastings', name: 'Hastings', country: 'us', logo: "https://ingprosuppliers.com/imagenes/logos/Hastings.png", color: '#00629B' },
  { id: 'honeywell', name: 'Honeywell', country: 'us', logo: null, color: '#E31937' },
  { id: 'aervoe', name: 'Aervoe', country: 'us', logo: null, color: '#0070C0' },
  { id: 'yokogawa', name: 'Yokogawa', country: 'jp', logo: null, color: '#00A0E9' },
  { id: 'endress', name: 'Endress+Hauser', country: 'ch', logo: null, color: '#003366' },
  { id: 'schneider', name: 'Schneider Electric', country: 'fr', logo: null, color: '#3DCD58' },
  { id: 'rockwell', name: 'Rockwell Automation', country: 'us', logo: null, color: '#C8102E' },
  { id: 'omron', name: 'Omron', country: 'jp', logo: null, color: '#0047BA' },
  { id: 'phoenix', name: 'Phoenix Contact', country: 'de', logo: null, color: '#00843D' },
  { id: 'danfoss', name: 'Danfoss', country: 'dk', logo: null, color: '#E2001A' },
  { id: 'festo', name: 'Festo', country: 'de', logo: null, color: '#0091D3' },
  { id: 'smc', name: 'SMC', country: 'jp', logo: null, color: '#003C71' },
  { id: 'wago', name: 'WAGO', country: 'de', logo: null, color: '#F18700' },
  { id: 'keyence', name: 'Keyence', country: 'jp', logo: null, color: '#DA291C' },
  { id: 'sick', name: 'SICK', country: 'de', logo: null, color: '#003087' },
  { id: 'ifm', name: 'ifm electronic', country: 'de', logo: null, color: '#E35205' },
  { id: 'turck', name: 'Turck', country: 'de', logo: null, color: '#FFD100' },
  { id: 'pepperl', name: 'Pepperl+Fuchs', country: 'de', logo: null, color: '#009CDE' },
  { id: 'cre', name: 'Cre', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/cre.png", color: '#009CDE' },
  { id: 'coremo', name: 'Coremo', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/coremo.png", color: '#009CDE' },
  { id: 'aervoe', name: 'Aervoe', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/aervoe.png", color: '#009CDE' },
  { id: 'allen bradley', name: 'Allen bradley', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/allen_bradley.png", color: '#009CDE' },
  { id: 'amprobe', name: 'Amprobe', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/amprobe.png", color: '#009CDE' },
   { id: 'appleton', name: 'Appleton', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/appleton.png", color: '#009CDE' },
   { id: 'baker hughes', name: 'Baker hughes', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/baker_hughes.png", color: '#009CDE' },
   { id: 'bartec', name: 'Bartec', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/bartec.png", color: '#009CDE' },
   { id: 'burndy', name: 'Burndy', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/burndy.png", color: '#009CDE' },
   { id: 'cat', name: 'Cat', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/cat.png", color: '#009CDE' },
   { id: 'comet', name: 'Comet', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/comet.png", color: '#009CDE' },
   { id: 'coppus', name: 'Coppus', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/coppus.png", color: '#009CDE' },
   { id: 'deep sea', name: 'Deep sea', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/deepsea.png", color: '#009CDE' },
   { id: 'defelsko', name: 'Defelsko', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/defelsko.png", color: '#009CDE' },
   { id: 'detcon', name: 'Detcon', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/detcon.png", color: '#009CDE' },
   { id: 'dwt', name: 'Dwt', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/dwt.png", color: '#009CDE' },
   { id: 'elcometer', name: 'Elcometer', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/elcometer.png", color: '#009CDE' },
   { id: 'emerson', name: 'Emerson', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/emerson.png", color: '#009CDE' },
   { id: 'enerpac', name: 'Enerpac', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/enerpac.png", color: '#009CDE' },
   { id: 'esab', name: 'Esab', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/esab.png", color: '#009CDE' },
   { id: 'extech', name: 'Extech', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/extech.png", color: '#009CDE' },
   { id: 'fameca', name: 'Fameca', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fameca.png", color: '#009CDE' },
   { id: 'fisher', name: 'Fisher', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fisher.png", color: '#009CDE' },
   { id: 'flir', name: 'Flir', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/flir.png", color: '#009CDE' },
   { id: 'fluke', name: 'Fluke', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fluke.png", color: '#009CDE' },
   { id: 'fw murphy', name: 'Fw murphy', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fwmurphy.png", color: '#009CDE' },
   { id: 'gates', name: 'Gates', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/gates.png", color: '#009CDE' },
   { id: 'generac', name: 'Generac', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/generpac.png", color: '#009CDE' },
   { id: 'genius', name: 'Genius', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/genius.png", color: '#009CDE' },
   { id: 'getac', name: 'Getac', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/getac.png", color: '#009CDE' },
   { id: 'greenlee', name: 'Greenlee', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/greenlee.png", color: '#009CDE' },
   { id: 'griffco', name: 'Griffco', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/griffco.png", color: '#009CDE' },
   { id: 'gore', name: 'Gore', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/gore.png", color: '#009CDE' },
   { id: 'hioki', name: 'Hioki', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hioki.png", color: '#009CDE' },
   { id: 'hilti', name: 'Hilti', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hilti.png", color: '#009CDE' },
   { id: 'hytera', name: 'Hytera', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hytera.png", color: '#009CDE' },
   { id: 'hydrajaws', name: 'Hydrajaws', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hydrajaws.png", color: '#009CDE' },
   { id: 'ingpro', name: 'Ingpro', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logo.png", color: '#009CDE' },
   { id: 'kaishan', name: 'Kaishan', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kaishan.png", color: '#009CDE' },
   { id: 'jurop', name: 'jurop', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/jurop.png", color: '#009CDE' },
   { id: 'kamat', name: 'Kamat', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kamat.png", color: '#009CDE' },
   { id: 'kewtech', name: 'Kewtech', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kewtech.png", color: '#009CDE' },
   { id: 'kluber', name: 'Kluber', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kluber.png", color: '#009CDE' },
   { id: 'kyoritsu', name: 'Kyoritsu', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kyoritsu.png", color: '#009CDE' },
   { id: 'Lapmaster', name: 'Lapmaster', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Lapmaster.png", color: '#009CDE' },
   { id: 'Lapmaster', name: 'Lapmaster', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Lapmaster.png", color: '#009CDE' },
   { id: 'leister', name: 'Leister', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/leister.png", color: '#009CDE' },
   { id: 'lemasa', name: 'Lemasa', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/lemasa.png", color: '#009CDE' },
   { id: 'loctite', name: 'Loctite', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/loctite.png", color: '#009CDE' },
   { id: 'lincoln', name: 'Lincoln', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/lincoln.png", color: '#009CDE' },
   { id: '3m', name: '3M', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/3m.png", color: '#009CDE' },
   { id: 'Ziehl-abegg', name: 'Ziehl-abegg', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/ziehl-abegg.png", color: '#009CDE' },
   { id: 'yokogawa', name: 'Yokogawa', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/yokogawa.png", color: '#009CDE' },
   { id: 'yto', name: 'Yto', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/yto.png", color: '#009CDE' },
   { id: 'woodward', name: 'Woodward', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/woodward.png", color: '#009CDE' },
   { id: 'unit t', name: 'Unit T', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/unit-t.png", color: '#009CDE' },
   { id: 'ultraprobe', name: 'Ultraprobe', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/ultraprobe.png", color: '#009CDE' },
   { id: 'unior', name: 'Unior', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/unior.png", color: '#009CDE' },
   { id: 'perkins', name: 'Perkins', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/perkins.png", color: '#009CDE' },
   { id: 'parker', name: 'Parker', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/parker.png", color: '#009CDE' },
   { id: 'nov', name: 'NOV', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/nov.png", color: '#009CDE' },
   { id: 'ofmer', name: 'Ofmer', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/ofmer.png", color: '#009CDE' },
   { id: 'tentech', name: 'Tentech', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/tentech.png", color: '#009CDE' },
   { id: 'tuff bucket', name: 'Tuff Bucket', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/tuff-bucket.png", color: '#009CDE' },
   { id: 'tweco', name: 'Tweco', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/tweco.png", color: '#009CDE' },
   { id: 'Dresser Texsteam', name: 'Dresser Texsteam', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Dresser.png", color: '#009CDE' },
   { id: 'Airtools', name: 'Airtools', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Airtools.png", color: '#009CDE' },
   { id: 'Bently', name: 'Bently', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Bentley.png", color: '#009CDE' }
];

// ============================================================
// INGPROSUPPLIERS - MOTOR OPTIMIZADO (no bloquea hilo principal)
// - normalizeText memoizado
// - índice O(1) producto <-> (categoría, subcategoría)
// - conteos en una sola pasada
// - delegación de eventos (sin listeners por tarjeta)
// - render por chunks con requestIdleCallback
// - lazy: navbar/categorías solo cuando se necesitan
// ============================================================

/* ---------- Utilidades base ---------- */
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function buildProductSlug(product) {
  if (!product) return 'item';
  const nameSlug = slugify(product.name);
  const code = String(
    product.sku ||
      product.cf_codigo ||
      product.codigo ||
      product.code ||
      ''
  ).trim();
  const codeSlug = slugify(code);
  const itemIdSlug = slugify(product.item_id || product.id || '');
  const isOpaque = (value) =>
    /^[a-f0-9]{10,}$/i.test(value) || /^\d{8,}$/.test(value);

  if (nameSlug && codeSlug && !isOpaque(code)) {
    if (nameSlug === codeSlug || nameSlug.endsWith(`-${codeSlug}`)) {
      return nameSlug;
    }
    return `${nameSlug}-${codeSlug}`;
  }
  if (nameSlug) return nameSlug;
  if (codeSlug && !isOpaque(code)) return codeSlug;
  return itemIdSlug || 'item';
}

function buildProductUrl(product) {
  return `/producto/${buildProductSlug(product)}`;
}

// normalizeText con caché (LRU acotado)
const _normCache = new Map();
function normalizeText(value) {
  if (value === null || value === undefined) return '';
  const key = typeof value === 'string' ? value : String(value);
  const hit = _normCache.get(key);
  if (hit !== undefined) return hit;
  const out = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
  if (_normCache.size > 5000) _normCache.clear();
  _normCache.set(key, out);
  return out;
}
const normalizeTextValue = normalizeText;

/* ---------- Loader global ---------- */
function showGlobalLoader(message = 'Cargando...') {
  const loader = document.getElementById('globalLoader');
  if (!loader) return;
  const txt = loader.querySelector('.loader-text');
  if (txt) txt.textContent = message;
  loader.setAttribute('aria-hidden', 'false');
  loader.classList.remove('hidden');
}
function hideGlobalLoader() {
  const loader = document.getElementById('globalLoader');
  if (!loader) return;
  loader.setAttribute('aria-hidden', 'true');
  loader.classList.add('hidden');
}

/* ---------- Índices precomputados sobre constantes ---------- */
// Marca → país (overrides), case-insensitive
const _marcasPaisesIndex = (() => {
  const m = new Map();
  for (const k of Object.keys(marcasPaises)) m.set(normalizeText(k), marcasPaises[k]);
  return m;
})();

// País normalizado → objeto país
const _countryIndex = (() => {
  const byKey = new Map();
  for (const c of countries) {
    [c.id, c.code, c.name].forEach(v => { const n = normalizeText(v); if (n) byKey.set(n, c); });
  }
  return byKey;
})();

// Marca normalizada → objeto marca
const _brandIndex = (() => {
  const byName = new Map();
  for (const b of brands) byName.set(normalizeText(b.name), b);
  return byName;
})();

function findCountryMatch(value) {
  const n = normalizeText(value);
  if (!n) return null;
  if (_countryIndex.has(n)) return _countryIndex.get(n);
  // fallback (inclusión) — raro, sólo si no hay match exacto
  for (const c of countries) {
    const cn = normalizeText(c.name);
    if (cn && (cn.includes(n) || n.includes(cn))) return c;
  }
  return null;
}
function findBrandMatch(name) {
  const n = normalizeText(name);
  if (!n) return null;
  if (_brandIndex.has(n)) return _brandIndex.get(n);
  for (const [bn, b] of _brandIndex) {
    if (bn && (n.includes(bn) || bn.includes(n))) return b;
  }
  return null;
}
function findBrandCountryId(name) {
  if (!name) return null;
  const override = _marcasPaisesIndex.get(normalizeText(name));
  if (!override) return null;
  const c = findCountryMatch(override);
  return c ? c.id : null;
}

// Índice de items de categoría: cada item lo descomponemos a {catTitle, subTitle, nameNorm, codeNorm, fullNorm}
// Esto permite que para cada producto encontremos sus "buckets" (cat||sub) sin loops anidados por render.
const _categoryItemIndex = (() => {
  const list = [];
  for (const c of categorias) {
    for (const s of c.subcategorias) {
      for (const it of (s.items || [])) {
        const parts = String(it).split(' - ');
        list.push({
          cat: c.titulo,
          sub: s.subtitulo,
          name: normalizeText(parts[0] || ''),
          code: normalizeText(parts[1] || ''),
          full: normalizeText(it),
        });
      }
    }
  }
  return list;
})();
const _categoryByTitleNorm = (() => {
  const m = new Map();
  for (const c of categorias) m.set(normalizeText(c.titulo), c);
  return m;
})();

const _bucketByKey = (() => {
  const map = new Map();
  for (const it of _categoryItemIndex) {
    const bucket = it.cat + '||' + it.sub;
    for (const key of [it.full, it.name, it.code]) {
      if (!key) continue;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push({ cat: it.cat, sub: it.sub, bucket });
    }
  }
  return map;
})();

function _addBucketHits(buckets, catKeys, key) {
  if (!key) return;
  const hits = _bucketByKey.get(key);
  if (!hits) return;
  for (let i = 0; i < hits.length; i++) {
    buckets.add(hits[i].bucket);
    catKeys.add(hits[i].cat);
  }
}

function extractItemCode(value) {
  if (!value) return '';
  const parts = String(value).split(' - ');
  return normalizeText(parts[parts.length - 1] || '');
}

/* ---------- Estado ---------- */
const API_URL = '/api/products';
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let productsPerPage = 12;
let activeFilters = { country: null, category: null, subcategory: null, brand: null, search: '', itemCode: null };

// Cachés
let categoryCache = {};       // titulo -> count
let subcategoryCache = {};    // "titulo||subtitulo" -> count
let countryCountCache = {};   // countryId -> count
let brandCountCache = {};     // brandId -> count
let brandCountByNameNorm = {};// brandName(normalized) -> count

let searchDebounceTimer = null;

/* ---------- Imágenes y precios ---------- */
function normalizeImageUrl(src) {
  if (!src) return '';
  const t = String(src).trim();
  if (!t) return '';
  if (/^(https?:)?\/\//i.test(t)) return t.startsWith('//') ? `https:${t}` : t;
  return `https://ingprosuppliers.com/${t.replace(/^\/*/, '')}`;
}
function getProductImageUrl(p) {
  if (!p) return '';
  if (typeof p.image_url === 'string' && p.image_url.trim()) return normalizeImageUrl(p.image_url);
  if (typeof p.imagen_url === 'string' && p.imagen_url.trim()) return normalizeImageUrl(p.imagen_url);
  if (Array.isArray(p.images) && p.images.length) {
    const f = p.images[0];
    if (typeof f.image_url === 'string' && f.image_url.trim()) return normalizeImageUrl(f.image_url);
    if (typeof f.url === 'string' && f.url.trim()) return normalizeImageUrl(f.url);
  }
  if (p.imagenes_url) {
    try {
      if (typeof p.imagenes_url === 'string') {
        const parsed = JSON.parse(p.imagenes_url);
        if (Array.isArray(parsed) && parsed[0]) return normalizeImageUrl(parsed[0]);
        if (typeof parsed === 'string' && parsed.trim()) return normalizeImageUrl(parsed);
      } else if (Array.isArray(p.imagenes_url) && p.imagenes_url.length) {
        return normalizeImageUrl(p.imagenes_url[0]);
      }
    } catch {
      if (typeof p.imagenes_url === 'string' && p.imagenes_url.trim()) return normalizeImageUrl(p.imagenes_url);
    }
  }
  if (typeof p.image_name === 'string' && p.image_name.trim()) return normalizeImageUrl(`imagenes/productos/${p.image_name.trim()}`);
  return '';
}
const _priceFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
function formatPrice(rate) {
  const n = Number(rate);
  if (!rate || Number.isNaN(n) || n <= 0) return '';
  return _priceFmt.format(n);
}

/* ---------- Adaptador de productos (precomputa todo lo caro) ---------- */
function adaptApiProduct(p, idx) {
  const marcaApi = (p.cf_marca || '').trim();
  const brandMatch = findBrandMatch(marcaApi);
  const normalizedBrandId = slugify(normalizeText(marcaApi)) || 'unknown';
  const rawCountryValue = p.cf_pais || p.pais || p.country || p.origin || p.country_code || p.countryCode || p.countryName || p.country_name || '';
  const countryMatch = findCountryMatch(rawCountryValue);
  const brandCountryOverride = findBrandCountryId(marcaApi) || findBrandCountryId(normalizedBrandId);
  const productCountry = countryMatch ? countryMatch.id : (brandMatch ? brandMatch.country : brandCountryOverride);

  const name = p.name || 'Sin nombre';
  const sku = p.sku || '';
  const brandName = marcaApi || 'Sin marca';
  const categoryName = p.cf_categoria || '';
  const subcategoryName = p.cf_subcategoria || '';

  // Precomputo de campos de búsqueda y categorización
  const catNorm = normalizeText(categoryName || p.categoria || '');
  const subNorm = normalizeText(subcategoryName || p.subcategoria || '');
  const rawCatNorm = normalizeText(p.cf_categoria || p.categoria || '');
  const rawSubNorm = normalizeText(p.cf_subcategoria || p.subcategoria || '');
  const catCode = extractItemCode(categoryName || p.categoria || '');
  const subCode = extractItemCode(subcategoryName || p.subcategoria || '');
  const rawCatCode = extractItemCode(p.cf_categoria || p.categoria || '');
  const rawSubCode = extractItemCode(p.cf_subcategoria || p.subcategoria || '');

  const buckets = new Set();
  const catKeys = new Set();
  const targets = [catNorm, rawCatNorm, catCode, subCode, rawCatCode, rawSubCode];
  const seenTargets = new Set();
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    if (!t || seenTargets.has(t)) continue;
    seenTargets.add(t);
    _addBucketHits(buckets, catKeys, t);
  }
  const codeSource = [name, sku, p.categoria || '', p.cf_categoria || '', p.cf_subcategoria || ''].join(' ');
  const codeRe = /[A-Z]\d{3,4}/gi;
  let codeMatch;
  while ((codeMatch = codeRe.exec(codeSource)) !== null) {
    _addBucketHits(buckets, catKeys, normalizeText(codeMatch[0]));
  }
  // Match directo por categoría/subcategoría reportada (sin items)
  for (const c of categorias) {
    const cn = normalizeText(c.titulo);
    const matchCat = cn && (cn === catNorm || cn === rawCatNorm || catNorm.includes(cn) || rawCatNorm.includes(cn));
    if (!matchCat) continue;
    catKeys.add(c.titulo);
    for (const s of c.subcategorias) {
      const sn = normalizeText(s.subtitulo);
      if (!sn) continue;
      if (sn === subNorm || sn === rawSubNorm || subNorm.includes(sn) || rawSubNorm.includes(sn)) {
        buckets.add(c.titulo + '||' + s.subtitulo);
      }
    }
  }

  return {
    id: p.product_id || p.item_id || `p-${idx}`,
    name, sku,
    brand: brandMatch ? brandMatch.id : normalizedBrandId,
    brandName,
    brandColor: brandMatch ? brandMatch.color : '#0066cc',
    country: productCountry,
    category: categoryName, categoryName,
    subcategory: subcategoryName, subcategoryName,
    rate: Number(p.rate || 0),
    image: getProductImageUrl(p),
    delivery: Number(p.stock_on_hand || 0) > 0 ? 'En stock' : '',
    // Campos precomputados para filtrado rápido (no se vuelven a calcular)
    _searchBlob: [name, sku, brandName, categoryName, subcategoryName, p.categoria || '', p.cf_categoria || '', p.cf_subcategoria || ''].join(' ').toLowerCase(),
    _brandNorm: normalizeText(brandName),
    _buckets: buckets,
    _catKeys: catKeys,
    _subNorm: subNorm || rawSubNorm,
  };
}

/* ---------- Pertenencia O(1) (usado por código antiguo si queda) ---------- */
function productBelongsToCategory(product, categoryTitle, subcategoryTitle) {
  if (!categoryTitle && !subcategoryTitle) return true;
  if (categoryTitle && subcategoryTitle) return product._buckets.has(categoryTitle + '||' + subcategoryTitle);
  if (categoryTitle) return product._catKeys.has(categoryTitle);
  // sólo subcategoría
  const sn = normalizeText(subcategoryTitle);
  if (product._subNorm === sn) return true;
  for (const k of product._buckets) if (k.endsWith('||' + subcategoryTitle)) return true;
  return false;
}

/* ---------- Sincronizar marcas con productos (una pasada) ---------- */
function syncBrandsFromProducts() {
  const counts = new Map();
  const countryByBrand = new Map();
  for (const p of allProducts) {
    const n = p._brandNorm;
    if (!n) continue;
    counts.set(n, (counts.get(n) || 0) + 1);
    if (p.country && !countryByBrand.has(n)) countryByBrand.set(n, p.country);
  }
  const existing = new Map();
  for (const b of brands) existing.set(normalizeText(b.name), b);

  const newList = [];
  for (const key of counts.keys()) {
    const m = existing.get(key);
    if (m) { newList.push(m); continue; }
    const display = key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const fromProduct = countryByBrand.get(key) || findBrandCountryId(key) || null;
    newList.push({ id: slugify(key), name: display, country: fromProduct, logo: null, color: '#0066cc' });
  }
  brands.length = 0;
  for (const b of newList) brands.push(b);
}

/* ---------- Construir todos los conteos en una sola pasada ---------- */
function buildAllCaches() {
  categoryCache = {};
  subcategoryCache = {};
  countryCountCache = {};
  brandCountCache = {};
  brandCountByNameNorm = {};

  // Inicializar a 0 para que las categorías declaradas siempre aparezcan
  for (const c of categorias) {
    categoryCache[c.titulo] = 0;
    for (const s of c.subcategorias) subcategoryCache[c.titulo + '||' + s.subtitulo] = 0;
  }

  for (const p of allProducts) {
    if (p.country) countryCountCache[p.country] = (countryCountCache[p.country] || 0) + 1;
    if (p.brand) brandCountCache[p.brand] = (brandCountCache[p.brand] || 0) + 1;
    if (p._brandNorm) brandCountByNameNorm[p._brandNorm] = (brandCountByNameNorm[p._brandNorm] || 0) + 1;

    // Para no contar dos veces una categoría si el producto cae en varias subcategorías de ella
    for (const cat of p._catKeys) categoryCache[cat] = (categoryCache[cat] || 0) + 1;
    for (const bk of p._buckets) subcategoryCache[bk] = (subcategoryCache[bk] || 0) + 1;
  }
}
const buildCategoryCache = buildAllCaches; // alias retro-compat
const getCategoryCount = (t) => categoryCache[t] || 0;
const getSubcategoryCount = (c, s) => subcategoryCache[c + '||' + s] || 0;

/* ---------- Fetch ---------- */
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data.products || data.data || []);
    const adapted = [];
    const CHUNK = 80;
    for (let i = 0; i < list.length; i++) {
      adapted.push(adaptApiProduct(list[i], i));
      if (i > 0 && i % CHUNK === 0) {
        await new Promise((resolve) => {
          if (window.requestIdleCallback) requestIdleCallback(() => resolve(), { timeout: 40 });
          else setTimeout(resolve, 0);
        });
      }
    }
    return adapted;
  } catch (err) {
    console.error('❌ Error cargando productos:', err);
    return [];
  }
}

/* ---------- Helpers DOM ---------- */
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function whenIdle(fn, timeout = 200) {
  if (window.requestIdleCallback) requestIdleCallback(fn, { timeout });
  else setTimeout(fn, 16);
}

const _lazySections = { paises: false, categorias: false, marcas: false, navbarCats: false };

function ensureSectionContent(sectionId) {
  if (sectionId === 'paises' && !_lazySections.paises) {
    renderCountries();
    _lazySections.paises = true;
  }
  if ((sectionId === 'categorias' || sectionId === 'subcategorias') && !_lazySections.categorias) {
    renderCategories();
    _lazySections.categorias = true;
  }
  if (sectionId === 'marcas' && !_lazySections.marcas) {
    renderBrands();
    _lazySections.marcas = true;
  }
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initBrowseCards();
  initSearch();
  initSort();
  initNavbarDropdown();
  initNavbarScroll();
  updateSectionBreadcrumb('inicio');
  initBreadcrumbNav();
  initSectionSwitcher();
  updateCartCount();

  showGlobalLoader('Cargando información...');
  allProducts = await fetchProducts();
  filteredProducts = allProducts.slice();
  syncBrandsFromProducts();
  buildAllCaches();

  initStats();
  renderSidebarFilters();
  renderProducts();
  hideGlobalLoader();

  whenIdle(() => {
    if (!_lazySections.navbarCats) {
      renderNavbarCategories();
      _lazySections.navbarCats = true;
    }
  }, 800);

  checkUrlParams();
});

/* ---------- URL params ---------- */
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const itemParam = params.get('item');
  const subcategoriaSeleccionada = params.get('subcategoria');
  const categoriaParam = params.get('categoria');
  const searchParam = params.get('q');

  if (itemParam) {
    const rawItem = itemParam;
    const nombreVisible = rawItem.split(' - ')[0] || rawItem;
    const itemCode = (rawItem.split(' - ')[1] || '').trim();
    const categoriaPadre = categoriaParam || '';
    const subcategoriaName = subcategoriaSeleccionada || '';
    if (subcategoriaName || categoriaPadre) {
      showProductsForSubcategory(subcategoriaName, categoriaPadre, nombreVisible, itemCode);
    } else {
      activeFilters.search = nombreVisible;
      activeFilters.itemCode = itemCode || null;
      applyFilters();
      updateProductsTitle();
      showSection('productos');
    }
    return;
  }
  if (subcategoriaSeleccionada) { showSubcategoria(decodeURIComponent(subcategoriaSeleccionada)); return; }
  if (searchParam) {
    activeFilters.search = decodeURIComponent(searchParam);
    activeFilters.itemCode = null;
    applyFilters(); updateProductsTitle(); showSection('productos');
  }
}

/* ---------- Subcategoría (página) ---------- */
function showSubcategoria(subcategoriaName) {
  const titulo = document.getElementById('titulo-subcategoria');
  const contenedor = document.getElementById('lista-subcategorias');
  const breadcrumb = document.getElementById('breadcrumb');
  if (titulo) titulo.textContent = subcategoriaName;
  let encontrada = false, categoriaPadre = '';
  const target = subcategoriaName.toUpperCase();
  for (const c of categorias) {
    for (const s of c.subcategorias) {
      if (s.subtitulo.toUpperCase() === target) {
        encontrada = true; categoriaPadre = c.titulo;
        renderSubcategoriaItems(s, categoriaPadre, subcategoriaName, contenedor);
        break;
      }
    }
    if (encontrada) break;
  }
  if (!encontrada && contenedor) contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
  if (encontrada && breadcrumb) {
    breadcrumb.innerHTML = `<a href="/">Inicio</a> / <a href="#" onclick="showSection('categorias'); return false;">${escapeHtml(categoriaPadre)}</a> / ${escapeHtml(subcategoriaName)}`;
  }
  showSection('subcategorias');
}

function renderSubcategoriaItems(subcategoria, categoriaPadre, subcategoriaName, contenedor) {
  if (!contenedor) return;

  const items = subcategoria.items || [];
  const imageCandidates = _subcategoryImageCandidates(categoriaPadre, subcategoriaName);
  const heroMedia = imageCandidates.length
    ? _imgWithFallback(imageCandidates, subcategoriaName, 'subcat-hero-img')
    : `<div class="subcat-hero-media-icon">${_iconForSubcategory(subcategoriaName)}</div>`;
  const heroHtml = `
    <header class="subcat-hero subcat-hero--lite">
      <div class="subcat-hero-media">
        ${heroMedia}
      </div>
      <div class="subcat-hero-info">
        <span class="subcat-hero-eyebrow">${escapeHtml(categoriaPadre)}</span>
        <h2 class="subcat-hero-title">${escapeHtml(subcategoriaName)}</h2>
        <p class="subcat-hero-desc">${items.length} tipos disponibles. Selecciona uno para ver los productos.</p>
        <button type="button" class="subcat-hero-view-all" data-category="${escapeHtml(categoriaPadre)}" data-subcategory="${escapeHtml(subcategoriaName)}">Ver toda la subcategoría</button>
      </div>
    </header>`;

  const itemMedia = imageCandidates.length
    ? _imgWithFallback(imageCandidates, subcategoriaName)
    : `<div class="category-card-media-icon">${_iconForSubcategory(subcategoriaName)}</div>`;

  const rows = items.map((item) => {
    const nombreVisible = item.split(' - ')[0] || item;
    const codigo = (item.split(' - ')[1] || '').trim();
    return `<article class="category-card subcategory-mode subcat-item-card-v2">
      <button class="category-card-main subcat-item-row" type="button"
        data-item="${encodeURIComponent(item)}"
        data-category="${encodeURIComponent(categoriaPadre)}"
        data-subcategory="${encodeURIComponent(subcategoriaName)}"
        aria-label="Abrir ${escapeHtml(nombreVisible)}">
        <div class="category-card-media">
          ${itemMedia}
          ${codigo ? `<span class="category-media-label">${escapeHtml(codigo)}</span>` : ''}
        </div>
        <div class="category-card-copy">
          <h3>${escapeHtml(nombreVisible)}</h3>
          <p class="category-card-description">${escapeHtml(subcategoriaName)}</p>
          <span>Ver productos →</span>
        </div>
      </button>
    </article>`;
  }).join('');

  contenedor.innerHTML = heroHtml + `<div class="categories-accordion category-grid-view subcat-items-cards">${rows}</div>`;


  if (!contenedor.dataset.subcategoryHandlerAttached) {
    contenedor.addEventListener('click', (e) => {
      const viewAllBtn = e.target.closest('.subcat-hero-view-all');
      if (viewAllBtn) {
        e.preventDefault();
        showProductsForSubcategory(decodeURIComponent(viewAllBtn.dataset.subcategory || ''), decodeURIComponent(viewAllBtn.dataset.category || ''), '');
        return;
      }
      const btn = e.target.closest('.subcat-item-row, .subcat-item-card, .motor-item-btn');
      if (!btn) return;
      const rawItem = decodeURIComponent(btn.dataset.item || '');
      const nombreVisible = rawItem.split(' - ')[0] || rawItem;
      const codigoItem = (rawItem.split(' - ')[1] || '').trim();
      showProductsForSubcategory(decodeURIComponent(btn.dataset.subcategory || ''), decodeURIComponent(btn.dataset.category || ''), nombreVisible, codigoItem);
    });
    contenedor.dataset.subcategoryHandlerAttached = '1';
  }
}

function showProductsForSubcategory(subcategoriaName, categoriaPadre, searchTerm, itemCode = '') {
  activeFilters.category = categoriaPadre || null;
  activeFilters.subcategory = subcategoriaName || null;
  activeFilters.search = searchTerm || '';
  activeFilters.itemCode = itemCode || null;
  applyFilters(); updateProductsTitle(); showSection('productos');
}

/* ---------- Navbar / scroll (rAF + passive) ---------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  let ticking = false;
  const offsetTop = navbar.offsetTop;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      navbar.classList.toggle('fixed', window.scrollY > offsetTop + 100);
      ticking = false;
    });
  }, { passive: true });
}

function initNavbarDropdown() {
  // Delegación: un único listener en document
  if (document._navbarDelegationAttached) return;
  document._navbarDelegationAttached = true;
  document.addEventListener('click', (e) => {
    const span = e.target.closest('.category-item > span');
    if (span) {
      e.stopPropagation();
      const parentItem = span.parentElement;
      document.querySelectorAll('.category-item').forEach(o => { if (o !== parentItem) o.classList.remove('active'); });
      parentItem.classList.toggle('active');
      return;
    }
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.category-item.active').forEach(i => i.classList.remove('active'));
    }
  });
}

function initNavigation() {
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.target === 'categorias') resetCategoriesView();
      showSection(btn.dataset.target);
    });
  });
  document.querySelectorAll('[data-section-link], [data-hero-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.sectionLink || btn.dataset.heroTarget;
      if (target === 'categorias') resetCategoriesView();
      showSection(target);
    });
  });
  const menuToggle = document.getElementById('menuToggle');
  const primaryMenu = document.getElementById('primaryMenu');
  if (menuToggle && primaryMenu) {
    menuToggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }
}

function resetCategoriesView() {
  const grid = document.getElementById('categoriesGrid');
  if (grid) {
    grid._catView = null;
    if (typeof renderCategories === 'function') renderCategories();
  }
}

const _SECTION_IDS = ['inicio','paises','categorias','marcas','productos','subcategorias'];
let _sectionElCache = null, _navLinkCache = null;
function showSection(sectionId) {
  if (!_sectionElCache) {
    _sectionElCache = {};
    for (const id of _SECTION_IDS) _sectionElCache[id] = document.getElementById(id + 'Section');
    _sectionElCache.hero = document.getElementById('heroSection');
    _sectionElCache.intel = document.getElementById('corporateIntelligence');
  }
  ensureSectionContent(sectionId);
  if (sectionId === 'categorias') resetCategoriesView();
  for (const id of _SECTION_IDS) {
    const el = _sectionElCache[id];
    if (el) el.classList.toggle('hidden', id !== sectionId);
  }
  if (_sectionElCache.hero) _sectionElCache.hero.classList.toggle('hidden', sectionId !== 'inicio');
  if (_sectionElCache.intel) _sectionElCache.intel.classList.toggle('hidden', sectionId !== 'inicio');
  if (!_navLinkCache) _navLinkCache = document.querySelectorAll('[data-section-link]');
  for (let i = 0; i < _navLinkCache.length; i++) {
    const btn = _navLinkCache[i];
    btn.classList.toggle('active', btn.dataset.sectionLink === sectionId);
  }
  updateSectionBreadcrumb(sectionId);
  window.scrollTo(0, 0);
}

/* ---------- Breadcrumb sección ---------- */
const SECTION_LABELS = { inicio:'🏠 Inicio', paises:'🌍 Paises', categorias:'📂 Categorias', marcas:'🏷️ Marcas', productos:'📦 Productos', subcategorias:'🔎 Subcategoria' };
const SECTION_SWITCHES = [
  { id:'inicio', label:'🏠 Inicio' },{ id:'paises', label:'🌍 Paises' },
  { id:'categorias', label:'📂 Categorias' },{ id:'marcas', label:'🏷️ Marcas' },
  { id:'productos', label:'📦 Productos' },
];
function initSectionSwitcher() {
  const c = document.getElementById('sectionSwitcher');
  if (!c) return;
  c.innerHTML = SECTION_SWITCHES.map(i => `<button type="button" data-section="${i.id}">${i.label}</button>`).join('');
  c.addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-section]');
    if (b) showSection(b.dataset.section);
  });
}
function updateSectionBreadcrumb(sectionId) {
  const list = document.getElementById('sectionBreadcrumbList');
  if (!list) return;

  const crumbs = [{ key: 'inicio', label: SECTION_LABELS.inicio, action: 'section:inicio' }];

  if (sectionId && sectionId !== 'inicio') {
    // Para subcategorias, agregar "Categorías" en lugar de "Subcategoria"
    if (sectionId === 'subcategorias') {
      crumbs.push({
        key: 'categorias',
        label: SECTION_LABELS.categorias,
        action: 'section:categorias',
      });
    } else {
      crumbs.push({
        key: sectionId,
        label: SECTION_LABELS[sectionId] || sectionId,
        action: 'section:' + sectionId,
      });
    }
  }

  // Subnivel dentro de "categorias": categoría abierta dentro del grid
  if (sectionId === 'categorias') {
    const grid = document.getElementById('categoriesGrid');
    const ci = grid && typeof grid._catView === 'number' ? grid._catView : null;
    if (ci !== null && categorias[ci]) {
      crumbs.push({
        key: 'cat-open-' + ci,
        label: categorias[ci].titulo,
        action: null, // último nivel
      });
    }
  }

  // Subnivel dentro de "subcategorias": categoría padre + subcategoría actual
  if (sectionId === 'subcategorias') {
    const titulo = document.getElementById('titulo-subcategoria');
    const subName = titulo ? titulo.textContent.trim() : '';
    let catPadre = '';
    if (subName) {
      const T = subName.toUpperCase();
      for (const c of categorias) {
        if (c.subcategorias.some(s => s.subtitulo.toUpperCase() === T)) {
          catPadre = c.titulo;
          break;
        }
      }
    }
    if (catPadre) {
      crumbs.push({ key: 'cat-' + catPadre, label: catPadre, action: 'open-cat:' + catPadre });
    }
    if (subName) {
      crumbs.push({ key: 'sub-' + subName, label: subName, action: null });
    }
  }

  // Sección "productos": país / categoría / subcategoría / item / marca
  if (sectionId === 'productos') {
    if (activeFilters.country) {
      const c = countries.find(x => x.id === activeFilters.country);
      if (c) crumbs.push({ key: 'c-' + c.id, label: `${c.flag} ${c.name}`, action: null });
    }
    if (activeFilters.category) {
      crumbs.push({
        key: 'cat-' + activeFilters.category,
        label: activeFilters.category,
        action: 'open-cat:' + activeFilters.category,
      });
    }
    if (activeFilters.subcategory) {
      crumbs.push({
        key: 'sub-' + activeFilters.subcategory,
        label: activeFilters.subcategory,
        action: 'open-sub:' + activeFilters.subcategory,
      });
    }
    if (activeFilters.search) {
      crumbs.push({
        key: 'item-' + activeFilters.search,
        label: activeFilters.search,
        action: null,
      });
    }
    if (activeFilters.brand) {
      const b = brands.find(x => x.id === activeFilters.brand);
      if (b) crumbs.push({ key: 'b-' + b.id, label: b.name, action: null });
    }
  }

  list.innerHTML = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    if (!c.action || isLast) {
      return `<li><span>${escapeHtml(c.label)}</span></li>`;
    }
    return `<li><a href="#" data-bc-action="${escapeHtml(c.action)}">${escapeHtml(c.label)}</a></li>`;
  }).join('');

  const cont = document.getElementById('sectionSwitcher');
  if (cont) cont.querySelectorAll('button[data-section]').forEach(b =>
    b.classList.toggle('active', b.dataset.section === (sectionId || 'inicio'))
  );
}
function initBreadcrumbNav() {
  const list = document.getElementById('sectionBreadcrumbList');
  if (!list) return;
  list.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-bc-action], a[data-section]');
    if (!a) return;
    e.preventDefault();

    // Compatibilidad con el formato viejo data-section
    if (a.dataset.section) {
      showSection(a.dataset.section);
      return;
    }

    const action = a.dataset.bcAction || '';
    const [kind, ...rest] = action.split(':');
    const value = rest.join(':');

    if (kind === 'section') {
      // Si vamos a "categorias" desde el breadcrumb, reseteamos la vista
      // para mostrar TODAS las categorías y no la última abierta.
      if (value === 'categorias') {
        const grid = document.getElementById('categoriesGrid');
        if (grid) grid._catView = null;
        showSection('categorias');
        if (typeof renderCategories === 'function') renderCategories();
        if (typeof updateSectionBreadcrumb === 'function') updateSectionBreadcrumb('categorias');
        return;
      }
      showSection(value);
      return;
    }

    if (kind === 'open-cat') {
      // Abrir la sección categorías y desplegar la categoría indicada
      const idx = categorias.findIndex(c => c.titulo === value);
      const grid = document.getElementById('categoriesGrid');
      if (idx >= 0 && grid) grid._catView = idx;
      showSection('categorias');
      // Forzar re-render con la categoría abierta
      renderCategories();
      updateSectionBreadcrumb('categorias');
      return;
    }

    if (kind === 'open-sub') {
      showSubcategoria(value);
      return;
    }
  });
}

/* ---------- Stats ---------- */
function animateCountValue(element, target, suffix = '') {
  if (!element) return;
  const from = Math.max(parseInt(String(element.textContent).replace(/\D/g, ''), 10) || 0, 0);
  const duration = 900, start = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    element.textContent = `${Math.round(from + (target - from) * ease(p))}${suffix}`;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function initStats() {
  let countryC = 0, categoryC = 0, brandC = 0;
  for (const c of countries) if (countryCountCache[c.id]) countryC++;
  for (const c of categorias) if (categoryCache[c.titulo]) categoryC++;
  for (const b of brands) if (brandCountCache[b.id]) brandC++;
  animateCountValue(document.getElementById('totalProducts'), allProducts.length);
  animateCountValue(document.getElementById('totalBrands'), brandC);
  animateCountValue(document.getElementById('totalCategories'), categoryC);
  animateCountValue(document.getElementById('totalCountries'), countryC);
  animateCountValue(document.getElementById('countryCount'), countryC, ' paises');
  animateCountValue(document.getElementById('categoryCount'), categoryC, ' categorias');
  animateCountValue(document.getElementById('brandCount'), brandC, ' marcas');
  animateCountValue(document.getElementById('productCount'), allProducts.length, ' productos');
}

function initBrowseCards() {
  document.querySelectorAll('.browse-card').forEach(card => {
    card.addEventListener('click', () => showSection(card.dataset.target));
  });
}

/* ---------- Render Países ---------- */
function renderCountries() {
  const grid = document.getElementById('countriesGrid');
  if (!grid) return;
  const brandsByCountry = {};
  for (const b of brands) { if (!b.country) continue; (brandsByCountry[b.country] ||= []).push(b.name); }
  const parts = [];
  for (const country of countries) {
    const pc = countryCountCache[country.id] || 0;
    if (!pc) continue;
    const bs = brandsByCountry[country.id] || [];
    const txt = bs.length ? bs.slice(0,5).join(', ') : 'Sin marcas disponibles';
    parts.push(
      `<div class="country-card" data-country="${country.id}"><span class="country-flag">${country.flag}</span>` +
      `<div class="country-info"><div class="country-name">${escapeHtml(country.name)}</div>` +
      `<div class="country-brands">${bs.length} marcas · ${pc} productos</div>` +
      `<div class="country-brand-list">${escapeHtml(txt)}${bs.length>5?'...':''}</div></div></div>`
    );
  }
  grid.innerHTML = parts.join('');
  if (!grid.dataset.delegated) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.country-card');
      if (!card) return;
      const id = card.dataset.country;
      const country = countries.find(c => c.id === id);
      activeFilters.country = id;
      applyFilters(); showSection('productos');
      const t = document.getElementById('productsTitle');
      if (t && country) t.textContent = `Productos de ${country.name} ${country.flag}`;
    });
    grid.dataset.delegated = '1';
  }
}

/* ---------- Render Categorias (DISENO PREMIUM 2026) ---------- */
/* Iconos por categoria - keys en ESPANOL coincidiendo con array `categorias` */
const _CATEGORY_ICONS = {
  'DETECCION - MEDICION': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><circle cx="12" cy="12" r="3"/></svg>`,
  'METROLOGÍA - LABORATORIO': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v5l4 10a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-10V3z"/><path d="M9 8h6"/></svg>`,
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="9" width="16" height="11" rx="2"/><circle cx="12" cy="4" r="2"/><path d="M12 6v3"/><circle cx="9" cy="14" r="1.2"/><circle cx="15" cy="14" r="1.2"/><path d="M9 18h6"/></svg>`,
  'ELECTRICIDAD - ELECTRÓNICA': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 10-12h-7l1-8z"/></svg>`,
  'TRANSMISION DE POTENCIA - COMPONENTES MECÁNICOS': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M4.2 4.2l2.1 2.1"/><path d="M17.7 17.7l2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="M4.2 19.8l2.1-2.1"/><path d="M17.7 6.3l2.1-2.1"/></svg>`,
  'HIDRAULICA - NEUMATICA': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18"/><path d="M3 17h18"/><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M12 7v10"/></svg>`,
  'MATERIALES - HERRAMIENTAS - COMPONENTES': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  'MÁQUINAS HERRAMIENTA': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="10" rx="1"/><path d="M7 8V5h10v3"/><path d="M7 18v3"/><path d="M17 18v3"/></svg>`,
  'MÁQUINAS DE PRODUCCIÓN': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V10l6 4V10l6 4V8l6 4v9z"/></svg>`,
  'MÁQUINAS INDUSTRIALES Y EQUIPOS': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="1"/><path d="M7 11V7h10v4"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>`,
  'INDUSTRIA ALIMENTARIA': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11h16l-1.5 9a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5L4 11z"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
  'LOGISTICA - TRANSPORTE - MANIPULACION': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="7" width="14" height="10" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="19" r="1.8"/><circle cx="18" cy="19" r="1.8"/></svg>`,
  'SALUD - SEGURIDAD - MEDIO AMBIENTE': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>`,
  'EDIFICACION - CONTRUCCION': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V9l7-6 7 6v12"/><rect x="9" y="13" width="6" height="8"/></svg>`,
  'EQUIPO PARA GRANDES AGRICULTORES': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M4 10h10l3 4"/><path d="M7 10V6h7l2 4"/></svg>`,
  'SERVICIOS': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`
};
const _DEFAULT_CAT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;

/* Imagenes por categoria.
   Coloca tus archivos en la carpeta /images/ (en la raiz del sitio).
   Para mayor robustez, definimos varias rutas candidatas; se intentaran en orden
   (relativa, absoluta y ../images/) por si la pagina se sirve desde subcarpeta. */
function _imgCandidates(filename) {
  return [
    '/images/' + filename
  ];
}
const _CATEGORY_IMAGES = {
  'DETECCION - MEDICION': _imgCandidates('DETECCION-MEDICION.png'),
  'METROLOGÍA - LABORATORIO': _imgCandidates('Metrologia-laboratorio.png'),
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL': _imgCandidates('robotica-automatizacion.jpeg'),
  'ELECTRICIDAD - ELECTRÓNICA': _imgCandidates('electricidad-electronica.jpeg'),
  'TRANSMISION DE POTENCIA - COMPONENTES MECÁNICOS': _imgCandidates('transmision-potencia.jpeg'),
  'HIDRAULICA - NEUMATICA': _imgCandidates('hidraulica-neumatica.png'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES': _imgCandidates('materiales-herramientas.png'),
  'MÁQUINAS HERRAMIENTA': _imgCandidates('maquinas-herramienta.png'),
  'MÁQUINAS DE PRODUCCIÓN': _imgCandidates('maquinas-produccion.png'),
  'MÁQUINAS INDUSTRIALES Y EQUIPOS': _imgCandidates('maquinas-industriales.png'),
  'INDUSTRIA ALIMENTARIA': _imgCandidates('industria-alimentaria.png'),
  'LOGISTICA - TRANSPORTE - MANIPULACION': _imgCandidates('logistica-transporte.png'),
  'SALUD - SEGURIDAD - MEDIO AMBIENTE': _imgCandidates('salud-seguridad.png'),
  'EDIFICACION - CONTRUCCION': _imgCandidates('edificacion-construccion.png'),
  'EQUIPO PARA GRANDES AGRICULTORES': _imgCandidates('equipo-agricultores.png'),
  'SERVICIOS': _imgCandidates('servicios.png')
};

/* Descripciones por categoria */
const _CATEGORY_DESCRIPTIONS = {
  'DETECCION - MEDICION': 'Sensores, transmisores, medidores de caudal, presion, nivel, temperatura, humedad, posicion, velocidad y medicion electrica para automatizacion industrial.',
  'METROLOGÍA - LABORATORIO': 'Equipos de laboratorio, analisis fisicoquimico, metrologia, ensayos, monitoreo, inspeccion y componentes opticos de alta precision.',
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL': 'Automatismos, robotica industrial y de servicio, informatica industrial y software para Industria 4.0.',
  'ELECTRICIDAD - ELECTRÓNICA': 'Produccion y distribucion de energia, alimentacion electrica, interruptores, reles, cables, conectores y componentes electronicos.',
  'TRANSMISION DE POTENCIA - COMPONENTES MECÁNICOS': 'Rodamientos, guias lineales, transmision mecanica, actuadores y sistemas de posicionamiento industrial.',
  'HIDRAULICA - NEUMATICA': 'Bombas, compresores, actuadores hidraulicos y neumaticos, valvulas, electrovalvulas, tuberias, racores y filtros.',
  'MATERIALES - HERRAMIENTAS - COMPONENTES': 'Productos semimanufacturados, herramientas de corte, sujecion, montaje, componentes estandar y accesorios industriales.',
  'MÁQUINAS HERRAMIENTA': 'Tornos, fresadoras, rectificadoras y centros de mecanizado de alta precision para la industria metal-mecanica.',
  'MÁQUINAS DE PRODUCCIÓN': 'Lineas de produccion, ensamble, envasado y maquinaria de manufactura.',
  'MÁQUINAS INDUSTRIALES Y EQUIPOS': 'Equipamiento industrial pesado y maquinaria de uso general para procesos productivos.',
  'INDUSTRIA ALIMENTARIA': 'Equipos para procesamiento, envasado y control de calidad en la industria de alimentos y bebidas.',
  'LOGISTICA - TRANSPORTE - MANIPULACION': 'Sistemas de transporte interno, montacargas, transportadores, almacenaje y manipulacion de cargas.',
  'SALUD - SEGURIDAD - MEDIO AMBIENTE': 'EPP, equipos de seguridad industrial, monitoreo ambiental y soluciones para salud ocupacional.',
  'EDIFICACION - CONTRUCCION': 'Materiales, equipos y herramientas para construccion, edificacion y obra civil.',
  'EQUIPO PARA GRANDES AGRICULTORES': 'Maquinaria agricola, tractores, implementos y soluciones para agricultura industrial.',
  'SERVICIOS': 'Servicios de calibracion, mantenimiento, asesoria tecnica e ingenieria industrial.'
};

/* Imagenes especificas por subcategoria. Key: "categoria||subcategoria".
   Si no hay entrada aqui, se usa automaticamente la imagen de la categoria padre. */
const _SUBCATEGORY_IMAGES = {
  'DETECCION - MEDICION||Medición de Caudal, Presión y Nivel': _imgCandidates('Medicion_de_cudal,presion-y-nivel.jpeg'),
  'DETECCION - MEDICION||Medición de la Temperatura y Humedad': _imgCandidates('Medicion_de_temperatura-y-humedad.jpeg'),
  'DETECCION - MEDICION||Medición de Posición, Velocidad y Aceleración': _imgCandidates('Medicion_de_posicion,velocidad-y-aceleracion.jpeg'),
  'DETECCION - MEDICION||Medición de Fuerza': _imgCandidates('Sensores_de_deteccion-y-proximidad.jpeg'),
  'DETECCION - MEDICION||Medición Acústica y Optica': _imgCandidates('Sensores_de_vision_y_opticos.jpeg'),
  'DETECCION - MEDICION||Medición Eléctrica': _imgCandidates('Medicion_electrica.jpeg'),
  'METROLOGÍA - LABORATORIO||Equipo de Laboratorio': _imgCandidates('Equipo_De_laboratorio.png'),
  'METROLOGÍA - LABORATORIO||Análisis Fisicoquímico': _imgCandidates('Analisis_Fisicoquimico.jpeg'),
  'METROLOGÍA - LABORATORIO||Metrologia y Ensayos': _imgCandidates('Matrologia_y_Ensayos.png'),
  'METROLOGÍA - LABORATORIO||Componentes Opticos': _imgCandidates('componentes_opticos.png'),
  'METROLOGÍA - LABORATORIO||Monitoreo e Inspección': _imgCandidates('Monitoreo_e_inspeccion.png'),
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL||Automatismos': _imgCandidates('automatizacion.png'),
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL||Robótica Industrial': _imgCandidates('Roboticos_industriales.png'),
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL||Robótica de Servicio': _imgCandidates('Robots_servicios.png'),
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL||Informática industrial': _imgCandidates('industrial_computing.png'),
  'ROBÓTICA - AUTOMATIZACIÓN - INFORMÁTICA INDUSTRIAL||Software industrial': _imgCandidates('intrudstrial_software.png'),
  'ELECTRICIDAD - ELECTRÓNICA||Producción y Distribución de Energía': _imgCandidates('Producción_y_Distribución_de_Energía.png'),
  'ELECTRICIDAD - ELECTRÓNICA||Alimentación Eléctrica': _imgCandidates('Alimentación_Eléctrica.png'),
  'ELECTRICIDAD - ELECTRÓNICA||Interruptores y Relés': _imgCandidates('Interruptores_y_Relés.png'),
  'ELECTRICIDAD - ELECTRÓNICA||Cables, Conectores y Cajas': _imgCandidates('Cables_Conectores_y_Cajas.png'),
  'ELECTRICIDAD - ELECTRÓNICA||Componentes Electrónicos': _imgCandidates('Componentes_Electrónicos.jpeg'),
  'TRANSMISION DE POTENCIA - COMPONENTES MECÁNICOS||Rodamientos, Guías Lineales': _imgCandidates('Rodamientos_Guías_Lineales.jpeg'),
  'TRANSMISION DE POTENCIA - COMPONENTES MECÁNICOS||Transmisión Mecánica': _imgCandidates('Transmisión_Mecánica.jpeg'),
  'TRANSMISION DE POTENCIA - COMPONENTES MECÁNICOS||Actuadores y Posicionamiento': _imgCandidates('Actuadores_y_posicionamiento.jpeg'),
  'SERVICIOS||CERTIFICACIONES': _imgCandidates('CERTIFICACIONES.jpeg'),
  'SERVICIOS||TRABAJO TÉCNICO/MANO DE OBRA': _imgCandidates('TRABAJO TÉCNICO/MANO_DE_OBRA.jpeg'),
  'SERVICIOS||LOGÍSTICA': _imgCandidates('LOGISTICA.jpeg'),
  'EQUIPO PARA GRANDES AGRICULTORES||Herramientas agrícolas pequeñas': _imgCandidates('Herramientas_agrícolas_pequeñas.jpeg'),
  'EQUIPO PARA GRANDES AGRICULTORES||Conservación de las vías de circulación y de las zonas verdes': _imgCandidates('Conservación_verde.jpeg'),
  'EDIFICACION - CONTRUCCION||Acondicionamiento de Edificios Industriales': _imgCandidates('Acondicionamiento_de_Edificios_Industriales.jpeg'),
  'EDIFICACION - CONTRUCCION||Maquinarias y Equipos de Minas y Obras': _imgCandidates('Maquinarias_Obras.jpeg'),
  'EDIFICACION - CONTRUCCION||Herramientas para obra': _imgCandidates('Herramientas_obra.jpeg'),
  'EDIFICACION - CONTRUCCION||Producción de materiales de construcción': _imgCandidates('Producción_construcción.jpeg'),
  'SALUD - SEGURIDAD - MEDIO AMBIENTE||Tratamiento del Aire y Gestión del Ruido': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_0.jpeg'),
  'SALUD - SEGURIDAD - MEDIO AMBIENTE||Tratamiento del Agua': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_4.jpeg'),
  'SALUD - SEGURIDAD - MEDIO AMBIENTE||Tratamiento de Residuos': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_3.jpeg'),
  'SALUD - SEGURIDAD - MEDIO AMBIENTE||Equipos de Protección Individual': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_2.jpeg'),
  'SALUD - SEGURIDAD - MEDIO AMBIENTE||Seguridad para Máquinas y en Locales': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_1.jpeg'),
  'SALUD - SEGURIDAD - MEDIO AMBIENTE||Higiene y Limpieza': _imgCandidates('Higiene_Limpieza.jpeg'),
  'LOGISTICA - TRANSPORTE - MANIPULACION||Manutención y Elevación': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_0.jpeg'),
  'LOGISTICA - TRANSPORTE - MANIPULACION||Acondicionamiento y Embalaje': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_1.jpeg'),
  'LOGISTICA - TRANSPORTE - MANIPULACION||Transporte Ferroviario': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_3.jpeg'),
  'LOGISTICA - TRANSPORTE - MANIPULACION||Almacenamiento': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_4.jpeg'),
  'LOGISTICA - TRANSPORTE - MANIPULACION||Transportadores': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_2.jpeg'),
  'INDUSTRIA ALIMENTARIA||Procesamiento de la carne': _imgCandidates('INDUSTRIAALIMENTARIA_5.jpeg'),
  'INDUSTRIA ALIMENTARIA||Procesamiento del pescado': _imgCandidates('INDUSTRIAALIMENTARIA_4.jpeg'),
  'INDUSTRIA ALIMENTARIA||Procesamiento de frutas y hortalizas': _imgCandidates('INDUSTRIAALIMENTARIA_1.jpeg'),
  'INDUSTRIA ALIMENTARIA||Transformación de la leche': _imgCandidates('INDUSTRIAALIMENTARIA_3.jpeg'),
  'INDUSTRIA ALIMENTARIA||Panaderías-pastelerías': _imgCandidates('INDUSTRIAALIMENTARIA_0.jpeg'),
  'INDUSTRIA ALIMENTARIA||Transformación de cereales y producción de pasta': _imgCandidates('INDUSTRIAALIMENTARIA_2.jpeg'),
  'INDUSTRIA ALIMENTARIA||Otras Máquinas para la Industria Agroalimentaria': _imgCandidates('INDUSTRIAALIMENTARIA_5.jpeg'),
  'MÁQUINAS INDUSTRIALES Y EQUIPOS||Equipos para el tratamiento de superficies': _imgCandidates('MAQUINASINDUSTRIALES_0.jpeg'),
  'MÁQUINAS INDUSTRIALES Y EQUIPOS||Tratamiento de Superficies': _imgCandidates('MAQUINASINDUSTRIALES_1.jpeg'),
  'MÁQUINAS INDUSTRIALES Y EQUIPOS||Hornos y Tratamiento Térmico': _imgCandidates('MAQUINASINDUSTRIALES_4.jpeg'),
  'MÁQUINAS INDUSTRIALES Y EQUIPOS||Impresion, Marcado y Grabado': _imgCandidates('MAQUINASINDUSTRIALES_3.jpeg'),
  'MÁQUINAS INDUSTRIALES Y EQUIPOS||Soldadura, Atornillamiento y Pegado': _imgCandidates('MAQUINASINDUSTRIALES_5.jpeg'),
  'MÁQUINAS INDUSTRIALES Y EQUIPOS||Mezclado y Dosificación': _imgCandidates('MAQUINASINDUSTRIALES_6.jpeg'),
  'HIDRAULICA - NEUMATICA||Bombas': _imgCandidates('HIDRAULICANEUMATICA_0.jpeg'),
  'HIDRAULICA - NEUMATICA||Compresores': _imgCandidates('HIDRAULICANEUMATICA_1.jpeg'),
  'HIDRAULICA - NEUMATICA||Actuadores Hidráulicos y Neumáticos': _imgCandidates('HIDRAULICANEUMATICA_0.jpeg'),
  'HIDRAULICA - NEUMATICA||Válvulas y Electroválvulas': _imgCandidates('HIDRAULICANEUMATICA_4.jpeg'),
  'HIDRAULICA - NEUMATICA||Tuberías, Racores': _imgCandidates('HIDRAULICANEUMATICA_2.jpeg'),
  'HIDRAULICA - NEUMATICA||Filtros y Separadores': _imgCandidates('HIDRAULICANEUMATICA_3.jpeg'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES||Productos químicos industriales': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_6.jpeg'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES||Productos Semimanufacturados': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_1.jpeg'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES||Lubricación': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_3.jpeg'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES||Otros equipamientos de carrocería': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_0.jpeg'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES||Elementos Estándares Mecánicos': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_5.jpeg'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES||Equipos de mantenimiento de vehículos': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_4.jpeg'),
  'MATERIALES - HERRAMIENTAS - COMPONENTES||Herramientas manuales, herramientas eléctricas ( Utillaje )': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_2.jpeg'),
  'MÁQUINAS HERRAMIENTA||Máquinas de Mecanizado': _imgCandidates('MÁQUINASHERRAMIENTA_0.jpeg'),
  'MÁQUINAS HERRAMIENTA||Máquinas de Acabado': _imgCandidates('MÁQUINASHERRAMIENTA_3.jpeg'),
  'MÁQUINAS HERRAMIENTA||Herramientas de Corte': _imgCandidates('MÁQUINASHERRAMIENTA_1.jpeg'),
  'MÁQUINAS HERRAMIENTA||Equipos para Máquinas Herramientas': _imgCandidates('MÁQUINASHERRAMIENTA_2.jpeg'),
  
  
  






  
  // Agrega aqui mas mapeos especificos, por ejemplo:
  // 'CATEGORIA||Subcategoria': _imgCandidates('archivo.png'),
};

/* Devuelve la lista de rutas candidatas (array) para una subcategoria,
   con fallback a la imagen de la categoria padre. */
function _subcategoryImageCandidates(catTitulo, subTitulo) {
  const key = catTitulo + '||' + subTitulo;
  const direct = _SUBCATEGORY_IMAGES[key];
  if (direct) return Array.isArray(direct) ? direct : [direct];
  const parent = _CATEGORY_IMAGES[catTitulo];
  if (parent) return Array.isArray(parent) ? parent : [parent];
  return [];
}

/* Iconos para subcategorias por palabra clave */
const _SUBCATEGORY_ICON_KEYWORDS = [
  { kw: ['caudal','presion','presión','nivel'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>` },
  { kw: ['temperatura','humedad','termo','calor'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V4a2 2 0 0 0-4 0v10.76a4 4 0 1 0 4 0z"/></svg>` },
  { kw: ['posicion','posición','velocidad','aceleracion','aceleración'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-4"/><circle cx="12" cy="12" r="1.5"/></svg>` },
  { kw: ['sensor','deteccion','detección'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M7.76 16.24a6 6 0 0 1 0-8.49"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>` },
  { kw: ['vision','visión','optica','óptica','imagen','camara','cámara'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>` },
  { kw: ['electric','electron','energia','energía'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 10-12h-7l1-8z"/></svg>` },
  { kw: ['robot','automat'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="9" width="16" height="11" rx="2"/><circle cx="12" cy="4" r="2"/><path d="M12 6v3"/></svg>` },
  { kw: ['herramienta','tool'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3 18 3l3 3-3.3 3.3M14.7 6.3 3 18l3 3 11.7-11.7"/></svg>` },
  { kw: ['valvula','válvula','bomba','compresor','neumat','hidraul'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 2v5"/><path d="M12 17v5"/><path d="M2 12h5"/><path d="M17 12h5"/></svg>` }
];
const _SUBCATEGORY_DEFAULT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;

function _iconForSubcategory(subtitulo) {
  const t = (subtitulo || '').toLowerCase();
  for (const entry of _SUBCATEGORY_ICON_KEYWORDS) {
    if (entry.kw.some(k => t.includes(k))) return entry.svg;
  }
  return _SUBCATEGORY_DEFAULT_ICON;
}

/* SVG inline para fallback cuando una imagen falla a cargar */
const _IMAGE_FALLBACK_DATAURI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#0a2540"/>
        <stop offset="1" stop-color="#1d4ed8"/>
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#g)"/>
    <g fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5">
      <circle cx="200" cy="120" r="55"/>
      <circle cx="200" cy="120" r="80"/>
    </g>
    <g fill="none" stroke="rgba(255,255,255,0.78)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M120 150h160"/>
      <path d="M150 150l28-54h44l28 54"/>
      <path d="M178 96l22-28 22 28"/>
      <path d="M162 126h76"/>
    </g>
  </svg>`
);

/* Construye un <img> con cadena de fallbacks (rutas candidatas + SVG final).
   La cadena se evalua en runtime mediante onerror leyendo data-fallbacks. */
function _imgWithFallback(candidates, altText, extraClass = '') {
  const list = (Array.isArray(candidates) ? candidates : [candidates]).filter(Boolean);
  if (!list.length) return '';
  const first = list[0];
  const rest = JSON.stringify(list.slice(1));
  return `<img${extraClass ? ` class="${extraClass}"` : ''} src="${escapeHtml(first)}" alt="${escapeHtml(altText)}" loading="lazy" decoding="async" data-fallbacks='${rest.replace(/'/g, "&#39;")}' onerror="(function(img){try{var f=JSON.parse(img.getAttribute('data-fallbacks')||'[]');if(f.length){img.src=f.shift();img.setAttribute('data-fallbacks',JSON.stringify(f));}else{img.onerror=null;img.src='${_IMAGE_FALLBACK_DATAURI}';}}catch(e){img.onerror=null;img.src='${_IMAGE_FALLBACK_DATAURI}';}})(this)">`;
}

/* Devuelve la primera ruta candidata (string) para usar en CSS / atributos sencillos. */
function _firstCandidate(candidates) {
  if (!candidates) return '';
  if (Array.isArray(candidates)) return candidates[0] || '';
  return candidates;
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  // Estado: null => mostrar grilla de categorias; numero => mostrar subcategorias de esa categoria
  if (typeof grid._catView === 'undefined') grid._catView = null;

  function renderCategoryGrid() {
    grid.classList.remove('subcategory-view');
    grid.classList.add('category-grid-view');
    const html = categorias.map((categoria, catIndex) => {
      const productCount = getCategoryCount(categoria.titulo);
      const catImageCandidates = _CATEGORY_IMAGES[categoria.titulo] || [];
      const catIcon = (typeof _CATEGORY_ICONS !== 'undefined' && _CATEGORY_ICONS[categoria.titulo]) || (typeof _DEFAULT_CAT_ICON !== 'undefined' ? _DEFAULT_CAT_ICON : '');
      const catDesc = (typeof _CATEGORY_DESCRIPTIONS !== 'undefined' && _CATEGORY_DESCRIPTIONS[categoria.titulo])
        || `Explora ${categoria.subcategorias.length} subcategorias y encuentra los productos que necesitas.`;
      const firstItem = categoria.subcategorias[0]?.items?.[0] || '';
      const code = (firstItem.match(/\b([A-Z])\d{3}\b/) || [,'•'])[1];
      const mediaInner = catImageCandidates.length
        ? _imgWithFallback(catImageCandidates, categoria.titulo)
        : `<div class="category-card-media-icon">${catIcon}</div>`;
      return `<article class="category-card" data-cat-index="${catIndex}">
        <button class="category-card-main" type="button" data-category-open="${catIndex}" aria-label="Abrir subcategorías de ${escapeHtml(categoria.titulo)}">
          <div class="category-card-media">
            ${mediaInner}
            <span class="category-code">${escapeHtml(code)}</span>
            <span class="category-media-label">Taxonomía industrial · ${String(catIndex + 1).padStart(2, '0')}</span>
          </div>
          <div class="category-card-copy">
            <h3>${escapeHtml(categoria.titulo)}</h3>
            <p class="category-card-description">${escapeHtml(catDesc)}</p>
            <p>${categoria.subcategorias.length} subcategorías · ${productCount} productos</p>
            <span>Explorar categoría →</span>
          </div>
        </button>
      </article>`;
    }).join('');
    grid.innerHTML = html;
    grid._catView = null;
    updateSectionBreadcrumb('categorias');
  }

  function renderSubcategoriesFor(catIndex) {
    const categoria = categorias[catIndex];
    if (!categoria) return;
    grid.classList.remove('category-grid-view');
    grid.classList.add('subcategory-view');
    const productCount = getCategoryCount(categoria.titulo);
    const catImageCandidates = _CATEGORY_IMAGES[categoria.titulo] || [];
    const catIcon = (typeof _CATEGORY_ICONS !== 'undefined' && _CATEGORY_ICONS[categoria.titulo]) || (typeof _DEFAULT_CAT_ICON !== 'undefined' ? _DEFAULT_CAT_ICON : '');
    const heroMedia = catImageCandidates.length
      ? _imgWithFallback(catImageCandidates, categoria.titulo, 'category-subnav-hero-img')
      : `<div class="category-subnav-hero-icon">${catIcon}</div>`;
    const cards = categoria.subcategorias.map((sub, subIndex) => {
      const subCount = getSubcategoryCount(categoria.titulo, sub.subtitulo);
      const subImgCandidates = _subcategoryImageCandidates(categoria.titulo, sub.subtitulo);
      const subIcon = _iconForSubcategory(sub.subtitulo);
      const media = subImgCandidates.length
        ? _imgWithFallback(subImgCandidates, sub.subtitulo)
        : `<div class="category-card-media-icon">${subIcon}</div>`;
      return `<article class="category-card subcategory-mode" data-cat-index="${catIndex}" data-sub-index="${subIndex}">
        <button class="category-card-main" type="button" data-subcategory-open="${subIndex}" aria-label="Abrir ${escapeHtml(sub.subtitulo)}">
          <div class="category-card-media">
            ${media}
            <span class="category-media-label">${subCount} productos${sub.items ? ' · ' + sub.items.length + ' ítems' : ''}</span>
          </div>
          <div class="category-card-copy">
            <h3>${escapeHtml(sub.subtitulo)}</h3>
            <p class="category-card-description">${escapeHtml(categoria.titulo)}</p>
            <span>Ver ítems →</span>
          </div>
        </button>
      </article>`;
    }).join('');
    grid.innerHTML = `
      <div class="category-subnav">
        <div class="category-subnav-hero" aria-hidden="true">${heroMedia}</div>
        <div class="category-subnav-row">
          <button type="button" class="category-back-to-all" data-back-to-all>← Volver a categorías</button>
          <div class="category-subnav-info">
            <span class="category-subnav-eyebrow">Categoría</span>
            <h3 class="category-subnav-title">${escapeHtml(categoria.titulo)}</h3>
            <span class="category-subnav-meta">${categoria.subcategorias.length} subcategorías · ${productCount} productos</span>
          </div>
          <button type="button" class="category-view-all-btn" data-cat-index="${catIndex}" data-view-all>
            Ver todos los productos
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div class="categories-accordion category-grid-view">${cards}</div>
    `;
    grid._catView = catIndex;
    updateSectionBreadcrumb('categorias');
  }

  if (grid._catView === null) renderCategoryGrid();
  else renderSubcategoriesFor(grid._catView);

  if (!grid.dataset.delegated) {
    grid.addEventListener('click', (e) => {
      const backToAll = e.target.closest('[data-back-to-all]');
      if (backToAll) {
        e.preventDefault();
        renderCategoryGrid();
        return;
      }
      const opener = e.target.closest('[data-category-open]');
      if (opener) {
        e.preventDefault();
        renderSubcategoriesFor(Number(opener.dataset.categoryOpen));
        return;
      }
      const back = e.target.closest('[data-category-back]');
      if (back) {
        e.preventDefault();
        renderCategoryGrid();
        return;
      }
      const subOpen = e.target.closest('[data-subcategory-open]');
      if (subOpen) {
        e.preventDefault();
        const card = subOpen.closest('[data-cat-index]');
        const ci = +card.dataset.catIndex;
        const si = +subOpen.dataset.subcategoryOpen;
        const cat = categorias[ci];
        const sub = cat && cat.subcategorias[si];
        if (cat && sub) {
          showSubcategoria(sub.subtitulo);
        }
        return;
      }
      const viewAll = e.target.closest('[data-view-all]');
      if (viewAll) {
        e.preventDefault();
        const ci = +viewAll.dataset.catIndex;
        const cat = categorias[ci];
        if (!cat) return;
        activeFilters.category = cat.titulo;
        activeFilters.subcategory = null;
        activeFilters.search = '';
        activeFilters.itemCode = null;
        currentPage = 1;
        applyFilters();
        updateProductsTitle();
        showSection('productos');
        return;
      }
    });
    grid.dataset.delegated = '1';
  }
}

/* ---------- Modal subcategoria (PREMIUM) ---------- */
function openSubcategoryModal(categoria, subcategoria) {
  closeSubcategoryModal();
  const subCount = getSubcategoryCount(categoria.titulo, subcategoria.subtitulo);
  const maxItems = 50;
  const items = (subcategoria.items || []).slice(0, maxItems);
  const totalItems = subcategoria.items ? subcategoria.items.length : 0;

  const itemsHtml = items.map(item => {
    const parts = String(item || '').split(' - ');
    const itemName = parts[0] || item;
    const itemCode = parts[1] || '';
    return `<div class="modal-item" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(subcategoria.subtitulo)}" data-item="${encodeURIComponent(item)}">` +
      `<div class="modal-item-content"><span class="modal-item-name">${escapeHtml(itemName)}</span>${itemCode ? `<span class="modal-item-code">${escapeHtml(itemCode)}</span>` : ''}</div>` +
      `<button class="modal-item-btn" type="button">Ver<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="m9 18 6-6-6-6"/></svg></button></div>`;
  }).join('');

  const more = totalItems > maxItems
    ? `<p style="text-align:center;color:#64748b;font-size:.85rem;margin-top:1rem;">${totalItems - maxItems} items mas disponibles - usa la busqueda para filtrar</p>`
    : '';

  const modalHtml = `<div class="subcategory-modal-overlay" id="subcategoryModalOverlay" role="dialog" aria-modal="true">
    <div class="subcategory-modal">
      <div class="subcategory-modal-header">
        <div class="subcategory-modal-title-area">
          <span class="subcategory-modal-category">${escapeHtml(categoria.titulo)}</span>
          <h2 class="subcategory-modal-title">${escapeHtml(subcategoria.subtitulo)}</h2>
          <span class="subcategory-modal-count">${subCount} productos disponibles</span>
        </div>
        <button class="subcategory-modal-close" type="button" aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="subcategory-modal-body">
        <p class="subcategory-modal-subtitle">Selecciona un item para ver sus productos:</p>
        <div class="subcategory-modal-items">${itemsHtml}</div>
        ${more}
        <button class="subcategory-modal-view-all" type="button" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(subcategoria.subtitulo)}">
          Ver todos los productos de ${escapeHtml(subcategoria.subtitulo)}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.body.style.overflow = 'hidden';
  const modal = document.getElementById('subcategoryModalOverlay');
  requestAnimationFrame(() => modal.classList.add('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) return closeSubcategoryModal();
    if (e.target.closest('.subcategory-modal-close')) return closeSubcategoryModal();
    const viewAll = e.target.closest('.subcategory-modal-view-all');
    if (viewAll) {
      closeSubcategoryModal();
      activeFilters.category = viewAll.dataset.category;
      activeFilters.subcategory = viewAll.dataset.subcategory;
      activeFilters.search = ''; activeFilters.itemCode = null; currentPage = 1;
      applyFilters(); updateProductsTitle(); showSection('productos');
      return;
    }
    const item = e.target.closest('.modal-item');
    if (item) {
      const itemRaw = decodeURIComponent(item.dataset.item || '');
      const parts = itemRaw.split(' - ');
      closeSubcategoryModal();
      activeFilters.category = item.dataset.category;
      activeFilters.subcategory = item.dataset.subcategory;
      activeFilters.search = parts[0] || itemRaw;
      activeFilters.itemCode = parts[1] || '';
      currentPage = 1;
      applyFilters(); updateProductsTitle(); showSection('productos');
    }
  });
  document.addEventListener('keydown', handleModalEscape);
}
function handleModalEscape(e) { if (e.key === 'Escape') closeSubcategoryModal(); }
function closeSubcategoryModal() {
  const modal = document.getElementById('subcategoryModalOverlay');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleModalEscape);
  setTimeout(() => modal.remove(), 220);
}




/* ---------- Navbar categorías (delegación + diferido) ---------- */
function renderNavbarCategories() {
  const categoryList = document.getElementById('categoryList');
  if (!categoryList) return;
  const parts = [];
  for (const categoria of categorias) {
    const subs = [];
    for (const sub of categoria.subcategorias) {
      const items = [];
      for (const item of (sub.items || [])) {
        const nombreVisible = item.split(' - ')[0].trim();
        items.push(`<li class="item-entry"><button class="nav-item-btn" type="button" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(sub.subtitulo)}" data-item="${encodeURIComponent(item)}">${escapeHtml(nombreVisible)}</button></li>`);
      }
      subs.push(`<li class="subcategory-wrapper"><button class="nav-subcategory-btn" type="button" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(sub.subtitulo)}">${escapeHtml(sub.subtitulo)}</button>${items.length ? `<ul class="items-list">${items.join('')}</ul>` : ''}</li>`);
    }
    parts.push(`<li class="category-item"><span>${escapeHtml(categoria.titulo)}</span><ul class="subcategory-list">${subs.join('')}</ul></li>`);
  }
  categoryList.innerHTML = parts.join('');

  if (!categoryList.dataset.delegated) {
    categoryList.addEventListener('click', (e) => {
      const itemBtn = e.target.closest('.nav-item-btn');
      if (itemBtn) {
        e.stopPropagation();
        const itemRaw = decodeURIComponent(itemBtn.dataset.item);
        const nombreVisible = itemRaw.split(' - ')[0].trim();
        showProductsForSubcategory(itemBtn.dataset.subcategory, itemBtn.dataset.category, nombreVisible);
        activeFilters.category = itemBtn.dataset.category;
        activeFilters.subcategory = itemBtn.dataset.subcategory;
        applyFilters();
        return;
      }
      const subBtn = e.target.closest('.nav-subcategory-btn');
      if (subBtn) {
        e.stopPropagation();
        showSubcategoria(subBtn.dataset.subcategory);
        activeFilters.category = subBtn.dataset.category;
        activeFilters.subcategory = subBtn.dataset.subcategory;
        applyFilters(); updateProductsTitle();
      }
    });
    categoryList.dataset.delegated = '1';
  }
}

/* ---------- Marcas ---------- */
function renderBrands() {
  const grid = document.getElementById('brandsGrid');
  const dropdown = document.getElementById('brandsDropdown');
  if (!grid) return;

  const entries = [];
  for (const brand of brands) {
    const count = brandCountByNameNorm[normalizeText(brand.name)] || brandCountCache[brand.id] || 0;
    if (count > 0) entries.push({ brand, count });
  }
  entries.sort((a, b) => a.brand.name.localeCompare(b.brand.name));

  const grouped = {};
  for (const e of entries) {
    const letter = e.brand.name.charAt(0).toUpperCase();
    const g = /[A-Z]/.test(letter) ? letter : '#';
    (grouped[g] ||= []).push(e);
  }
  const letters = Object.keys(grouped).sort((a,b) => a==='#'?1:b==='#'?-1:a.localeCompare(b));

  grid.innerHTML = letters.map(letter => {
    const brandsHtml = grouped[letter].map(({brand,count}) =>
      `<button class="brand-list-item" data-brand="${brand.id}" type="button" style="--brand-color:${brand.color||'#1d4ed8'};">` +
      `<div class="brand-list-media">${brand.logo ? `<img class="brand-list-image" src="${brand.logo}" alt="${escapeHtml(brand.name)}" loading="lazy">` : `<div class="brand-list-avatar" style="background:${brand.color||'#1d4ed8'}">${escapeHtml(brand.name.substring(0,2).toUpperCase())}</div>`}</div>` +
      `<div class="brand-list-text"><span class="brand-list-name">${escapeHtml(brand.name)}</span><span class="brand-list-count">${count} productos</span></div></button>`
    ).join('');
    return `<details class="brand-letter-group" open><summary class="brand-letter-title">${letter}</summary><div class="brand-letter-list">${brandsHtml}</div></details>`;
  }).join('');

  if (dropdown) {
    dropdown.innerHTML = letters.map(letter => {
      const links = grouped[letter].map(({brand,count}) => `<button class="brand-link" data-brand="${brand.id}" type="button">${escapeHtml(brand.name)} (${count})</button>`).join('');
      return `<details class="brand-dropdown-group" open><summary>${letter}</summary><div class="brand-dropdown-links">${links}</div></details>`;
    }).join('');
    if (!dropdown.dataset.delegated) {
      dropdown.addEventListener('click', (e) => {
        const link = e.target.closest('.brand-link');
        if (!link) return;
        e.preventDefault();
        activeFilters.brand = link.dataset.brand;
        applyFilters(); showSection('productos');
        const b = brands.find(x => x.id === activeFilters.brand);
        const t = document.getElementById('productsTitle');
        if (t && b) t.textContent = `Productos ${b.name}`;
      });
      dropdown.dataset.delegated = '1';
    }
  }

  if (!grid.dataset.delegated) {
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.brand-list-item');
      if (!item) return;
      activeFilters.brand = item.dataset.brand;
      applyFilters(); showSection('productos');
      const b = brands.find(x => x.id === activeFilters.brand);
      const t = document.getElementById('productsTitle');
      if (t && b) t.textContent = `Productos ${b.name}`;
    });
    grid.dataset.delegated = '1';
  }
}

/* ---------- Sidebar filtros ---------- */
function renderSidebarFilters() {
  if (typeof updateSidebarActiveState !== 'undefined') updateSidebarActiveState._dirty = true;
  const cc = document.getElementById('sidebarCountries');
  if (cc) {
    const parts = [];
    for (const country of countries) {
      const count = countryCountCache[country.id] || 0;
      if (!count) continue;
      parts.push(`<div class="filter-option" data-filter="country" data-value="${country.id}"><span class="filter-option-flag">${country.flag}</span><span>${escapeHtml(country.name)}</span><span class="filter-option-count">${count}</span></div>`);
    }
    cc.innerHTML = parts.join('');
  }
  const cat = document.getElementById('sidebarCategories');
  if (cat) {
    cat.innerHTML = categorias.map(c =>
      `<div class="filter-option" data-filter="category" data-value="${escapeHtml(c.titulo)}"><span></span><span>${escapeHtml(c.titulo)}</span><span class="filter-option-count">${getCategoryCount(c.titulo)}</span></div>`
    ).join('');
  }
  const bc = document.getElementById('sidebarBrands');
  if (bc) {
    bc.innerHTML = brands.map(b => {
      const count = brandCountCache[b.id] || brandCountByNameNorm[normalizeText(b.name)] || 0;
      return `<div class="filter-option" data-filter="brand" data-value="${b.id}"><span style="width:20px;height:20px;background:${b.color};border-radius:4px;display:inline-block;"></span><span>${escapeHtml(b.name)}</span><span class="filter-option-count">${count}</span></div>`;
    }).join('');
  }
  // Delegación UNA sola vez en document para .filter-option
  if (!document._filterOptionDelegated) {
    document._filterOptionDelegated = true;
    document.addEventListener('click', (e) => {
      const opt = e.target.closest('.filter-option');
      if (!opt) return;
      const filterType = opt.dataset.filter;
      const value = opt.dataset.value;
      if (!filterType) return;
      if (activeFilters[filterType] === value) {
        activeFilters[filterType] = null;
      } else {
        activeFilters[filterType] = value;
      }
      if (filterType === 'category') activeFilters.subcategory = null;
      applyFilters(); updateProductsTitle();
    });
  }
}

/* ---------- Filtros ---------- */
function applyFilters() {
  const fCountry = activeFilters.country;
  const fBrand = activeFilters.brand;
  const fCat = activeFilters.category;
  const fSub = activeFilters.subcategory;
  const searchLower = activeFilters.search ? activeFilters.search.toLowerCase().trim() : '';
  const itemCodeLower = activeFilters.itemCode ? activeFilters.itemCode.toLowerCase().trim() : '';
  const hasSearch = !!(searchLower || itemCodeLower);
  const bucketKey = (fCat && fSub) ? (fCat + '||' + fSub) : null;
  const subLower = fSub ? fSub.toLowerCase().trim() : '';

  const out = [];
  for (let i = 0; i < allProducts.length; i++) {
    const p = allProducts[i];
    if (fCountry && p.country !== fCountry) continue;
    if (fBrand && p.brand !== fBrand) continue;

    if (hasSearch) {
      const blob = p._searchBlob;
      if (searchLower && !blob.includes(searchLower)) {
        if (!itemCodeLower || !blob.includes(itemCodeLower)) continue;
      } else if (!searchLower && itemCodeLower && !blob.includes(itemCodeLower)) {
        continue;
      }
    } else {
      if (bucketKey) {
        if (!p._buckets.has(bucketKey)) continue;
      } else if (fCat) {
        if (!p._catKeys.has(fCat)) continue;
      } else if (fSub) {
        const sv = (p.subcategory || p.subcategoryName || '').toLowerCase().trim();
        if (sv !== subLower) continue;
      }
    }
    out.push(p);
  }
  filteredProducts = out;
  currentPage = 1;
  renderProducts();
  renderActiveFilters();
  updateSidebarActiveState();
}

function updateSidebarActiveState() {
  // Cache nodes once; refresh cache only after a sidebar re-render
  if (!updateSidebarActiveState._cache || updateSidebarActiveState._dirty) {
    updateSidebarActiveState._cache = document.querySelectorAll('.filter-option');
    updateSidebarActiveState._dirty = false;
  }
  const nodes = updateSidebarActiveState._cache;
  for (let i = 0; i < nodes.length; i++) {
    const opt = nodes[i];
    const t = opt.dataset.filter, v = opt.dataset.value;
    const should = activeFilters[t] === v;
    if (should !== opt.classList.contains('active')) opt.classList.toggle('active', should);
  }
}

function renderActiveFilters() {
  const container = document.getElementById('activeFilters');
  if (!container) return;
  const filters = [];
  if (activeFilters.country) { const c = countries.find(x => x.id === activeFilters.country); if (c) filters.push({ type:'country', label:`${c.flag} ${c.name}` }); }
  if (activeFilters.category) { const c = categorias.find(x => x.titulo === activeFilters.category); filters.push({ type:'category', label: c ? c.titulo : activeFilters.category }); }
  if (activeFilters.brand) { const b = brands.find(x => x.id === activeFilters.brand); if (b) filters.push({ type:'brand', label: b.name }); }
  if (activeFilters.search) filters.push({ type:'search', label:`Busqueda: "${activeFilters.search}"` });
  let html = filters.map(f => `<div class="active-filter"><span>${escapeHtml(f.label)}</span><button onclick="removeFilter('${f.type}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>`).join('');
  if (filters.length > 1) html += `<button class="clear-all-btn" onclick="clearAllFilters()">Limpiar todo</button>`;
  container.innerHTML = html;
}

function removeFilter(filterType) {
  activeFilters[filterType] = null;
  if (filterType === 'category') activeFilters.subcategory = null;
  applyFilters(); updateProductsTitle();
}
function clearAllFilters() {
  activeFilters = { country:null, category:null, subcategory:null, brand:null, search:'', itemCode:null };
  currentPage = 1;
  const si = document.getElementById('searchInput'); if (si) si.value = '';
  applyFilters();
  const t = document.getElementById('productsTitle'); if (t) t.textContent = 'Todos los Productos';
}

function updateProductsTitle() {
  let title = 'Todos los Productos';
  if (activeFilters.brand) { const b = brands.find(x => x.id === activeFilters.brand); title = `Productos ${b ? b.name : ''}`; }
  else if (activeFilters.subcategory) title = activeFilters.subcategory;
  else if (activeFilters.category) { const c = categorias.find(x => x.titulo === activeFilters.category); title = c ? c.titulo : activeFilters.category; }
  else if (activeFilters.country) { const c = countries.find(x => x.id === activeFilters.country); title = `Productos de ${c ? c.name : activeFilters.country} ${c ? c.flag : ''}`; }
  const el = document.getElementById('productsTitle'); if (el) el.textContent = title;
}

/* ---------- Render productos (chunked + delegación + sin layout thrash) ---------- */
let _productsRenderToken = 0;
function _productCardHTML(product) {
  const country = product.country ? countries.find(c => c.id === product.country) : null;
  const brandColor = product.brandColor || '#0066cc';
  const brandName = product.brandName || 'Sin marca';
  const initials = brandName.substring(0, 2).toUpperCase();
  const priceLabel = formatPrice(product.rate);
  const imageHtml = product.image
    ? `<img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('no-img');">`
    : `<div class="product-image-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>`;
  return `<div class="product-card" data-pid="${escapeHtml(product.id)}">` +
    `<div class="product-image">${imageHtml}${product.delivery==='En stock' ? '<span class="product-badge">En Stock</span>' : ''}</div>` +
    `<div class="product-content"><div class="product-brand"><div class="product-brand-logo" style="background:${brandColor}">${escapeHtml(initials)}</div>` +
    `<span class="product-brand-name">${escapeHtml(brandName)}</span></div>` +
    `<h3 class="product-name">${escapeHtml(product.name)}</h3><p class="product-sku">SKU: ${escapeHtml(product.sku || '-')}</p>` +
    (priceLabel ? `<p class="product-price" style="color:var(--color-price);font-weight:700;margin:4px 0;">${priceLabel}</p>` : '') +
    `<div class="product-meta"><span class="product-delivery"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${escapeHtml(product.delivery || 'Consultar')}</span>` +
    (country ? `<span class="product-country">${country.flag}</span>` : '') + `</div>` +
    `<button class="product-btn">Solicitar Cotizacion</button></div></div>`;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noProducts = document.getElementById('noProducts');
  const countEl = document.getElementById('productsCount');
  if (!grid) return;

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = Math.min(startIdx + productsPerPage, total);
  const slice = filteredProducts.slice(startIdx, endIdx);

  if (countEl) countEl.textContent = total > 0 ? `Mostrando ${startIdx+1}-${endIdx} de ${total} productos` : '0 productos encontrados';

  if (total === 0) {
    grid.innerHTML = '';
    if (noProducts) noProducts.classList.remove('hidden');
    renderPagination(0, 0);
    return;
  }
  if (noProducts) noProducts.classList.add('hidden');

  // Delegación de click una sola vez sobre el grid
  if (!grid.dataset.delegated) {
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.product-btn');
      if (!btn) return;
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;
      const pid = card.dataset.pid;
      const product = filteredProducts.find(p => String(p.id) === pid) || allProducts.find(p => String(p.id) === pid);
      if (!product) return;
      try { setTimeout(()=>localStorage.setItem('selectedProduct', JSON.stringify({ ...product, _buckets: undefined, _catKeys: undefined, _searchBlob: undefined, _brandNorm: undefined, _subNorm: undefined }))); } catch {}
      window.location.href = buildProductUrl(product);
    });
    grid.dataset.delegated = '1';
  }

  // Render completo en una sola pasada: más fluido para listas paginadas (<=96 items)
  ++_productsRenderToken;
  // Construye HTML completo offline antes de tocar el DOM una sola vez
  const parts = new Array(slice.length);
  for (let i = 0; i < slice.length; i++) parts[i] = _productCardHTML(slice[i]);
  grid.innerHTML = parts.join('');
  renderPagination(totalPages, total);
}

/* ---------- Paginación ---------- */
function renderPagination(totalPages, totalProducts) {
  let pag = document.getElementById('productsPagination');
  if (!pag) {
    const sec = document.getElementById('productosSection');
    const mc = sec && sec.querySelector('.products-main');
    if (!mc) return;
    mc.insertAdjacentHTML('beforeend', `<div class="pagination-container" id="productsPagination"></div>`);
    pag = document.getElementById('productsPagination');
  }
  if (!pag) return;
  if (totalProducts === 0) { pag.innerHTML = ''; return; }

  let pagesHtml = '';
  const maxVis = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVis/2));
  let end = Math.min(totalPages, start + maxVis - 1);
  if (end - start + 1 < maxVis) start = Math.max(1, end - maxVis + 1);
  if (start > 1) { pagesHtml += `<button class="pagination-btn" data-page="1">1</button>` + (start>2?`<span class="pagination-dots">...</span>`:''); }
  for (let i = start; i <= end; i++) pagesHtml += `<button class="pagination-btn ${i===currentPage?'active':''}" data-page="${i}">${i}</button>`;
  if (end < totalPages) { pagesHtml += (end<totalPages-1?`<span class="pagination-dots">...</span>`:'') + `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`; }

  pag.innerHTML = `<div class="pagination-controls"><div class="pagination-per-page"><label for="perPageSelect">Mostrar:</label><select id="perPageSelect" class="per-page-select"><option value="12" ${productsPerPage===12?'selected':''}>12</option><option value="24" ${productsPerPage===24?'selected':''}>24</option><option value="48" ${productsPerPage===48?'selected':''}>48</option><option value="96" ${productsPerPage===96?'selected':''}>96</option></select><span>por pagina</span></div><div class="pagination-nav"><button class="pagination-btn pagination-prev" ${currentPage===1?'disabled':''} data-page="${currentPage-1}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m15 18-6-6 6-6"/></svg>Anterior</button><div class="pagination-pages">${pagesHtml}</div><button class="pagination-btn pagination-next" ${currentPage===totalPages?'disabled':''} data-page="${currentPage+1}">Siguiente<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m9 18 6-6-6-6"/></svg></button></div><div class="pagination-info">Pagina ${currentPage} de ${totalPages}</div></div>`;

  if (!pag.dataset.delegated) {
    pag.addEventListener('click', (e) => {
      const btn = e.target.closest('.pagination-btn[data-page]');
      if (!btn || btn.disabled) return;
      const page = parseInt(btn.dataset.page, 10);
      if (page >= 1 && page <= Math.ceil(filteredProducts.length / productsPerPage) && page !== currentPage) {
        currentPage = page;
        renderProducts();
        document.getElementById('productsGrid')?.scrollIntoView({ behavior:'auto', block:'start' });
      }
    });
    pag.addEventListener('change', (e) => {
      if (e.target && e.target.id === 'perPageSelect') {
        productsPerPage = parseInt(e.target.value, 10);
        currentPage = 1;
        renderProducts();
      }
    });
    pag.dataset.delegated = '1';
  }
}

/* ---------- Búsqueda (debounce + búsqueda en blob precomputado) ---------- */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchDebounceTimer);
    if (query.length < 2) { if (searchResults) searchResults.classList.remove('active'); return; }
    searchDebounceTimer = setTimeout(() => {
      const q = query.toLowerCase();
      const results = [];
      let totalMatches = 0;
      for (let i = 0; i < allProducts.length; i++) {
        const p = allProducts[i];
        if (p._searchBlob.includes(q)) {
          totalMatches++;
          if (results.length < 8) results.push(p);
        }
      }
      if (!searchResults) return;
      const highlight = (text) => {
        const safe = escapeHtml(text || '');
        if (!q) return safe;
        const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        return safe.replace(re, '<mark>$1</mark>');
      };
      if (results.length) {
        const list = results.map(product => {
          const img = product.image || `https://via.placeholder.com/55x55?text=${encodeURIComponent((product.brandName || '?').substring(0,3))}`;
          const meta = [product.brandName, product.sku].filter(Boolean).map(escapeHtml).join(' · ');
          return `<div class="result-item" data-product="${escapeHtml(product.id)}" role="option" tabindex="0"><img src="${img}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='https://via.placeholder.com/55x55?text=?'"><div class="result-info"><strong>${highlight(product.name)}</strong><span>${meta}</span></div></div>`;
        }).join('');
        searchResults.innerHTML = list;
        searchResults.classList.add('active');
        if (!searchResults.dataset.delegated) {
          searchResults.addEventListener('click', (ev) => {
            const it = ev.target.closest('.result-item');
            if (!it) return;
            activeFilters.search = searchInput.value.trim();
            applyFilters(); showSection('productos');
            searchResults.classList.remove('active');
          });
          searchResults.dataset.delegated = '1';
        }
      } else {
        searchResults.innerHTML = `<div class="search-results-empty"><strong>Sin resultados</strong>No encontramos productos para "${escapeHtml(query)}"</div>`;
        searchResults.classList.add('active');
      }
    }, 250);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar') && searchResults) searchResults.classList.remove('active');
  });
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      activeFilters.search = searchInput.value.trim();
      applyFilters(); showSection('productos');
      if (searchResults) searchResults.classList.remove('active');
    }
  });
}

/* ---------- Sort ---------- */
function initSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;
  sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    filteredProducts.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'brand') return (a.brandName||'').localeCompare(b.brandName||'');
      if (sortBy === 'category') return (a.categoryName||'').localeCompare(b.categoryName||'');
      return 0;
    });
    renderProducts();
  });
}



function updateCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;

  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const totalItems = cartItems.reduce((acc, p) => acc + p.quantity, 0);
  cartCountEl.textContent = `Carrito (${totalItems})`;
}



// Exponer al ámbito global lo que el HTML usa en onclick=""
window.removeFilter = removeFilter;
window.clearAllFilters = clearAllFilters;
window.showSection = showSection;
