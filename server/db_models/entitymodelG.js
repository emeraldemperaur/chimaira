const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');



//DataSource
const dataSource = dbSQLize;

const Group = dataSource.define(
    'Group',
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
        creator: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        uuid1: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: true
        },
        uuid2: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true
        },
        private: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        paranoid: false,
        hooks: {
            beforeCreate: async (group) => {
             

            },
            beforeUpdate: async (group) => {
                
            },
            afterUpdate: async (group) => {
                
            },
        }
    }
)

module.exports = {Group}