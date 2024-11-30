const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');



//DataSource
const dataSource = dbSQLize;

const Chain = dataSource.define(
    'Chain',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        tableName: null,
        hooks: {
            beforeCreate: async (chain) => {
             

            },
            beforeUpdate: async (chain) => {
                
            },
            afterUpdate: async (chain) => {
                
            },
        }
    }
)

module.exports = {Chain}