const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
const { User } = require('./user');



//DataSource
const dataSource = dbSQLize;

const QueryModel = dataSource.define(
    'QueryModel',
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
        type: {
            type: DataTypes.NUMBER(33),
            allowNull: false
        },
        tags: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: false
        },
        jsonQueryDefinition: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: false
        },
        isEdited: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        editedBy: {
            type: DataTypes.STRING(33),
            allowNull: true
        },
        editedOn: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        tableName: 'QueryModels',
        paranoid: true,
        hooks: {
            beforeCreate: async (querymodel) => {

            },
            beforeUpdate: async (querymodel) => {
                
            },
            afterUpdate: async (querymodel) => {
                
            },
        }
    }
)

QueryModel.belongsTo(User, { foreignKey: 'userId', onDelete: 'SET NULL'});


module.exports = {QueryModel};