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

async function findLockerNamebyID(id){
    const locker = await lockerModel.Locker.findOne({where: { id: id}});
    if(locker === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Locker Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Locker Record found for ID: ${locker.id}`);
    }
    return locker.name;
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

async function findLockersbyProperty(propertyName, propertyValue, user){
    if(!['name', 'owner', 'uuid1', 'uuid2', 'locked', 'lastLockedOn', 'createdOn'].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${propertyName}) provided.`)
    try{
        if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var lockers = [];
        var startDate;
        var endDate;
        switch(propertyName) {
            case 'name':
              lockers = await lockerModel.Locker.findAll({where: { name: propertyValue}});
              break;
            case 'owner':
              lockers = await lockerModel.Locker.findAll({where: { owner: propertyValue}});
              break;
            case 'uuid1':
              lockers = await lockerModel.Locker.findAll({where: { uuid1: propertyValue}});
              break;
            case 'uuid2':
              lockers = await lockerModel.Locker.findAll({where: { uuid2: propertyValue}});
              break;
            case 'locked':
              lockers = await lockerModel.Locker.findAll({where: { locked: propertyValue}});
              break;
            case 'lastLockedOn':
              endDate = new Date(new Date(propertyValue).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);
              lockers = await lockerModel.Locker.findAll({where: { lastLockedOn:{ [Op.lt]: endDate, [Op.gt]: startDate } }});
              break;
            case 'createdOn':
              endDate = new Date(new Date(propertyValue).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);
              lockers = await lockerModel.Locker.findAll({where: { createdOn:{ [Op.lt]: endDate, [Op.gt]: startDate } }});
              break;
            default:
              lockers = await lockerModel.Locker.findAll({where: { name: propertyValue}});
          }
          if(lockers.length === 0){
            console.log(`Existing Locker Records not found on database`);
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records (${propertyName}: ${propertyValue}) found on database`);
          }else{ console.log(`(${lockers.length}) Existing Locker Records [${propertyName}: ${propertyValue}] found on database`); }
        return lockers;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records [${propertyName}: ${propertyValue}] found on database`)
    }
}


async function updateLockerbyID(id, req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    await exantUpdate(id, req.body.name)
    const locker = await lockerModel.Locker.findOne({where: { id: id}});
    if(locker === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Locker Record (ID: ${id}) not found on database`)
    }else if(locker) {
        console.log(`Existing Locker Record found for ID: ${locker.id}`);
        await locker.update({
            name: req.body.name,
            owner: req.body.owner,
            uuid1: req.body.uuid1,
            uuid2: req.body.uuid2  
        });
        await locker.save();
        console.log(`Updated Existing Locker Record (ID: ${locker.id}) on database`);
    }
    return locker;
}

async function deleteLockerbyID(id, req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const locker = await lockerModel.Locker.findOne({where: { id: id}});
    if(locker === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Locker Record (ID: ${id}) not found on database`)
    }else if(locker) {
        console.log(`Existing Locker Record found for ID: ${locker.id}`);
        await locker.destroy();
        console.log(`Deleted Existing Locker Record (ID: ${locker.id}) on database`);
    }
    return locker;
}

async function exantUpdate(id, name){
    const locker = await lockerModel.Locker.findOne({where: {name: name}});
    if(locker && locker.id != id){
        console.log(`Update blocked. Extant Locker Record found with identifier: ${locker.name}`);
        throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Update blocked. Extant Locker Record found with identifier: ${locker.name}`)
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
   fetchLockers,
   findLockersbyProperty,
   findLockerNamebyID,
   updateLockerbyID,
   deleteLockerbyID

}

module.exports = {modelLServices}