'use strict';

const fs = require('fs');
const path = require('path');
const {
  extractInsertBlocks,
  rowsToObjects,
  parseJsonField,
  parseNumber,
  parseDate,
  resolveItemId,
} = require('./sql-parser');

const SQL_FILE =
  process.argv[2] || path.join(__dirname, '..', 'data', 'productos.sql');

function mapProducto(product, index) {
  return {
    item_id: resolveItemId(product, index),
    name: product.name,
    brand: product.brand,
    rate: parseNumber(product.rate),
    stock_on_hand: parseNumber(product.stock_on_hand),
    sku: product.sku,
    status: product.status,
    cf_marca: product.cf_marca,
    cf_t_entrega: product.cf_t_entrega,
    cf_garant_a: product.cf_garant_a,
    cf_categoria: product.categoria,
    created_time: parseDate(product.created_time),
    last_modified_time: parseDate(product.last_modified_time),
    imagenes_url: parseJsonField(product.imagenes_url),
    config_options: parseJsonField(product.config_options),
    datasheet_url: product.datasheet_url,
    categoria: product.categoria,
    user_manual: product.user_manual,
    description: parseJsonField(product.description),
    especificaciones: parseJsonField(product.especificaciones),
    tablas: parseJsonField(product.tablas),
  };
}

async function upsertProduct(strapi, data) {
  const existing = await strapi.db.query('api::producto.producto').findOne({
    where: { item_id: data.item_id },
  });

  if (existing) {
    await strapi.db.query('api::producto.producto').update({
      where: { id: existing.id },
      data,
    });
    return 'updated';
  }

  await strapi.db.query('api::producto.producto').create({ data });
  return 'created';
}

async function main() {
  if (!fs.existsSync(SQL_FILE)) {
    throw new Error(`No se encontró el archivo SQL: ${SQL_FILE}`);
  }

  const sql = fs.readFileSync(SQL_FILE, 'utf8');
  const blocks = extractInsertBlocks(sql, 'productos');
  const rawProducts = blocks.flatMap((block) =>
    rowsToObjects(block.columns, block.rows)
  );

  console.log(`📄 Archivo: ${SQL_FILE}`);
  console.log(`📦 Bloques INSERT: ${blocks.length}`);
  console.log(`📦 Productos parseados: ${rawProducts.length}`);
  console.log(
    `📦 Filas por bloque: ${blocks.map((block) => block.rows.length).join(', ')}`
  );

  const strapi = require('@strapi/strapi');
  const app = await strapi().load();

  let created = 0;
  let updated = 0;
  let failed = 0;

  try {
    for (let index = 0; index < rawProducts.length; index += 1) {
      const mapped = mapProducto(rawProducts[index], index);

      try {
        const result = await upsertProduct(app, mapped);
        if (result === 'created') created += 1;
        else updated += 1;

        if ((created + updated) % 50 === 0) {
          console.log(`... ${created + updated}/${rawProducts.length}`);
        }
      } catch (error) {
        failed += 1;
        console.error(`❌ ${mapped.item_id}:`, error.message);
      }
    }
  } finally {
    await app.destroy();
  }

  console.log(`\n✅ Productos: ${created} creados, ${updated} actualizados, ${failed} errores`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
