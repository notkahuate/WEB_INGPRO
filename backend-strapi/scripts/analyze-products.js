'use strict';

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const SQL_FILE = process.argv[2] || path.join(__dirname, '..', 'data', 'productos.sql');
const DB_FILE = path.join(__dirname, '..', '.tmp', 'data.db');

function normalizeSqlValue(raw) {
  const value = String(raw ?? '').trim();
  if (!value || value.toUpperCase() === 'NULL') return null;
  return value;
}

function unescapeSqlString(value) {
  if (value == null) return null;
  return String(value)
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\\/g, '\\');
}

function parseCell(raw) {
  const value = normalizeSqlValue(raw);
  if (value == null) return null;
  return unescapeSqlString(value);
}

function parseSqlInsertValues(valuesSection) {
  const rows = [];
  let i = 0;

  while (i < valuesSection.length) {
    while (i < valuesSection.length && valuesSection[i] !== '(') i += 1;
    if (i >= valuesSection.length) break;

    i += 1;
    const row = [];
    let current = '';
    let inString = false;
    let depth = 0;

    while (i < valuesSection.length) {
      const ch = valuesSection[i];

      if (inString) {
        if (ch === "'") {
          if (valuesSection[i + 1] === "'") {
            current += "'";
            i += 2;
            continue;
          }
          inString = false;
          i += 1;
          continue;
        }
        current += ch;
        i += 1;
        continue;
      }

      if (ch === "'") {
        inString = true;
        i += 1;
        continue;
      }

      if (ch === '(') {
        depth += 1;
        current += ch;
        i += 1;
        continue;
      }

      if (ch === ')') {
        if (depth === 0) {
          row.push(parseCell(current));
          rows.push(row);
          i += 1;
          break;
        }
        depth -= 1;
        current += ch;
        i += 1;
        continue;
      }

      if (ch === ',' && depth === 0) {
        row.push(parseCell(current));
        current = '';
        i += 1;
        continue;
      }

      current += ch;
      i += 1;
    }

    while (i < valuesSection.length && valuesSection[i] !== '(' && valuesSection[i] !== ';') {
      i += 1;
    }
  }

  return rows;
}

function extractInsertBlocks(sql, tableName) {
  const regex = new RegExp(
    `INSERT\\s+INTO\\s+\`${tableName}\`\\s*\\(([^)]+)\\)\\s*VALUES\\s*([\\s\\S]*?);`,
    'gi'
  );

  const blocks = [];
  let match;

  while ((match = regex.exec(sql)) !== null) {
    blocks.push({
      columns: match[1]
        .split(',')
        .map((column) => column.trim().replace(/`/g, '')),
      rows: parseSqlInsertValues(match[2]),
    });
  }

  return blocks;
}

function rowsToObjects(columns, rows) {
  return rows.map((row) => {
    const obj = {};
    columns.forEach((column, index) => {
      obj[column] = row[index] ?? null;
    });
    return obj;
  });
}

function resolveItemId(product, index) {
  const itemId = String(product.item_id || '').trim();
  if (itemId) return itemId;
  const sku = String(product.sku || '').trim();
  if (sku) return sku;
  return `legacy-${index + 1}`;
}

const sql = fs.readFileSync(SQL_FILE, 'utf8');
const blocks = extractInsertBlocks(sql, 'productos');
const products = blocks.flatMap((block) => rowsToObjects(block.columns, block.rows));

const db = new Database(DB_FILE);
const strapiProducts = db.prepare('SELECT item_id, name, sku FROM productos').all();
const strapiById = new Map(strapiProducts.map((p) => [p.item_id, p]));

const emptyItemId = products.filter((p) => !String(p.item_id || '').trim());
const skuCounts = {};
products.forEach((p) => {
  const sku = String(p.sku || '').trim() || '(empty)';
  skuCounts[sku] = (skuCounts[sku] || 0) + 1;
});
const duplicateSkus = Object.entries(skuCounts).filter(([, count]) => count > 1);

const sqlNames = new Set(products.map((p) => String(p.name || '').trim()).filter(Boolean));
const strapiNames = new Set(strapiProducts.map((p) => String(p.name || '').trim()).filter(Boolean));

const missingNames = [...sqlNames].filter((name) => !strapiNames.has(name));
const extraNames = [...strapiNames].filter((name) => !sqlNames.has(name));

console.log('Parsed products:', products.length);
console.log('INSERT blocks:', blocks.length);
console.log('Rows per block:', blocks.map((b) => b.rows.length).join(', '));
console.log('Products with empty item_id:', emptyItemId.length);
emptyItemId.forEach((p, i) => {
  console.log(`  - [${i + 1}] sku=${p.sku} name=${String(p.name || '').slice(0, 60)}...`);
});

console.log('Duplicate SKUs in SQL:', duplicateSkus.length);
duplicateSkus.slice(0, 5).forEach(([sku, count]) => console.log(`  - ${sku}: ${count}`));

console.log('Names in SQL not in Strapi:', missingNames.length);
missingNames.slice(0, 5).forEach((name) => console.log(`  - ${name.slice(0, 80)}`));

console.log('Names in Strapi not in SQL:', extraNames.length);

let missingResolved = 0;
products.forEach((product, index) => {
  const id = resolveItemId(product, index);
  if (!strapiById.has(id)) missingResolved += 1;
});
console.log('Resolved IDs missing in Strapi:', missingResolved);
