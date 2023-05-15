
const { Sequelize } = require("sequelize");

const db = new Sequelize({
    host: "localhost",
    database: "todos",
    port: 5432,
    username: "postgres",
    password: "choco2217",
    dialect: "postgres",

});

module.exports = db;