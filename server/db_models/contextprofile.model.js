const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
const { User } = require('./user');



//DataSource
const dataSource = dbSQLize;

const ContextProfile = dataSource.define(
    'ContextProfile',
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
        prologue: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        documentUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        targetUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        codeSnippet: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isQueryCommand: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        queryCommand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        tableName: 'ContextProfiles',
        paranoid: true,
        hooks: {
            beforeCreate: async (context) => {
             
            },
            beforeUpdate: async (context) => {
                
            },
            afterUpdate: async (context) => {
                
            },
        }
    }
)

ContextProfile.belongsTo(User, { foreignKey: 'userId', onDelete: 'SET NULL'});

module.exports = {ContextProfile};