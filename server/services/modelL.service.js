const status = require('http-status');
const jwt = require('jsonwebtoken');
const lockerModel = require('../db_models/entitymodelL');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { mjolnirTools } = require('../utils/mjolnir');

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

async function fetchLockers(req){
    if(!['name', 'creator', 'uuid1', 'uuid2', 'private', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.sortby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const lockers = await lockerModel.Locker.findAll({offset: skip, limit: limit, order: [[sortby, order]]});
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

async function findLockersbyProperty(req, propertyName, propertyValue){
    if(!['name', 'owner', 'uuid1', 'uuid2', 'locked', 'lastLockedOn', 'createdOn'].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${propertyName}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
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

async function fetchLockerPages(req){
    if(req.query.page === undefined) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid 'page' query provided (${req.query.page})`);
    if(!['name', 'owner', 'uuid1', 'uuid2', 'locked', 'lastLockedOn', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${req.query.sortby}) provided.`);
    if(!['name', 'owner', 'uuid1', 'uuid2', 'locked', 'lastLockedOn', 'createdOn', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${req.query.order}) provided.`);
    var dataResponse;
    const page = req.query.page || 0;
    const size = req.query.size || 10;
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const filterby = req.query.filterby || 'id';
    const keyword = req.query.keyword || null;
    try{
        const { limit, offset } = await mjolnirTools.getPagination(page, size);
        var startDate;
        var endDate;
        switch(filterby) {
            case 'name':
              await lockerModel.Locker.findAndCountAll({where: { name: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
              break;
            case 'owner':
             await lockerModel.Locker.findAndCountAll({where: { owner: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
              break;
            case 'uuid1':
             await lockerModel.Locker.findAndCountAll({where: { uuid1: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
              break;
            case 'uuid2':
             await lockerModel.Locker.findAndCountAll({where: { uuid2: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`)
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
              break;
            case 'locked':
             await lockerModel.Locker.findAndCountAll({where: { locked: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`)
                
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
              break;
            case 'lastLockedOn':
              endDate = new Date(new Date(keyword).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);             
             await lockerModel.Locker.findAndCountAll({where: { lastLockedOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
               break;
            case 'createdOn':
              endDate = new Date(new Date(keyword).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);             
             await lockerModel.Locker.findAndCountAll({where: { createdOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
               break;
            default:
             await lockerModel.Locker.findAndCountAll({offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Locker records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Locker Records found on database | (${error.message})`)
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

async function exantBulkUpdate(name){
    const extantLockers = await lockerModel.Locker.findAll();
    for(let locker in extantLockers){
        console.log(`Update blocked. Extant Group Record found with identifier: ${locker.name}`);
        if(locker.name == name){ throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 
            `Update blocked. Extant Locker Record found with identifier: ${locker.name}`);
        }
    }
}

async function bulkCreateLockers(req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    try{
        let lockerDataPayload = [...req.body];
        for(let locker in lockerDataPayload){
            exantBulkUpdate(locker.name);
        }
        const lockers = await lockerModel.Locker.bulkCreate(lockerDataPayload);
        return lockers;
    }catch(error){
        throw error;
    }
}

async function bulkDeleteLockers(req){   
    try{
        if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const locker = await lockerModel.Locker.destroy({ truncate: true });
        if(locker < 1){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No exisitng Group Record found on database`)
        } else if (locker > 0) console.log(`Bulk Deleted (${locker}) Group Records from database`);
        return {action: 'bulkDelete', status: 'complete', entity: 'group', bulkDeleted: locker}    
    }catch(error){
        throw error;
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
   fetchLockerPages,
   findLockersbyProperty,
   findLockerNamebyID,
   updateLockerbyID,
   deleteLockerbyID,
   bulkCreateLockers,
   bulkDeleteLockers

}

module.exports = {modelLServices}