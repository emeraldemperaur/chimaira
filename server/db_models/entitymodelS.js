const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
const { Group } = require('./entitymodelG');
const { Locker } = require('./entitymodelL');



//DataSource
const dataSource = dbSQLize;

const LockerGroup = dataSource.define(
    'LockerGroup',
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
        tags: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: true
        }
    },
    {
        tableName: null,
        paranoid: false,
        hooks: {
            beforeCreate: async (lockergroup) => {
              
            },
            beforeUpdate: async (lockergroup) => {
                
            },
            afterUpdate: async (lockergroup) => {
                
            },
        }
    }
)

LockerGroup.belongsTo(Group, { foreignKey: 'groupId', onDelete: 'RESTRICT'})
LockerGroup.belongsTo(Locker, { foreignKey: 'lockerId', onDelete: 'RESTRICT'})

module.exports = {LockerGroup}