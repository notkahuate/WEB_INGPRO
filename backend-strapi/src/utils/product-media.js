'use strict';

function strapiPublicBase() {
  return String(
    process.env.PUBLIC_URL ||
      process.env.STRAPI_URL ||
      'https://sales.ingprosuppliers.com'
  ).replace(/\/$/, '');
}

function toPublicUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${strapiPublicBase()}${path}`;
}

function extractMediaUrls(imagenes) {
  const list = Array.isArray(imagenes)
    ? imagenes
    : Array.isArray(imagenes?.data)
      ? imagenes.data
      : imagenes && typeof imagenes === 'object' && (imagenes.url || imagenes.attributes)
        ? [imagenes]
        : [];

  return list
    .map((file) => {
      const media = file?.attributes || file || {};
      return toPublicUrl(media.url);
    })
    .filter(Boolean);
}

function extractSingleMediaUrl(file) {
  return extractMediaUrls(file)[0] || '';
}

function parseImagenesUrlJson(value) {
  if (value == null || value === '') return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item : item?.url || ''))
      .map(toPublicUrl)
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    try {
      return parseImagenesUrlJson(JSON.parse(value));
    } catch {
      return value.trim() ? [toPublicUrl(value)] : [];
    }
  }
  return [];
}

function resolveProductImageUrls(product) {
  const fromMedia = extractMediaUrls(product?.imagenes);
  if (fromMedia.length) return fromMedia;
  return parseImagenesUrlJson(product?.imagenes_url);
}

function resolveProductDocumentUrls(product) {
  const datasheet =
    extractSingleMediaUrl(product?.datasheet) ||
    toPublicUrl(product?.datasheet_url) ||
    '';
  const manualsFromMedia = extractMediaUrls(product?.manuales);
  const manualsFromJson = parseImagenesUrlJson(product?.manuales_url);
  const manuals = manualsFromMedia.length ? manualsFromMedia : manualsFromJson;
  const userManual =
    manuals[0] || toPublicUrl(product?.user_manual) || '';
  const quickstart =
    extractSingleMediaUrl(product?.guia_rapida) ||
    toPublicUrl(product?.quickstart_url) ||
    toPublicUrl(product?.quick_start_url) ||
    '';

  return {
    datasheet_url: datasheet || product?.datasheet_url || null,
    user_manual: userManual || product?.user_manual || null,
    manuales_url: manuals.length ? manuals : parseImagenesUrlJson(product?.manuales_url),
    quickstart_url: quickstart || product?.quickstart_url || null,
  };
}

module.exports = {
  toPublicUrl,
  extractMediaUrls,
  extractSingleMediaUrl,
  parseImagenesUrlJson,
  resolveProductImageUrls,
  resolveProductDocumentUrls,
};
