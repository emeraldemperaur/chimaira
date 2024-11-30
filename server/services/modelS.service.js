const status = require('http-status');
const jwt = require('jsonwebtoken');
const lockerGroupModel = require('../db_models/entitymodelS');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

async function findLockerGroupbyID(id, user){
    if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const lockergroup = await lockerGroupModel.LockerGroup.findOne({where: { id: id}, include: { all: true }});
    if(lockergroup === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Locker Group Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Locker Group Record found for ID: ${lockergroup.id}`);
    }
    return lockergroup;
}

async function findLockerGroupsbyGroupID(id, user){
    if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { groupId: id}, include: { all: true }});
    if(lockergroups.length === 0){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Locker Group Records (groupId: ${id}) not found on database`)
    }else {
        console.log(`Existing Locker Group Records found for (groupId: ${id})`);
    }
    return lockergroups;
}

async function findLockerGroupsbyLockerID(id, user){
    if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { lockerId: id}, include: { all: true }});
    if(lockergroups.length === 0){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Locker Group Records (lockerId: ${id}) not found on database`)
    }else {
        console.log(`Existing Locker Group Records found for (lockerId: ${id})`);
    }
    return lockergroups;
}

async function createLockerGroup(body){
    try{
        if(await alreadyExists(body.name)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that lockergroup name is already taken');
        const lockergroup = await lockerGroupModel.LockerGroup.create({
            name: body.name,
            groupId: body.groupId,
            lockerId: body.lockerId
        })
        return lockergroup;
    }catch(error){
        throw error
    }
}

async function fetchLockerGroups(){
    try{
        const lockergroups = await lockerGroupModel.LockerGroup.findAll();
        if(lockergroups === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Locker Group records found on database')
        }else {
            console.log(`(${lockergroups.length}) Locker Group records found on database`);
        }
        return lockergroups;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Locker Group records found on database')
    }
}


async function alreadyExists(name){
    let extant = false;
    const extantLocker = await lockerGroupModel.LockerGroup.findOne({where: {name: name} });
    if(extantLocker === null){
        console.log(`\nNo existing locker group record found for unique identifier: (${name})\n`);
    } else {
        extant = true;
        console.log(`\nExisiting locker group record found with unique identifier: (${name})\n`);
    }
    return extant;
}

const modelSServices = {
   findLockerGroupbyID,
   findLockerGroupsbyGroupID,
   findLockerGroupsbyLockerID,
   createLockerGroup,
   fetchLockerGroups
}

module.exports = {modelSServices}