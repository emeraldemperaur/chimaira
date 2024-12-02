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
        const lockergroups = await lockerGroupModel.LockerGroup.findAll({include: { all: true }});
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

async function findLockerGroupsbyProperty(propertyName, propertyValue, user){
    if(!['name', 'groupId', 'lockerId'].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroups propertyName (${propertyName}) provided.`)
    try{
        if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var lockergroups = []
        switch(propertyName) {
            case 'name':
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { name: propertyValue}, include: { all: true}} );
              break;
            case 'groupId':
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { groupId: propertyValue}, include: { all: true}});
              break;
            case 'lockerId':
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { lockerId: propertyValue}, include: { all: true}});
              break;
            default:
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { name: propertyValue}, include: { all: true}});
          }
          if(lockergroups.length === 0){
            console.log(`Existing LockerGroup Records not found on database`);
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records (${propertyName}: ${propertyValue}) found on database`);
          }else{ console.log(`(${lockergroups.length}) Existing LockerGroup Records [${propertyName}: ${propertyValue}] found on database`); }
        return lockergroups;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records [${propertyName}: ${propertyValue}] found on database`)
    }
}

async function updateLockerGroupbyID(id, req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    await exantUpdate(id, req.body.name)
    const lockergroup = await lockerGroupModel.LockerGroup.findOne({where: { id: id}});
    if(lockergroup === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing LockerGroup Record (ID: ${id}) not found on database`)
    }else if(lockergroup) {
        console.log(`Existing LockerGroup Record found for ID: ${lockergroup.id}`);
        await lockergroup.update({
            name: req.body.name,
            groupId: req.body.groupId,
            lockerId: req.body.lockerId,  
            tags: req.body.tags
        });
        await lockergroup.save();
        console.log(`Updated Existing LockerGroup Record (ID: ${lockergroup.id}) on database`);
    }
    return lockergroup;
}

async function deleteLockerGroupbyID(id, req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const lockergroup = await lockerGroupModel.LockerGroup.findOne({where: { id: id}, include: { all: true}});
    if(lockergroup === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing LockerGroup Record (ID: ${id}) not found on database`)
    }else if(lockergroup) {
        console.log(`Existing LockerGroup Record found for ID: ${lockergroup.id}`);
        await lockergroup.destroy();
        console.log(`Updated Existing LockerGroup Record (ID: ${lockergroup.id}) on database`);
    }
    return lockergroup;
}

async function exantUpdate(id, name){
    const lockergroup = await lockerGroupModel.LockerGroup.findOne({where: {name: name}});
    if(lockergroup && lockergroup.id != id){
        console.log(`Update blocked. Extant LockerGroup Record found with identifier: ${lockergroup.name}`);
        throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Update blocked. Extant LockerGroup Record found with identifier: ${lockergroup.name}`);
    }
}


async function alreadyExists(name){
    let extant = false;
    const extantLockerGroup = await lockerGroupModel.LockerGroup.findOne({where: {name: name} });
    if(extantLockerGroup === null){
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
   findLockerGroupsbyProperty,
   createLockerGroup,
   fetchLockerGroups,
   updateLockerGroupbyID,
   deleteLockerGroupbyID
}

module.exports = {modelSServices}