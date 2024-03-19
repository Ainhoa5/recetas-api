// Importa el paquete dotenv y carga las variables de entorno
require('dotenv').config();
const mysql = require('mysql2/promise');

// Crea un pool de conexiones usando las variables de entorno
const pool = mysql.createPool({
    connectionLimit: 10, // el número máximo de conexiones permitidas al mismo tiempo
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = pool;

module.exports = pool;
