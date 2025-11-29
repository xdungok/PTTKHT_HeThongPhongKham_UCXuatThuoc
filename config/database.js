require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'pharmacy_demo';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

if (process.env.DEBUG_DB) {
  console.info('[DB] connecting', { DB_NAME, DB_USER, DB_HOST, DB_PORT });
}

module.exports = sequelize;
