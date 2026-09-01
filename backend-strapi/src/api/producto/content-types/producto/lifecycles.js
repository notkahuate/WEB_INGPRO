'use strict';

const {
  extractMediaUrls,
  extractSingleMediaUrl,
} = require('../../../../utils/product-media');
const { invalidateProductListCache } = require('../../../../utils/product-list-cache');

function sameUrlList(a, b) {
  return JSON.stringify(a || []) === JSON.stringify(b || []);
}

async function syncMediaFieldsFromUploads(event) {
  const id = event?.result?.id;
  if (!id) return;

  const product = await strapi.entityService.findOne(
    'api::producto.producto',
    id,
    {
      populate: {
        imagenes: true,
        datasheet: true,
        manuales: true,
        guia_rapida: true,
      },
    }
  );
  if (!product) return;

  const data = {};

  const imageUrls = extractMediaUrls(product.imagenes);
  if (imageUrls.length) {
    const current = Array.isArray(product.imagenes_url)
      ? product.imagenes_url
      : [];
    const firstName =
      product.imagenes?.[0]?.name ||
      product.imagenes?.[0]?.attributes?.name ||
      product.image_name ||
      null;

    if (
      !sameUrlList(current, imageUrls) ||
      product.imagen_url !== imageUrls[0] ||
      (firstName && product.image_name !== firstName)
    ) {
      data.imagenes_url = imageUrls;
      data.imagen_url = imageUrls[0];
      if (firstName) data.image_name = firstName;
    }
  }

  const datasheetUrl = extractSingleMediaUrl(product.datasheet);
  if (datasheetUrl && product.datasheet_url !== datasheetUrl) {
    data.datasheet_url = datasheetUrl;
  }

  const manualUrls = extractMediaUrls(product.manuales);
  if (manualUrls.length) {
    const currentManuals = Array.isArray(product.manuales_url)
      ? product.manuales_url
      : [];
    if (
      !sameUrlList(currentManuals, manualUrls) ||
      product.user_manual !== manualUrls[0]
    ) {
      data.manuales_url = manualUrls;
      data.user_manual = manualUrls[0];
    }
  }

  const quickstartUrl = extractSingleMediaUrl(product.guia_rapida);
  if (quickstartUrl && product.quickstart_url !== quickstartUrl) {
    data.quickstart_url = quickstartUrl;
  }

  if (!Object.keys(data).length) return;

  await strapi.db.query('api::producto.producto').update({
    where: { id },
    data,
  });
}

module.exports = {
  async afterCreate(event) {
    invalidateProductListCache();
    await syncMediaFieldsFromUploads(event);
  },
  async afterUpdate(event) {
    invalidateProductListCache();
    await syncMediaFieldsFromUploads(event);
  },
  async afterDelete() {
    invalidateProductListCache();
  },
};
