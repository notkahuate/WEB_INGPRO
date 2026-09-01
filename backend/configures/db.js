const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_LIMIT || 4),
    queueLimit: 40,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    idleTimeout: 60000,
    connectTimeout: 10000,
});

// Función para probar la conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión exitosa a MySQL');
        connection.release();
    } catch (error) {
        console.error('❌ Error al conectar a MySQL:', error.message);
        console.error("❌ Error completo:", error);
    }
};

// Función para ejecutar consultas
const query = async (sql, params) => {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('❌ Error en la consulta:', error.message);
        throw error;
    }
};

module.exports = {
    pool,
    testConnection,
    query
};