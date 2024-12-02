const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');



//DataSource
const dataSource = dbSQLize;

const Locker = dataSource.define(
    'Locker',
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
        owner: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        uuid1: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        uuid2: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        lastLockedOn: {
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
        tableName: null,
        paranoid: false,
        hooks: {
            beforeCreate: async (locker) => {

            },
            beforeUpdate: async (locker) => {
                
            },
            afterUpdate: async (locker) => {
                
            },
        }
    }
)

module.exports = {Locker}