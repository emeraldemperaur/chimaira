const { Sequelize } = require('sequelize');
require('dotenv').config();

const initDatabaseSource = (databaseDialect) => {
    let dbSQLize = null;
    let sqlize = null;
    const sqlite = new Sequelize({storage: 'iliad.db', dialect: 'sqlite'});
    if(['postgres','mssql','mariadb','db2','oracle','snowflake'].includes(databaseDialect)){
            sqlize = new Sequelize(process.env.DB_ALIAS, process.env.DB_USERNAME, process.env.DB_PASSWORD,
            {host: process.env.DB_HOST, dialect: process.env.DB_TYPE});
    }
    switch(databaseDialect){
        case 'postgres':
            dbSQLize = sqlize
            break
        case 'mssql':
            dbSQLize = sqlize
            break
        case 'mariadb':
            dbSQLize = sqlize
            break
        case 'db2':
            dbSQLize = sqlize
            break
        case 'oracle':
            dbSQLize = sqlize
            break
        case 'snowflake':
            dbSQLize = sqlize
            break
        case 'sqlite':
            dbSQLize = sqlite
        default:
            dbSQLize = sqlite
    }
    return dbSQLize;
}

const dbSQLize = initDatabaseSource(process.env.DB_TYPE);

module.exports = {dbSQLize}