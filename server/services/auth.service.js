const status = require('http-status');
const userModel = require('../db_models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { findUserbyUUID, userServices } = require('./user.service');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');


const createUser = async(email, uuid, password, firstName, lastName, role) =>{
    try{
        if(await alreadyExists(email)){
            throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that unique identifier has already been taken');
        }
        const newUser = await userModel.User.create({
            email: email, uuid: uuid, password: password, firstName: firstName,
            lastName: lastName, role: role
        })
        return newUser;
    }catch(error){
        throw error;
    }
}


async function alreadyExists(email){
    let extant = false;
    const extantUser = await userModel.User.findOne({where: {email: email}});
    if(extantUser === null){
        console.log(`\nNo existing record found for unique identifier: ${email}\n`);
    } else {
        extant = true;
        console.log(`\nExisiting User record found with unique identifier: ${email}\n`);
    }
    return extant;
}

const genAuthToken = (user) =>{
    const userObject = {sub: Buffer.from(user.uuid, 'utf8').toString('hex'), email: user.email}
    const token = jwt.sign(userObject, process.env.DB_CODEX, {expiresIn: '1d'});
    return token;
}

async function juxtaPassword (candidatePassword, password){
    const match = await bcrypt.compare(candidatePassword, password);
    return match;
}

const signInWithUIDAndPassword = async(uuid, password) => {
    try{
        // Check if User exists in DB datasource
        const dbUser = await userServices.findUserbyUUID(uuid);
        if(dbUser){
            //User Verify
            if(!await juxtaPassword(password, dbUser.password)){
                throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Invalid User Password');
            }else if(await juxtaPassword(password, dbUser.password)){
                return dbUser;
            }
        }else if(!dbUser){
            throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Invalid User ID')
        }
    }catch(error){
        throw error;
    }
}

const authServices = {
    createUser, genAuthToken, signInWithUIDAndPassword
}

module.exports = {authServices}