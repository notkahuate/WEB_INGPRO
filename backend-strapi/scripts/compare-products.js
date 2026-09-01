'use strict';

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const SQL_FILE =
  process.argv[2] ||
  path.join(__dirname, '..', 'data', 'productos.sql');
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

function resolveItemId(product, index) {
  const itemId = String(product.item_id || '').trim();
  if (itemId) return itemId;

  const sku = String(product.sku || '').trim();
  if (sku) return sku;

  return `legacy-${index + 1}`;
}

const sql = fs.readFileSync(SQL_FILE, 'utf8');
const blocks = extractInsertBlocks(sql, 'productos');
const products = blocks.flatMap((block) =>
  block.rows.map((row) => {
    const obj = {};
    block.columns.forEach((column, index) => {
      obj[column] = row[index] ?? null;
    });
    return obj;
  })
);

const ids = products.map((product, index) => resolveItemId(product, index));
const uniqueIds = new Set(ids);

const db = new Database(DB_FILE);
const existing = db
  .prepare('SELECT item_id FROM productos')
  .all()
  .map((row) => row.item_id);
const existingSet = new Set(existing);

const missing = [...uniqueIds].filter((id) => !existingSet.has(id));
const extra = existing.filter((id) => !uniqueIds.has(id));

console.log('SQL file:', SQL_FILE);
console.log('Rows in SQL:', products.length);
console.log('Unique item ids in SQL:', uniqueIds.size);
console.log('Products in Strapi:', existing.length);
console.log('Missing in Strapi:', missing.length);
console.log('Extra in Strapi (not in SQL):', extra.length);

if (missing.length) {
  console.log('\nMissing sample:', missing.slice(0, 20).join(', '));
}

if (extra.length) {
  console.log('\nExtra sample:', extra.slice(0, 20).join(', '));
}
