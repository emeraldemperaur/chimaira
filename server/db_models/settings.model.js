const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
const { User } = require('./user');



//DataSource
const dataSource = dbSQLize;

const Setting = dataSource.define(
    'Setting',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        key: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        sourceUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },

    },
    {
        
        tableName: 'Settings',
        paranoid: true,
        hooks: {
            beforeCreate: async (setting) => {
               

            },
            beforeUpdate: async (setting) => {
               
            }
        }
    }

)

Setting.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE'});

module.exports = {Setting}