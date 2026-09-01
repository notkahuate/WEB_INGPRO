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
  process.argv[2] || path.join(__dirname, '..', 'data', 'rqzyijcx_INGPRO.sql');

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

function mapCliente(user) {
  return {
    legacy_id: parseNumber(user.id),
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    telefono: user.telefono,
    pais: user.pais,
    estado_provincia: user.estado_provincia,
    direccion: user.direccion,
    nombre_empresa: user.nombre_empresa,
    codigo_postal: user.codigo_postal,
    ciudad: user.ciudad,
    password_hash: user.password,
    rol: user.rol,
    estado: user.estado,
    creado_en: parseDate(user.creado_en),
  };
}

function mapCotizacion(row) {
  return {
    legacy_id: parseNumber(row.id),
    legacy_user_id: parseNumber(row.user_id),
    productos: parseJsonField(row.productos),
    total_productos: parseNumber(row.total_productos),
    estado: row.estado,
    codigo_oportunidad: row.codigo_oportunidad,
    fecha: parseDate(row.fecha),
  };
}

async function upsertByField(strapi, uid, field, value, data) {
  const existing = await strapi.db.query(uid).findOne({
    where: { [field]: value },
  });

  if (existing) {
    await strapi.db.query(uid).update({
      where: { id: existing.id },
      data,
    });
    return 'updated';
  }

  await strapi.db.query(uid).create({ data });
  return 'created';
}

async function importTable(strapi, sql, tableName, mapper, uid, uniqueField) {
  const blocks = extractInsertBlocks(sql, tableName);
  let created = 0;
  let updated = 0;
  let failed = 0;

  const objects = blocks.flatMap((block) =>
    rowsToObjects(block.columns, block.rows)
  );

  for (let index = 0; index < objects.length; index += 1) {
    const mapped = mapper(objects[index], index);
    const uniqueValue = mapped[uniqueField];

    if (uniqueValue == null || uniqueValue === '') {
      failed += 1;
      continue;
    }

    try {
      const result = await upsertByField(
        strapi,
        uid,
        uniqueField,
        uniqueValue,
        mapped
      );
      if (result === 'created') created += 1;
      else updated += 1;
    } catch (error) {
      failed += 1;
      console.error(`❌ ${tableName} ${uniqueValue}:`, error.message);
    }
  }

  console.log(
    `✅ ${tableName}: ${created} creados, ${updated} actualizados, ${failed} errores`
  );
}

async function main() {
  if (!fs.existsSync(SQL_FILE)) {
    throw new Error(`No se encontró el archivo SQL: ${SQL_FILE}`);
  }

  const sql = fs.readFileSync(SQL_FILE, 'utf8');
  const strapi = require('@strapi/strapi');
  const app = await strapi().load();

  try {
    await importTable(
      app,
      sql,
      'productos',
      mapProducto,
      'api::producto.producto',
      'item_id'
    );
    await importTable(
      app,
      sql,
      'clientes',
      mapCliente,
      'api::cliente.cliente',
      'legacy_id'
    );
    await importTable(
      app,
      sql,
      'cotizaciones',
      mapCotizacion,
      'api::cotizacion.cotizacion',
      'legacy_id'
    );
  } finally {
    await app.destroy();
  }
}

main()
  .then(() => {
    console.log('\n🎉 Importación completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
