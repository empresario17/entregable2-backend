
const { Sequelize } = require("sequelize");

require('dotenv').config();

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false }},

});

module.exports = db;

// postgres://choco:1binHU7vetlAE0L2hWD66KOgVhR7epHG@   dpg-chhv4jvdvk4hea9j14u0-a.oregon-postgres.render.com  /todos_ma4w