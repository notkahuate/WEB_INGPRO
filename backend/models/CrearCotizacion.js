const { pool } = require("../configures/db");

let tableReady = false;

async function ensureCotizacionesTable() {
  if (tableReady) return;
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cotizaciones (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
      productos LONGTEXT NOT NULL,
      total_productos INT NOT NULL,
      estado VARCHAR(50) DEFAULT 'pendiente',
      codigo_oportunidad VARCHAR(50) DEFAULT NULL,
      INDEX idx_cotizaciones_user_id (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  tableReady = true;
}

class Cotizacion {
  static async crearCotizacion({
    user_id,
    productos,
    total_productos,
    estado,
    codigo_oportunidad,
  }) {
    await ensureCotizacionesTable();

    const [result] = await pool.execute(
      `INSERT INTO cotizaciones
      (user_id, productos, total_productos, estado, codigo_oportunidad, fecha)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        Number(user_id),
        JSON.stringify(productos),
        total_productos,
        estado,
        codigo_oportunidad || null,
        new Date(),
      ]
    );

    return { id: result.insertId };
  }

  static async obtenerCotizacionesPorUsuario(user_id) {
    await ensureCotizacionesTable();

    const uid = Number(user_id);
    if (!Number.isFinite(uid) || uid <= 0) {
      const err = new Error("user_id inválido");
      err.status = 400;
      throw err;
    }

    const [rows] = await pool.execute(
      "SELECT * FROM cotizaciones WHERE user_id = ? ORDER BY fecha DESC",
      [uid]
    );
    return rows;
  }

  static async obtenerCotizacionPorId(id) {
    await ensureCotizacionesTable();

    const [rows] = await pool.execute(
      "SELECT * FROM cotizaciones WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }
}

module.exports = Cotizacion;
