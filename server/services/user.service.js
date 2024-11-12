const status = require('http-status');
const jwt = require('jsonwebtoken');
const userModel = require('../db_models/user');
require('dotenv').config();


async function findUserbyUUID(uuid){
    const user = await userModel.User.findOne({where: {email: uuid}});
    if (user === null){
        throw new Error(`UUID: ${uuid} not found on database`);
    }else {
        console.log(`Existing User record found with unique identifier: ${user.email} `)
    }
    return user;
}

const userServices = {
    findUserbyUUID
}

module.exports = {userServices}