const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
const { generatePIN, mjolnirTools } = require('../utils/mjolnir');



//DataSource
const dataSource = dbSQLize;

const Key = dataSource.define(
    'Key',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        keycode: {
            type: DataTypes.INTEGER,
            defaultValue: () => mjolnirTools.generatePIN(),
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
            beforeCreate: async (key) => {
             

            },
            beforeUpdate: async (key) => {
                
            },
            afterUpdate: async (key) => {
                
            },
        }
    }
)

module.exports = {Key}