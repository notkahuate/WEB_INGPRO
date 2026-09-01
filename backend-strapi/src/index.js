'use strict';

const { resolveProductImageUrls, resolveProductDocumentUrls } = require('./utils/product-media');
const { getCachedProductList } = require('./utils/product-list-cache');

const CATALOG_FIELDS = [
  'id',
  'item_id',
  'name',
  'brand',
  'rate',
  'stock_on_hand',
  'sku',
  'status',
  'cf_marca',
  'cf_categoria',
  'cf_subcategoria',
  'cf_category',
  'cf_item',
  'origen',
  'imagen_url',
  'image_name',
  'imagenes_url',
  'categoria',
  'last_modified_time',
];

function parseJsonField(value) {
  if (value == null) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function mapProductoToLegacy(product) {
  const docs = resolveProductDocumentUrls(product);
  return {
    id: product.id,
    item_id: product.item_id,
    name: product.name,
    description: parseJsonField(product.description),
    brand: product.brand,
    rate: product.rate != null ? Number(product.rate) : product.rate,
    stock_on_hand:
      product.stock_on_hand != null
        ? Number(product.stock_on_hand)
        : product.stock_on_hand,
    sku: product.sku,
    status: product.status,
    cf_marca: product.cf_marca,
    cf_t_entrega: product.cf_t_entrega,
    cf_garant_a: product.cf_garant_a,
    cf_codigo: product.cf_codigo,
    cf_categoria: product.cf_categoria || product.categoria,
    cf_subcategoria: product.cf_subcategoria,
    cf_item: product.cf_item,
    cf_category: product.cf_category,
    cf_codigo_categoria: product.cf_codigo_categoria,
    cf_en_el_paquete: product.cf_en_el_paquete,
    origen: product.origen,
    imagen_url: resolveProductImageUrls(product)[0] || product.imagen_url,
    image_name: product.image_name,
    imagenes_url: (() => {
      const urls = resolveProductImageUrls(product);
      return urls.length ? urls : parseJsonField(product.imagenes_url);
    })(),
    config_options: parseJsonField(product.config_options),
    datasheet_url: docs.datasheet_url,
    categoria: product.categoria,
    user_manual: docs.user_manual,
    manuales_url: docs.manuales_url,
    quickstart_url: docs.quickstart_url,
    especificaciones: parseJsonField(product.especificaciones),
    tablas: parseJsonField(product.tablas),
    created_time: product.created_time,
    last_modified_time: product.last_modified_time,
  };
}

async function enablePublicPermissions(strapi, actions) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const action of actions) {
    const permission = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: { action, role: publicRole.id },
      });

    if (permission && !permission.enabled) {
      await strapi.query('plugin::users-permissions.permission').update({
        where: { id: permission.id },
        data: { enabled: true },
      });
    }
  }
}

module.exports = {
  register({ strapi }) {
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/products',
        handler: async (ctx) => {
          const products = await getCachedProductList(() =>
            strapi.entityService.findMany('api::producto.producto', {
              fields: CATALOG_FIELDS,
              sort: { last_modified_time: 'desc' },
              limit: 8000,
            })
          );

          ctx.set(
            'Cache-Control',
            'public, max-age=300, stale-while-revalidate=600'
          );
          ctx.body = products.map(mapProductoToLegacy);
        },
        config: { auth: false },
      },
      {
        method: 'GET',
        path: '/api/products/:id',
        handler: async (ctx) => {
          const { id } = ctx.params;

          const matches = await strapi.entityService.findMany(
            'api::producto.producto',
            {
              filters: { item_id: id },
              limit: 1,
              populate: {
                imagenes: true,
                datasheet: true,
                manuales: true,
                guia_rapida: true,
              },
            }
          );

          const product = matches[0];

          if (!product) {
            ctx.status = 404;
            ctx.body = { message: 'Producto no encontrado' };
            return;
          }

          ctx.body = mapProductoToLegacy(product);
        },
        config: { auth: false },
      },
    ]);
  },

  async bootstrap({ strapi }) {
    if (process.env.NODE_ENV !== 'production') {
      strapi.log.warn(
        'Strapi no está en NODE_ENV=production. En cPanel usa `npm start` (strapi start), nunca `strapi develop`.'
      );
    }

    await enablePublicPermissions(strapi, [
      'api::producto.producto.find',
      'api::producto.producto.findOne',
    ]);
  },
};
