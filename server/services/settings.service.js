const status = require('http-status');
const jwt = require('jsonwebtoken');
const configurationModel = require('../db_models/settings.model');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { mjolnirTools } = require('../utils/mjolnir');

async function findConfigurationbyID(id, user){
    if(['guest'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const configuration = await configurationModel.Setting.findOne({where: { id: id}, include: { all: true }});
    if(configuration === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Configuration profile (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Configuration profile found for ID: ${configuration.id}`);
    }
    return configuration;
}


async function createConfiguration(req){
    try{
        if(await alreadyExists(req.body.name)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that RAG Artifact name is already taken');
        const configuration = await configurationModel.Setting.create({
            name: req.body.name,
            provider: req.body.provider,
            key: req.body.key,  
            sourceUrl: req.body.sourceUrl,
            userId: req.user.id
        })
        return configuration;
    }catch(error){
        throw error
    }
}

async function fetchConfigurations(req){
    if(!['id', 'name', 'provider', 'key', 'sourceUrl', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.sortby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Configuration profile propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const configurations = await configurationModel.Setting.findAll({include: { all: true }, offset: skip, limit: limit, order: [[sortby, order]]});
        if(configurations === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Configuration profiles found on database')
        }else {
            console.log(`(${configurations.length}) Configuration profiles found on database`);
        }
        return configurations;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Configuration profiles found on database')
    }
}

async function findConfigurationsbyProperty(req, propertyName, propertyValue){
    if(!['id', 'name', 'provider', 'key', 'sourceUrl', 'createdOn', undefined].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${propertyName}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Configuration profile propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var configurations = []
        switch(propertyName) {
            case 'name':
              configurations = await configurationModel.Setting.findAll({where: { name: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]} );
              break;
            case 'provider':
              configurations = await configurationModel.Setting.findAll({where: { provider: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'key':
              configurations = await configurationModel.Setting.findAll({where: { key: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'sourceUrl':
              configurations = await configurationModel.Setting.findAll({where: { sourceUrl: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'createdOn':
              configurations = await configurationModel.Setting.findAll({where: { createdOn: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            default:
              configurations = await configurationModel.Setting.findAll({where: { name: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
          }
          if(configurations.length === 0){
            console.log(`Existing Configuration profiles not found on database`);
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles (${propertyName}: ${propertyValue}) found on database`);
          }else{ console.log(`(${configurations.length}) Existing Configuration profiles [${propertyName}: ${propertyValue}] found on database`); }
        return configurations;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles [${propertyName}: ${propertyValue}] found on database`)
    }
}

async function fetchConfigurationPages(req){
    if(req.query.page === undefined) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid 'page' query provided (${req.query.page})`);
    if(!['id', 'name', 'provider', 'key', 'sourceUrl', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.sortby}) provided.`);
    if(!['id', 'name', 'provider', 'key', 'sourceUrl','createdOn', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.order}) provided.`);
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
              await configurationModel.Setting.findAndCountAll({include: { all: true }, where: { name: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Configuration profiles found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`) });
              break;
            case 'provider':
             await configurationModel.Setting.findAndCountAll({include: { all: true }, where: { provider: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Configuration profiles found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`) });
              break;
            case 'key':
             await configurationModel.Setting.findAndCountAll({include: { all: true }, where: { key: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Configuration profiles found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`) });
              break;
            case 'sourceUrl':
             await configurationModel.Setting.findAndCountAll({include: { all: true }, where: { sourceUrl: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Configuration profiles found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`) });
              break;
            case 'createdOn':
                 endDate = new Date(new Date(keyword).toISOString());
                 endDate.setDate(endDate.getDate() + 1);
                 startDate = new Date(endDate.getDate() - 1);             
                 await configurationModel.Setting.findAndCountAll({where: { createdOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, offset: offset, limit: limit, order: [[sortby, order]]})
                 .then(async (resultData) => {
                       if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`);
                            dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                            console.log(`${resultData.count} Configuration profiles found on database`);
                        })
                 .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`) });
                           break;
              default:
             await configurationModel.Setting.findAndCountAll({include: { all: true }, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Configuration profiles found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Configuration profiles found on database | ${error.message}`)
    }
}

async function updateConfigurationbyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    await exantUpdate(id, req.body.name)
    const configuration = await configurationModel.Setting.findOne({where: { id: id}});
    if(configuration === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Configuration profile (ID: ${id}) not found on database`)
    }else if(configuration) {
        console.log(`Existing Configuration profile found for ID: ${configuration.id}`);
        await configuration.update({
            name: req.body.name,
            provider: req.body.provider,
            key: req.body.key,  
            sourceUrl: req.body.sourceUrl
        });
        await configuration.save();
        console.log(`Updated Existing Configuration profile (ID: ${configuration.id}) on database`);
    }
    return configuration;
}

async function deleteConfigurationbyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const configuration = await configurationModel.Setting.findOne({where: { id: id}, include: { all: true}});
    if(configuration === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Configuration profile (ID: ${id}) not found on database`)
    }else if(configuration) {
        console.log(`Existing Configuration profile found for ID: ${configuration.id}`);
        await configuration.destroy();
        console.log(`Deleted Existing Configuration profile (ID: ${configuration.id}) on database`);
    }
    return configuration;
}

async function exantUpdate(id, name){
    const configuration = await configurationModel.Setting.findOne({where: {name: name}});
    if(configuration && configuration.id != id){
        console.log(`Update blocked. Configuration profile found with identifier: ${configuration.name}`);
        throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Update blocked. Extant Configuration profile found with identifier: ${ragartifact.name}`);
    }
}

async function exantBulkUpdate(name){
    const extantConfigurations = await configurationModel.Setting.findAll();
    for(let configuration in extantConfigurations){
        console.log(`Update blocked. Extant Configuration profile found with identifier: ${configuration.name}`);
        if(configuration.name == name){ throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 
            `Update blocked. Extant Configuration profile found with identifier: ${configuration.name}`);
        }
    }
}

async function bulkCreateConfigurations(req){
    if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    try{
        let configurationsDataPayload = [...req.body];
        for(let configuration in configurationsDataPayload){
            exantBulkUpdate(configuration.name);
        }
        const configurations = await configurationModel.Setting.bulkCreate(configurationsDataPayload);
        return configurations;
    }catch(error){
        throw error;
    }
}

async function bulkDeleteConfigurations(req){   
    try{
        if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const configurations = await configurationModel.Setting.destroy({ truncate: true });
        if(configurations < 1){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No exisitng Configuration profiles found on database`)
        } else if (configurations > 0) console.log(`Bulk Deleted (${configurations}) Configuration profiles from database`);
        return {action: 'bulkDelete', status: 'complete', entity: 'Configurations', bulkDeleted: configurations}    
    }catch(error){
        throw error;
    }
}


async function alreadyExists(name){
    let extant = false;
    const configuration = await configurationModel.Setting.findOne({where: {name: name} });
    if(configuration === null){
        console.log(`\nNo existing Configuration profile found for unique identifier: (${name})\n`);
    } else {
        extant = true;
        console.log(`\nExisiting Configuration profile found with unique identifier: (${name})\n`);
    }
    return extant;
}

const configurationServices = {
   findConfigurationbyID,
   findConfigurationsbyProperty,
   createConfiguration,
   fetchConfigurations,
   fetchConfigurationPages,
   updateConfigurationbyID,
   deleteConfigurationbyID,
   bulkCreateConfigurations,
   bulkDeleteConfigurations
}

module.exports = {configurationServices};