const status = require('http-status');
const jwt = require('jsonwebtoken');
const groupModel = require('../db_models/entitymodelG');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const e = require('express');
const { mjolnirTools } = require('../utils/mjolnir');

async function findGroupbyID(id, user){
    if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const group = await groupModel.Group.findOne({where: { id: id}});
    if(group === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Group Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Group Record found for ID: ${group.id}`);
    }
    return group;
}

async function findGroupNamebyID(id){
    const group = await groupModel.Group.findOne({where: { id: id}});
    if(group === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Group Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Group Record found for ID: ${group.id}`);
    }
    return group.name;
}

async function createGroup(body){
    try{
        if(await alreadyExists(body.name)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that group name is already taken');
        const group = await groupModel.Group.create({
            name: body.name,
            creator: body.creator,
            uuid1: body.uuid1,
            uuid2: body.uuid2,
            private: body.private
        })
        return group;
    }catch(error){
        throw error
    }
}

async function fetchGroups(req){
    if(!['name', 'creator', 'uuid1', 'uuid2', 'private', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.sortby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const groups = await groupModel.Group.findAll({offset: skip, limit: limit, order: [[sortby, order]]});
        if(groups.length === 0){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Group records found on database')
        }else {
            console.log(`(${groups.length}) Group records found on database`);
        }
        return groups;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Group records found on database')
    }
}

async function findGroupsbyProperty(req, propertyName, propertyValue){
    if(!['name', 'creator', 'uuid1', 'uuid2', 'private', 'createdOn', undefined].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${propertyName}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var groups = [];
        var startDate;
        var endDate;
        switch(propertyName) {
            case 'name':
              groups = await groupModel.Group.findAll({where: { name: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'creator':
              groups = await groupModel.Group.findAll({where: { creator: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'uuid1':
              groups = await groupModel.Group.findAll({where: { uuid1: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'uuid2':
              groups = await groupModel.Group.findAll({where: { uuid2: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'private':
              groups = await groupModel.Group.findAll({where: { private: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'createdOn':
              endDate = new Date(new Date(propertyValue).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);
              groups = await groupModel.Group.findAll({where: { createdOn:{ [Op.lt]: endDate, [Op.gt]: startDate } }, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            default:
              groups = await groupModel.Group.findAll({where: { name: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
          }
          if(groups.length === 0){
            console.log(`Existing Group Records not found on database`);
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records (${propertyName}: ${propertyValue}) found on database`);
          }else{ console.log(`(${groups.length}) Existing Group Records [${propertyName}: ${propertyValue}] found on database`); }
        return groups;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records [${propertyName}: ${propertyValue}] found on database`)
    }
}

async function fetchGroupPages(req){
    if(req.query.page === undefined || "") throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid 'page' query provided (${req.query.page})`);
    if(!['name', 'creator', 'uuid1', 'uuid2', 'private', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.sortby}) provided.`);
    if(!['name', 'creator', 'uuid1', 'uuid2', 'private', 'createdOn', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.order}) provided.`);
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
              await groupModel.Group.findAndCountAll({where: { name: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Group records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`) });
              break;
            case 'creator':
             await groupModel.Group.findAndCountAll({where: { creator: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Group records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`) });
              break;
            case 'uuid1':
             await groupModel.Group.findAndCountAll({where: { uuid1: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Group records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`) });
              break;
            case 'uuid2':
             await groupModel.Group.findAndCountAll({where: { uuid2: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Group records found on database`)
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`) });
              break;
            case 'private':
             await groupModel.Group.findAndCountAll({where: { private: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Group records found on database`)
                
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`) });
              break;
            case 'createdOn':
              endDate = new Date(new Date(keyword).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);             
             await groupModel.Group.findAndCountAll({where: { createdOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Group records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`) });
               break;
            default:
             await groupModel.Group.findAndCountAll({offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Group records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Group Records found on database`)
    }
}


async function updateGroupbyID(id, req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    await exantUpdate(id, req.body.name)
    const group = await groupModel.Group.findOne({where: { id: id}});
    if(group === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Group Record (ID: ${id}) not found on database`)
    }else if(group) {
        console.log(`Existing Group Record found for ID: ${group.id}`);
        await group.update({
            name: req.body.name,
            creator: req.body.creator,
            uuid1: req.body.uuid1,
            uuid2: req.body.uuid2,
            private: req.body.private
        });
        await group.save();
        console.log(`Updated Existing Group Record (ID: ${group.id}) on database`);
    }
    return group;
}

async function deleteGroupbyID(id, req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const group = await groupModel.Group.findOne({where: { id: id}});
    if(group === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Group Record (ID: ${id}) not found on database`)
    }else if(group) {
        console.log(`Existing Group Record found for ID: ${group.id}`);
        await group.destroy();
        console.log(`Deleted Existing Group Record (ID: ${group.id}) on database`);
    }
    return group;
}

async function alreadyExists(name){
    let extant = false;
    const extantGroup = await groupModel.Group.findOne({where: {name: name} });
    if(extantGroup === null){
        console.log(`\nNo existing group record found for unique identifier: (${name})\n`);
    } else {
        extant = true;
        console.log(`\nExisiting group record found with unique identifier: (${name})\n`);
    }
    return extant;
}

async function exantUpdate(id, name){
    const group = await groupModel.Group.findOne({where: {name: name}});
    if(group && group.id != id){
        console.log(`Update blocked. Extant Group Record found with identifier: ${group.name}`);
        throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Update blocked. Extant Group Record found with identifier: ${group.name}`)
    }
}

async function exantBulkUpdate(name){
    const extantGroups = await groupModel.Group.findAll();
    for(let group in extantGroups){
        console.log(`Update blocked. Extant Group Record found with identifier: ${group.name}`);
        if(group.name == name){ throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 
            `Update blocked. Extant Group Record found with identifier: ${group.name}`);
        }
    }
}

async function bulkCreateGroups(req){
    if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    try{
        let groupDataPayload = [...req.body];
        for(let group in groupDataPayload){
            exantBulkUpdate(group.name);
        }
        const groups = await groupModel.Group.bulkCreate(groupDataPayload);
        return groups;
    }catch(error){
        throw error;
    }
}

async function bulkDeleteGroups(req){   
    try{
        if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const group = await groupModel.Group.destroy({ truncate: true });
        if(group < 1){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No exisitng Group Record found on database`)
        } else if (group > 0) console.log(`Bulk Deleted (${group}) Group Records from database`);
        return {action: 'bulkDelete', status: 'complete', entity: 'group', bulkDeleted: group}    
    }catch(error){
        throw error;
    }
}

const modelGServices = {
   findGroupbyID,
   findGroupNamebyID,
   findGroupsbyProperty,
   createGroup,
   fetchGroups,
   fetchGroupPages,
   updateGroupbyID,
   deleteGroupbyID,
   bulkCreateGroups,
   bulkDeleteGroups
}

module.exports = {modelGServices}