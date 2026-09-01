const { query } = require('./db');

// Crear usuario (registro)
const createUser = async (nombre, email, password, rol = 'usuario', estado = 'pendiente') => {
    const text = `
        INSERT INTO users (nombre, email, password, rol, estado)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [nombre, email, password, rol, estado];
    const result = await query(text, values);
    return result.rows[0];
};

// Buscar usuario por email (para login)
const findUserByEmail = async (email) => {
    const text = 'SELECT * FROM users WHERE email = $1';
    const result = await query(text, [email]);
    return result.rows[0];
};

// Listar usuarios pendientes de aprobación
const getPendingUsers = async () => {
    const text = 'SELECT * FROM users WHERE estado = $1';
    const result = await query(text, ['pendiente']);
    return result.rows;
};

// Aprobar usuario (cambiar estado a "aprobado")
const approveUser = async (id) => {
    const text = `
        UPDATE users
        SET estado = 'aprobado'
        WHERE id = $1
        RETURNING *;
    `;
    const result = await query(text, [id]);
    return result.rows[0];
};

// Obtener usuario por ID
const getUserById = async (id) => {
    const text = 'SELECT * FROM users WHERE id = $1';
    const result = await query(text, [id]);
    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail,
    getPendingUsers,
    approveUser,
    getUserById
};
