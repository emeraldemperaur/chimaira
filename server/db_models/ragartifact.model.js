const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
const { Group, ContextProfile } = require('./contextprofile.model');
const { Locker, QueryModel } = require('./querymodel.model');
const { User } = require('./user');



//DataSource
const dataSource = dbSQLize;

const RAGArtifact = dataSource.define(
    'RAGArtifact',
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
        synopsis: {
            type: DataTypes.STRING,
            allowNull: true
        },
        response: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: true
        },
        mementos: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: true
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        tableName: 'RAGArtifacts',
        paranoid: true,
        hooks: {
            beforeCreate: async (ragartifact) => {
              
            },
            beforeUpdate: async (ragartifact) => {
                
            },
            afterUpdate: async (ragartifact) => {
                
            },
        }
    }
)

RAGArtifact.belongsTo(ContextProfile, { foreignKey: 'contextId', onDelete: 'RESTRICT'});
RAGArtifact.belongsTo(QueryModel, { foreignKey: 'queryId', onDelete: 'RESTRICT'});
RAGArtifact.belongsTo(User, { foreignKey: 'userId', onDelete: 'RESTRICT'});


module.exports = {RAGArtifact};