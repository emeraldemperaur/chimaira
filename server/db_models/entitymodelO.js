const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');



//DataSource
const dataSource = dbSQLize;

const Owner = dataSource.define(
    'Owner',
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
            beforeCreate: async (owner) => {
             

            },
            beforeUpdate: async (owner) => {
                
            },
            afterUpdate: async (owner) => {
                
            },
        }
    }
)

module.exports = {Owner}