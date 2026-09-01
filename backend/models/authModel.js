const { pool } = require("../configures/db");

class AuthModel {

  static async findByEmail(email) {
    if (!email) return null;

    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE email = ? LIMIT 1",
      [email.trim().toLowerCase()]
    );

    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE id = ?",
      [id]
    );

    return rows[0] || null;
  }

  static async createUser(data) {
    const {
      nombre,
      email,
      telefono,
      nombre_empresa,
      direccion,
      passwordHash
    } = data;

    const [result] = await pool.execute(
      `INSERT INTO clientes 
      (nombre, email, telefono, nombre_empresa, direccion, password_hash, rol, estado, creado_en)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, email, telefono, nombre_empresa, direccion, passwordHash, 'usuario', 'pendiente', new Date()]
    );

    return {
      id: result.insertId,
      nombre,
      email
    };
  }

  static async updatePassword(email, passwordHash) {
    await pool.execute(
      "UPDATE clientes SET password_hash = ? WHERE email = ?",
      [passwordHash, email]
    );
  }
}

module.exports = AuthModel;
