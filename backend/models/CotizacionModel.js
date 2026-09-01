const { pool } = require("../configures/db");

// 🔍 Obtener usuario
async function obtenerUsuario(id) {
  const [rows] = await pool.execute(
    `SELECT * FROM clientes WHERE id = ?`,
    [id]
  );

  return rows.length ? rows[0] : null;
}

// 📦 Obtener TODAS las cotizaciones con código
async function obtenerTodasCotizaciones() {
  const query = `
    SELECT * 
    FROM cotizaciones 
    WHERE codigo_oportunidad IS NOT NULL;
  `;

  const [rows] = await pool.execute(query);
  return rows;
}

// 🔄 Actualizar estado por código
async function actualizarEstadoPorCodigo(codigo, estado) {
  const query = `
    UPDATE cotizaciones
    SET estado = ?
    WHERE codigo_oportunidad = ?;
  `;

  await pool.execute(query, [estado, codigo]);

  // 🔥 MySQL no tiene RETURNING → hacemos otro SELECT
  const [rows] = await pool.execute(
    `SELECT * FROM cotizaciones WHERE codigo_oportunidad = ? LIMIT 1`,
    [codigo]
  );

  return rows[0] || null;
}

module.exports = {
  obtenerUsuario,
  obtenerTodasCotizaciones,
  actualizarEstadoPorCodigo
};