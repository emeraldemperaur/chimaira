const status = require('http-status');
const jwt = require('jsonwebtoken');
const userModel = require('../db_models/user');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');



async function findUserbyUUID(uuid){
    const user = await userModel.User.findOne({where: {email: uuid}});
    if (user === null){
        throw new Error(`UUID: ${uuid} not found on database`);
    }else {
        console.log(`Existing User record found with unique identifier: ${user.email} `)
    }
    return user;
}

async function findUserbyID(id){
    const user = await userModel.User.findOne({where: { id: id}});
    if(user === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Exisiting User Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Exisiting User Record found for ID: ${user.id}`);
    }
    return user;
}

async function updateUserProfile(req){
    try{
        const user = await userModel.User.findOne({ where: { id: req.user.id }});
        const salt = await bcrypt.genSalt(10, 'a');
        if(!user){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'Existing User Record not found on database')
        }
        await user.update({
            password: bcrypt.hashSync(req.body.password, salt),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            uuid: req.body.uuid,
            role: req.body.role
        },)
        const extantUser = await user.save();
        return extantUser;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'Extant User Record not found on database')
    }
}

const userServices = {
    findUserbyUUID,
    findUserbyID,
    updateUserProfile
}

module.exports = {userServices}