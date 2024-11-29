const status = require('http-status');
const jwt = require('jsonwebtoken');
const lockerModel = require('../db_models/entitymodelL');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

async function findLockerbyID(id, user){
    if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const locker = await lockerModel.Locker.findOne({where: { id: id}});
    if(locker === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Locker Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Locker Record found for ID: ${locker.id}`);
    }
    return locker;
}

async function createLocker(body){
    try{
        if(await alreadyExists(body.name)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that locker name is already taken');
        const locker = await lockerModel.Locker.create({
            name: body.name,
            owner: body.owner,
            uuid1: body.uuid1,
            uuid2: body.uuid2  
        })
        return locker;
    }catch(error){
        throw error
    }
}

async function fetchLockers(){
    try{
        const lockers = await lockerModel.Locker.findAll();
        if(lockers === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Locker records found on database')
        }else {
            console.log(`(${lockers.length}) Locker records found on database`);
        }
        return lockers;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Locker records found on database')
    }
}


async function alreadyExists(name){
    let extant = false;
    const extantLocker = await lockerModel.Locker.findOne({where: {name: name} });
    if(extantLocker === null){
        console.log(`\nNo existing locker record found for unique identifier: (${name})\n`);
    } else {
        extant = true;
        console.log(`\nExisiting locker record found with unique identifier: (${name})\n`);
    }
    return extant;
}

const modelLServices = {
   findLockerbyID,
   createLocker,
   fetchLockers
}

module.exports = {modelLServices}