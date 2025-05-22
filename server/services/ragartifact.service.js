const status = require('http-status');
const jwt = require('jsonwebtoken');
const ragArtifactModel = require('../db_models/ragartifact.model');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { mjolnirTools } = require('../utils/mjolnir');

async function findRAGArtifactbyID(id, user){
    if(['guest'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const ragartifact = await ragArtifactModel.RAGArtifact.findOne({where: { id: id}, include: { all: true }});
    if(ragartifact === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing RAG Articact record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing RAG Articact record found for ID: ${ragartifact.id}`);
    }
    return ragartifact;
}

async function findRAGArtifactsbyContextID(id, user){
    if(['guest'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const ragartifacts = await ragArtifactModel.RAGArtifact.findAll({where: { contextId: id}, include: { all: true }});
    if(ragartifacts.length === 0){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing RAG Articact records (groupId: ${id}) not found on database`)
    }else {
        console.log(`Existing RAG Articact records found for (contextId: ${id})`);
    }
    return ragartifacts;
}

async function findRAGArtifactsbyQueryID(id, user){
    if(['guest'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const ragartifacts = await ragArtifactModel.RAGArtifact.findAll({where: { queryId: id}, include: { all: true }});
    if(ragartifacts.length === 0){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing RAG Articact records (lockerId: ${id}) not found on database`)
    }else {
        console.log(`Existing RAG Articact records found for (queryId: ${id})`);
    }
    return ragartifacts;
}

async function createRAGArtifact(req){
    try{
        if(await alreadyExists(req.body.name)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that RAG Artifact name is already taken');
        const ragartifact = await ragArtifactModel.RAGArtifact.create({
            name: req.body.name,
            contextId: req.body.groupId,
            queryId: req.body.lockerId,
            userId: req.user.id || req.body.userId,
            synopsis: req.body.synopsis,
            response: req.body.response
        })
        return ragartifact;
    }catch(error){
        throw error
    }
}

async function fetchRAGArtifacts(req){
    if(!['name', 'synopsis', 'response', 'contextId', 'queryId', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.sortby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const ragartifacts = await ragArtifactModel.RAGArtifact.findAll({include: { all: true }, offset: skip, limit: limit, order: [[sortby, order]]});
        if(ragartifacts === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No RAG Artifact records found on database')
        }else {
            console.log(`(${ragartifacts.length}) RAG Artifact records found on database`);
        }
        return ragartifacts;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No RAG Articact records found on database')
    }
}

async function findRAGArtifactsbyProperty(req, propertyName, propertyValue){
    if(!['name', 'synopsis', 'response', 'contextId', 'queryId', 'createdOn',].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${propertyName}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var ragartifacts = []
        switch(propertyName) {
            case 'name':
              ragartifacts = await ragArtifactModel.RAGArtifact.findAll({where: { name: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]} );
              break;
            case 'contextId':
              ragartifacts = await ragArtifactModel.RAGArtifact.findAll({where: { contexId: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'queryId':
              ragartifacts = await ragArtifactModel.RAGArtifact.findAll({where: { queryId: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            default:
              ragartifacts = await ragArtifactModel.RAGArtifact.findAll({where: { name: propertyValue}, 
                include: { all: true}, offset: skip, limit: limit, order: [[sortby, order]]});
          }
          if(ragartifacts.length === 0){
            console.log(`Existing RAG Artifact records not found on database`);
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records (${propertyName}: ${propertyValue}) found on database`);
          }else{ console.log(`(${ragartifacts.length}) Existing RAG Artifact Records [${propertyName}: ${propertyValue}] found on database`); }
        return ragartifacts;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact Records [${propertyName}: ${propertyValue}] found on database`)
    }
}

async function fetchRAGArtifactPages(req){
    if(req.query.page === undefined) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid 'page' query provided (${req.query.page})`);
    if(!['name', 'synopsis', 'response', 'contextId', 'queryId', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.sortby}) provided.`);
    if(!['name', 'synopsis', 'response', 'contextId', 'queryId', 'createdOn', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid RAG Artifact propertyName (${req.query.filterby}) provided.`);
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
              await ragArtifactModel.RAGArtifact.findAndCountAll({include: { all: true }, where: { name: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} RAG Artifact records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`) });
              break;
            case 'contextId':
             await ragArtifactModel.RAGArtifact.findAndCountAll({include: { all: true }, where: { contextId: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} RAG Artifact records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`) });
              break;
            case 'queryId':
             await ragArtifactModel.RAGArtifact.findAndCountAll({include: { all: true }, where: { queryId: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} RAG Artifact records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`) });
              break;
              default:
             await ragArtifactModel.RAGArtifact.findAndCountAll({include: { all: true }, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} RAG Artifact records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No RAG Artifact records found on database | ${error.message}`)
    }
}

async function updateRAGArtifactbyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    await exantUpdate(id, req.body.name)
    const ragartifact = await ragArtifactModel.RAGArtifact.findOne({where: { id: id}});
    if(ragartifact === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing RAG Artifact record (ID: ${id}) not found on database`)
    }else if(ragartifact) {
        console.log(`Existing RAG Artifact record found for ID: ${ragartifact.id}`);
        await ragartifact.update({
            name: req.body.name,
            contextId: ragartifact.contextId,
            queryId: ragartifact.queryId,  
            synopsis: req.body.synopsis,
            response: req.body.response
        });
        await ragartifact.save();
        console.log(`Updated Existing RAG Artifact record (ID: ${ragartifact.id}) on database`);
    }
    return ragartifact;
}

async function deleteRAGArtifactbyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const ragartifact = await ragArtifactModel.RAGArtifact.findOne({where: { id: id}, include: { all: true}});
    if(ragartifact === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing RAG Artifact record (ID: ${id}) not found on database`)
    }else if(ragartifact) {
        console.log(`Existing RAG Artifact record found for ID: ${ragartifact.id}`);
        await ragartifact.destroy();
        console.log(`Updated Existing RAG Artifact record (ID: ${ragartifact.id}) on database`);
    }
    return ragartifact;
}

async function exantUpdate(id, name){
    const ragartifact = await ragArtifactModel.RAGArtifact.findOne({where: {name: name}});
    if(ragartifact && ragartifact.id != id){
        console.log(`Update blocked. Extant RAG Artifact record found with identifier: ${ragartifact.name}`);
        throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Update blocked. Extant RAG Artifact record found with identifier: ${ragartifact.name}`);
    }
}

async function exantBulkUpdate(name){
    const extantRAGArtifacts = await ragArtifactModel.RAGArtifact.findAll();
    for(let ragartifact in extantRAGArtifacts){
        console.log(`Update blocked. Extant RAG Artifact record found with identifier: ${ragartifact.name}`);
        if(ragartifact.name == name){ throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 
            `Update blocked. Extant RAG Artifact record found with identifier: ${ragartifact.name}`);
        }
    }
}

async function bulkCreateRAGArtifacts(req){
    if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    try{
        let ragartifactsDataPayload = [...req.body];
        for(let ragartifact in ragartifactsDataPayload){
            exantBulkUpdate(ragartifact.name);
        }
        const ragartifacts = await ragArtifactModel.RAGArtifact.bulkCreate(ragartifactsDataPayload);
        return ragartifacts;
    }catch(error){
        throw error;
    }
}

async function bulkDeleteRAGArtifacts(req){   
    try{
        if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const ragartifacts = await ragArtifactModel.RAGArtifact.destroy({ truncate: true });
        if(ragartifacts < 1){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No exisitng RAG Artifact record found on database`)
        } else if (ragartifacts > 0) console.log(`Bulk Deleted (${ragartifacts}) RAG Artifact records from database`);
        return {action: 'bulkDelete', status: 'complete', entity: 'RAG Artifacts', bulkDeleted: ragartifacts}    
    }catch(error){
        throw error;
    }
}


async function alreadyExists(name){
    let extant = false;
    const extantRAGArtifact = await ragArtifactModel.RAGArtifact.findOne({where: {name: name} });
    if(extantRAGArtifact === null){
        console.log(`\nNo existing RAG Artifact record found for unique identifier: (${name})\n`);
    } else {
        extant = true;
        console.log(`\nExisiting RAG Artifact record found with unique identifier: (${name})\n`);
    }
    return extant;
}

const ragArtifactServices = {
   findRAGArtifactbyID,
   findRAGArtifactsbyContextID,
   findRAGArtifactsbyQueryID,
   findRAGArtifactsbyProperty,
   createRAGArtifact,
   fetchRAGArtifacts,
   fetchRAGArtifactPages,
   updateRAGArtifactbyID,
   deleteRAGArtifactbyID,
   bulkCreateRAGArtifacts,
   bulkDeleteRAGArtifacts
}

module.exports = {ragArtifactServices};