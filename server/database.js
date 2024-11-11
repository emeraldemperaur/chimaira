const { Sequelize } = require('sequelize');
require('dotenv').config();


const dbSQLize = new Sequelize(
    process.env.DB_ALIAS,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_TYPE
    }
)

module.exports = {dbSQLize}