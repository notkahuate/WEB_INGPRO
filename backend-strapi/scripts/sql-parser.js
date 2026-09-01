'use strict';

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
    while (i < valuesSection.length && valuesSection[i] !== '(') {
      i += 1;
    }
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
  const marker = `INSERT INTO \`${tableName}\``;
  const blocks = [];
  let searchFrom = 0;

  while (searchFrom < sql.length) {
    const insertIdx = sql.indexOf(marker, searchFrom);
    if (insertIdx === -1) break;

    const colsStart = sql.indexOf('(', insertIdx);
    const colsEnd = sql.indexOf(')', colsStart);
    const columns = sql
      .slice(colsStart + 1, colsEnd)
      .split(',')
      .map((column) => column.trim().replace(/`/g, ''));

    const valuesKeywordIdx = sql.indexOf('VALUES', insertIdx);
    let i = valuesKeywordIdx + 6;
    while (i < sql.length && sql[i] !== '(') i += 1;

    let depth = 0;
    let inString = false;
    const valuesStart = i;

    while (i < sql.length) {
      const ch = sql[i];

      if (inString) {
        if (ch === "'" && sql[i + 1] === "'") {
          i += 2;
          continue;
        }
        if (ch === "'") inString = false;
        i += 1;
        continue;
      }

      if (ch === "'") {
        inString = true;
        i += 1;
        continue;
      }

      if (ch === '(') depth += 1;
      if (ch === ')') depth -= 1;

      if (ch === ';' && depth === 0) break;
      i += 1;
    }

    const valuesSection = sql.slice(valuesStart, i);
    blocks.push({
      columns,
      rows: parseSqlInsertValues(valuesSection),
    });

    searchFrom = i + 1;
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

function parseJsonField(value) {
  if (value == null || value === '') return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function parseNumber(value) {
  if (value == null || value === '') return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(String(value).replace(' ', 'T'));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function resolveItemId(product, index) {
  const itemId = String(product.item_id || '').trim();
  if (itemId) return itemId;

  const sku = String(product.sku || '').trim();
  if (sku) return `sku-${sku}`;

  const nameSlug = String(product.name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);

  return nameSlug ? `name-${nameSlug}-${index + 1}` : `legacy-${index + 1}`;
}

module.exports = {
  extractInsertBlocks,
  rowsToObjects,
  parseJsonField,
  parseNumber,
  parseDate,
  resolveItemId,
};
