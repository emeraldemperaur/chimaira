const { DataTypes } = require('sequelize');
const { dbSQLize } = require('../database');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');



//DataSource
const dataSource = dbSQLize;

const User = dataSource.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(69),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(33),
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING(33),
            defaultValue: "",
            allowNull: false
        },
        uuid: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(13),
            defaultValue: 'root',
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },

    },
    {
        hooks: {
            beforeCreate: async (user) => {
                if(user.password){
                    const salt = await bcrypt.genSalt(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
                if(user.firstName && user.lastName){
                    user.fullName = `${user.firstName} ${user.lastName}`
                }
                if(!validator.isEmail(user.email)){
                    throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Invalid User Email');
                }

            },
            beforeUpdate: async (user) => {
                if(user.firstName && user.lastName){
                    user.fullName = `${user.firstName} ${user.lastName}`
                }
                if(!validator.isEmail(user.email)){
                    throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Invalid User Email');
                }
            }
        }
    }

)

module.exports = {User}