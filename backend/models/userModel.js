const { pool } = require('../configures/db');
const bcrypt = require('bcryptjs');

const UserModel = {

  async usuarioExiste(email) {
    const [rows] = await pool.execute(
      "SELECT id FROM clientes WHERE email = ? LIMIT 1",
      [email]
    );
    return rows.length > 0;
  },

  async crearUsuario(
    nombre, apellido, email, password, telefono,
    pais, estado_provincia,
    direccion, nombreEmpresa, codigo_postal, ciudad
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO clientes 
      (nombre, apellido, email, password_hash, telefono, pais, estado_provincia, direccion, nombre_empresa, codigo_postal, ciudad, rol, estado, creado_en)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        nombre, apellido, email, hashedPassword, telefono,
        pais, estado_provincia,
        direccion, nombreEmpresa, codigo_postal, ciudad,
        'usuario', 'pendiente', new Date()
      ]
    );

    return { id: result.insertId, email };
  },

  async obtenerUsuarioPorEmail(email) {
    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  async actualizarPasswordPorEmail(email, nuevaPassword) {
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

    const [result] = await pool.execute(
      "UPDATE clientes SET password_hash = ? WHERE email = ?",
      [hashedPassword, email]
    );

    return result;
  }

};

module.exports = UserModel;
