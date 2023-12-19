const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASSWORD = process.env.DB_PASSWORD || 'YT5gfhfisem02';
const DB_NAME = process.env.DB_NAME || 'restauranteDb';
const DB_PORT =process.env.DB_PORT || '3306'


module.exports = { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT }