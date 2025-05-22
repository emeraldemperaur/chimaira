const status = require('http-status');
const jwt = require('jsonwebtoken');
const queryModelDB = require('../db_models/querymodel.model');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { mjolnirTools } = require('../utils/mjolnir');
const { chronosTools } = require('../utils/chronos');

async function findQueryModelbyID(id, user){
    if(['guest'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const querymodel = await queryModelDB.QueryModel.findOne({where: { id: id}});
    if(querymodel === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Query Model record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Locker Record found for ID: ${querymodel.id}`);
    }
    return querymodel;
}

async function findQueryModelNamebyID(id){
    const querymodel = await queryModelDB.QueryModel.findOne({where: { id: id}});
    if(querymodel === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Query Model record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Query Model record found for ID: ${querymodel.id}`);
    }
    return querymodel.name;
}


async function createQueryModel(req){
    try{
        if(await alreadyExists(req.body.name)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that query model name is already taken');
        
        const querymodel = await queryModelDB.QueryModel.create({
            name: req.body.name,
            type: req.body.type,
            tags: req.body.tags,
            jsonQueryDefinition: req.body.jsonQueryDefinition,
            createdOn: chronosTools.getDateTime(),
            userId: req.user.id
        })
        return querymodel;
    }catch(error){
        throw error
    }
}

async function fetchQueryModels(req){
    if(!['name', 'type', 'tags', 'isEdited', 'editedBy', 'editedOn', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${req.query.sortby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const querymodel = await queryModelDB.QueryModel.findAll({offset: skip, limit: limit, order: [[sortby, order]]});
        if(querymodel === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Query Model records found on database')
        }else {
            console.log(`(${querymodel.length}) Query Model records found on database`);
        }
        return querymodel;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Query Model records found on database')
    }
}

async function findQueryModelsbyProperty(req, propertyName, propertyValue){
    if(!['name', 'type', 'tags', 'isEdited', 'editedBy', 'editedOn', 'createdOn'].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Locker propertyName (${propertyName}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Query Model propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var querymodels = [];
        var startDate;
        var endDate;
        switch(propertyName) {
            case 'name':
              querymodels = await queryModelDB.QueryModel.findAll({where: { name: propertyValue}});
              break;
            case 'type':
              querymodels = await queryModelDB.QueryModel.findAll({where: { type: propertyValue}});
              break;
            case 'tags':
              querymodels = await queryModelDB.QueryModel.findAll({where: { tags: propertyValue}});
              break;
            case 'isEdited':
              querymodels = await queryModelDB.QueryModel.findAll({where: { isEdited: propertyValue}});
              break;
            case 'editedBy':
              querymodels = await queryModelDB.QueryModel.findAll({where: { editedBy: propertyValue}});
              break;
            case 'editedOn':
              endDate = new Date(new Date(propertyValue).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);
              querymodels = await queryModelDB.QueryModel.findAll({where: { editedOn:{ [Op.lt]: endDate, [Op.gt]: startDate } }});
              break;
            case 'createdOn':
              endDate = new Date(new Date(propertyValue).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);
              querymodels = await queryModelDB.QueryModel.findAll({where: { createdOn:{ [Op.lt]: endDate, [Op.gt]: startDate } }});
              break;
            default:
              querymodels = await queryModelDB.QueryModel.findAll({where: { name: propertyValue}});
          }
          if(querymodels.length === 0){
            console.log(`Existing Query Model records not found on database`);
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records (${propertyName}: ${propertyValue}) found on database`);
          }else{ console.log(`(${querymodels.length}) Existing Query Model records [${propertyName}: ${propertyValue}] found on database`); }
        return querymodels;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records [${propertyName}: ${propertyValue}] found on database`)
    }
}

async function fetchQueryModelPages(req){
    if(req.query.page === undefined) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid 'page' query provided (${req.query.page})`);
    if(!['name', 'type', 'tags', 'isEdited', 'editedBy', 'editedOn', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Query Model propertyName (${req.query.sortby}) provided.`);
    if(!['name', 'type', 'tags', 'isEdited', 'editedBy', 'editedOn', 'createdOn', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Query Model propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Query Model propertyName (${req.query.order}) provided.`);
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
              await queryModelDB.QueryModel.findAndCountAll({where: { name: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
              break;
            case 'type':
             await queryModelDB.QueryModel.findAndCountAll({where: { type: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
              break;
            case 'tags':
             await queryModelDB.QueryModel.findAndCountAll({where: { tags: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
              break;
            case 'isEdited':
             await queryModelDB.QueryModel.findAndCountAll({where: { isEdited: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`)
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
              break;
            case 'editedBy':
             await queryModelDB.QueryModel.findAndCountAll({where: { editedBy: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`)
                
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
              break;
            case 'editedOn':
              endDate = new Date(new Date(keyword).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);             
             await queryModelDB.QueryModel.findAndCountAll({where: { editedOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
               break;
            case 'createdOn':
              endDate = new Date(new Date(keyword).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);             
             await queryModelDB.QueryModel.findAndCountAll({where: { createdOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
               break;
            default:
             await queryModelDB.QueryModel.findAndCountAll({offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Query Model records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Query Model records found on database | (${error.message})`)
    }
}


async function updateQueryModelbyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    await exantUpdate(id, req.body.name)
    const querymodel = await queryModelDB.QueryModel.findOne({where: { id: id}});
    if(querymodel === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Query Model record (ID: ${id}) not found on database`)
    }else if(querymodel) {
        console.log(`Existing Query Model record found for ID: ${locker.id}`);
        await querymodel.update({
            name: body.name,
            type: body.type,
            tags: body.tags,
            jsonQueryDefinition: body.jsonQueryDefinition,
            isEdited: body.isEdited,
            editedBy: req.user.id,
            editedOn: chronosTools.getDateTime(),
            createdOn: querymodel.createdOn
        });
        await querymodel.save();
        console.log(`Updated Existing Query Model record (ID: ${locker.id}) on database`);
    }
    return querymodel;
}

async function deleteQueryModelbyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const querymodel = await queryModelDB.QueryModel.findOne({where: { id: id}});
    if(querymodel === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Query Model record (ID: ${id}) not found on database`)
    }else if(querymodel) {
        console.log(`Existing Query Model record found for ID: ${querymodel.id}`);
        await querymodel.destroy();
        console.log(`Deleted Existing Query Model record (ID: ${querymodel.id}) on database`);
    }
    return locker;
}

async function exantUpdate(id, name){
    const querymodel = await queryModelDB.QueryModel.findOne({where: {name: name}});
    if(querymodel && querymodel.id != id){
        console.log(`Update blocked. Extant Query Model record found with identifier: ${querymodel.name}`);
        throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Update blocked. Extant Query Model record found with identifier: ${querymodel.name}`)
    }
}

async function exantBulkUpdate(name){
    const extantQueryModel = await queryModelDB.QueryModel.findAll();
    for(let querymodel in extantQueryModel){
        console.log(`Update blocked. Extant Query Model record found with identifier: ${querymodel.name}`);
        if(querymodel.name == name){ throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 
            `Update blocked. Extant Query Model record found with identifier: ${querymodel.name}`);
        }
    }
}

async function bulkCreateQueryModels(req){
    if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    try{
        let querymodelDataPayload = [...req.body];
        for(let querymodel in querymodelDataPayload){
            exantBulkUpdate(querymodel.name);
        }
        const querymodels = await queryModelDB.QueryModel.bulkCreate(querymodelDataPayload);
        return querymodels;
    }catch(error){
        throw error;
    }
}

async function bulkDeleteQueryModels(req){   
    try{
        if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const querymodel = await queryModelDB.QueryModel.destroy({ truncate: true });
        if(querymodel < 1){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No exisitng Query Model record found on database`)
        } else if (querymodel > 0) console.log(`Bulk Deleted (${querymodel}) Query Model records from database`);
        return {action: 'bulkDelete', status: 'complete', entity: 'Query Model', bulkDeleted: querymodel}    
    }catch(error){
        throw error;
    }
}


async function alreadyExists(name){
    let extant = false;
const extantQueryModel = await queryModelDB.QueryModel.findOne({where: {name: name} });
    if(extantQueryModel === null){
        console.log(`\nNo existing query model record found for unique identifier: (${name})\n`);
    } else {
        extant = true;
        console.log(`\nExisiting query model record found with unique identifier: (${name})\n`);
    }
    return extant;
}

const queryModelServices = {
   findQueryModelbyID,
   createQueryModel,
   fetchQueryModels,
   fetchQueryModelPages,
   findQueryModelsbyProperty,
   findQueryModelNamebyID,
   updateQueryModelbyID,
   deleteQueryModelbyID,
   bulkCreateQueryModels,
   bulkDeleteQueryModels

}

module.exports = {queryModelServices};