const status = require('http-status');
const jwt = require('jsonwebtoken');
const lockerGroupModel = require('../db_models/entitymodelS');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { mjolnirTools } = require('../utils/mjolnir');

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

async function fetchLockerGroups(req){
    if(!['name', 'creator', 'uuid1', 'uuid2', 'private', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroup propertyName (${req.query.sortby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroup propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const lockergroups = await lockerGroupModel.LockerGroup.findAll({include: { all: true }, offset: skip, limit: limit, order: [[sortby, order]]});
        if(lockergroups === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No LockerGroup records found on database')
        }else {
            console.log(`(${lockergroups.length}) LockerGroup records found on database`);
        }
        return lockergroups;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No LockerGroup records found on database')
    }
}

async function findLockerGroupsbyProperty(req, propertyName, propertyValue){
    if(!['name', 'groupId', 'lockerId'].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroups propertyName (${propertyName}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var lockergroups = []
        switch(propertyName) {
            case 'name':
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { name: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]} );
              break;
            case 'groupId':
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { groupId: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'lockerId':
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { lockerId: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            default:
              lockergroups = await lockerGroupModel.LockerGroup.findAll({where: { name: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
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

async function fetchLockerGroupPages(req){
    if(req.query.page === undefined) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid 'page' query provided (${req.query.page})`);
    if(!['name', 'groupId', 'lockerId', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroup propertyName (${req.query.sortby}) provided.`);
    if(!['name', 'groupId', 'lockerId', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroup propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroup propertyName (${req.query.order}) provided.`);
    var dataResponse;
    const page = req.query.page || 0;
    const size = req.query.size || 10;
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const filterby = req.query.filterby || 'id';
    const keyword = req.query.keyword || null;
    try{
        const { limit, offset } = await mjolnirTools.getPagination(page, size);
        switch(filterby) {
            case 'name':
              await lockerGroupModel.LockerGroup.findAndCountAll({include: { all: true }, where: { name: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} LockerGroup records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`) });
              break;
            case 'groupId':
             await lockerGroupModel.LockerGroup.findAndCountAll({include: { all: true }, where: { groupId: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} LockerGroup records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`) });
              break;
            case 'lockerId':
             await lockerGroupModel.LockerGroup.findAndCountAll({include: { all: true }, where: { lockerId: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} LockerGroup records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`) });
              break;
              default:
             await lockerGroupModel.LockerGroup.findAndCountAll({include: { all: true }, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} LockerGroup records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No LockerGroup Records found on database | ${error.message}`)
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

async function exantBulkUpdate(name){
    const extantLockers = await lockerModel.Locker.findAll();
    for(let locker in extantLockers){
        console.log(`Update blocked. Extant Group Record found with identifier: ${locker.name}`);
        if(locker.name == name){ throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 
            `Update blocked. Extant Locker Record found with identifier: ${locker.name}`);
        }
    }
}

async function bulkCreateLockerGroups(req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    try{
        let lockerGroupDataPayload = [...req.body];
        for(let lockergroup in lockerGroupDataPayload){
            exantBulkUpdate(lockergroup.name);
        }
        const lockergroups = await lockerModel.Locker.bulkCreate(lockerGroupDataPayload);
        return lockergroups;
    }catch(error){
        throw error;
    }
}

async function bulkDeleteLockerGroups(req){   
    try{
        if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const lockergroups = await lockerGroupModel.LockerGroup.destroy({ truncate: true });
        if(lockergroups < 1){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No exisitng Locker Group Record found on database`)
        } else if (lockergroups > 0) console.log(`Bulk Deleted (${lockergroups}) Locker Group Records from database`);
        return {action: 'bulkDelete', status: 'complete', entity: 'lockergroup', bulkDeleted: lockergroups}    
    }catch(error){
        throw error;
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
   fetchLockerGroupPages,
   updateLockerGroupbyID,
   deleteLockerGroupbyID,
   bulkCreateLockerGroups,
   bulkDeleteLockerGroups
}

module.exports = {modelSServices}