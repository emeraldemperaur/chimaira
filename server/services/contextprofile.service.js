const status = require('http-status');
const jwt = require('jsonwebtoken');
const contextProfileModel = require('../db_models/contextprofile.model');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const e = require('express');
const { mjolnirTools } = require('../utils/mjolnir');
const { chronosTools } = require('../utils/chronos');

async function findContextProfilebyID(id, user){
    if(['guest'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const contextProfile = await contextProfileModel.ContextProfile.findOne({where: { id: id}});
    if(contextProfile === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Context Profile record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Context Profile found for ID: ${contextProfile.id}`);
    }
    return contextProfile;
}

async function findContextProfileNamebyID(id){
    const contextProfile = await contextProfileModel.ContextProfile.findOne({where: { id: id}});
    if(contextProfile === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Context Profile record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Context Profile Record found for ID: ${contextProfile.id}`);
    }
    return contextProfile.name;
}

async function createContextProfile(body){
    try{
        if(await alreadyExists(body.name)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 'Sorry that Context Profile name is already taken');
        const contextProfile = await contextProfileModel.ContextProfile.create({
            name: body.name,
            prologue: body.prolgue,
            documentUrl: body.documentUrl,
            targetUrl: body.targetUrl,
            codeSnippet: body.codeSnippet,
            isQueryCommand: body.isQueryCommand,
            queryCommand: queryCommand,
            createdOn: Date.now()
        })
        return contextProfile;
    }catch(error){
        throw error
    }
}

async function fetchContextProfiles(req){
    if(!['id', 'name', 'prologue', 'documentUrl', 'targetUrl', 'isQueryCommand', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Context Profile propertyName (${req.query.sortby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Context Profile propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const contextProfile = await contextProfileModel.ContextProfile.findAll({offset: skip, limit: limit, order: [[sortby, order]]});
        if(contextProfile.length === 0){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Context Profile records found on database')
        }else {
            console.log(`(${contextProfile.length}) Context Profile records found on database`);
        }
        return contextProfile;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Context Profile records found on database')
    }
}

async function findContextProfilesbyProperty(req, propertyName, propertyValue){
    if(!['id', 'name', 'prologue', 'documentUrl', 'targetUrl', 'isQueryCommand', 'createdOn', undefined].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${propertyName}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Context Profile propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var contextProfiles = [];
        var startDate;
        var endDate;
        switch(propertyName) {
            case 'name':
              contextProfiles = await contextProfileModel.ContextProfile.findAll({where: { name: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'prologue':
              contextProfiles = await contextProfileModel.ContextProfile.findAll({where: { prologue: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'documentUrl':
              contextProfiles = await contextProfileModel.ContextProfile.findAll({where: { documentUrl: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'targetUrl':
              contextProfiles = await contextProfileModel.ContextProfile.findAll({where: { targetUrl: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'isQueryCommand':
              contextProfiles = await contextProfileModel.ContextProfile.findAll({where: { isQueryCommand: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            case 'createdOn':
              endDate = new Date(new Date(propertyValue).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);
              contextProfiles = await contextProfileModel.ContextProfile.findAll({where: { createdOn:{ [Op.lt]: endDate, [Op.gt]: startDate } }, offset: skip, limit: limit, order: [[sortby, order]]});
              break;
            default:
              contextProfiles = await contextProfileModel.ContextProfile.findAll({where: { name: propertyValue}, offset: skip, limit: limit, order: [[sortby, order]]});
          }
          if(contextProfiles.length === 0){
            console.log(`Existing Context Profile Records not found on database`);
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records (${propertyName}: ${propertyValue}) found on database`);
          }else{ console.log(`(${groups.length}) Existing Context Profile records [${propertyName}: ${propertyValue}] found on database`); }
        return contextProfiles;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records [${propertyName}: ${propertyValue}] found on database`)
    }
}

async function fetchContextProfilePages(req){
    if(req.query.page === undefined || "") throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid 'page' query provided (${req.query.page})`);
    if(!['id', 'name', 'prologue', 'documentUrl', 'targetUrl', 'isQueryCommand', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Context Profile propertyName (${req.query.sortby}) provided.`);
    if(!['id', 'name', 'prologue', 'documentUrl', 'targetUrl', 'isQueryCommand', 'createdOn', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Context Profile propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Context Profile propertyName (${req.query.order}) provided.`);
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
              await contextProfileModel.ContextProfile.findAndCountAll({where: { name: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Context Profile records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`) });
              break;
            case 'prologue':
             await contextProfileModel.ContextProfile.findAndCountAll({where: { prologue: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Context Profile records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`) });
              break;
            case 'documentUrl':
             await contextProfileModel.ContextProfile.findAndCountAll({where: { documentUrl: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Context Profile records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`) });
              break;
            case 'targetUrl':
             await contextProfileModel.ContextProfile.findAndCountAll({where: { targetUrl: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Context Profile records found on database`)
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`) });
              break;
            case 'isQueryCommand':
             await contextProfileModel.ContextProfile.findAndCountAll({where: { isQueryCommand: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Context Profile records found on database`)
                
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`) });
              break;
            case 'createdOn':
              endDate = new Date(new Date(keyword).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);             
             await contextProfileModel.ContextProfile.findAndCountAll({where: { createdOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Context Profile records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`) });
               break;
            default:
             await contextProfileModel.ContextProfile.findAndCountAll({offset: offset, limit: limit, order: [[sortby, order]]})
              .then(async (resultData) => {
                if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`);
                dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                console.log(`${resultData.count} Context Profile records found on database`);
              })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No Context Profile records found on database`)
    }
}


async function updateContextProfilebyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    await exantUpdate(id, req.body.name);
    const contextProfile = await contextProfileModel.ContextProfile.findOne({where: { id: id}});
    if(contextProfile === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Context Profile record (ID: ${id}) not found on database`)
    }else if(contextProfile) {
        console.log(`Existing Context Profile record found for ID: ${contextProfile.id}`);
        await contextProfile.update({
            name: body.name,
            prologue: body.prolgue,
            documentUrl: body.documentUrl,
            targetUrl: body.targetUrl,
            codeSnippet: body.codeSnippet,
            isQueryCommand: body.isQueryCommand,
            queryCommand: queryCommand,
            createdOn: chronosTools.getDateTime() 
        });
        await contextProfile.save();
        console.log(`Updated Existing Context Profile record (ID: ${group.id}) on database`);
    }
    return contextProfile;
}

async function deleteContextProfilebyID(id, req){
    if(['guest'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    const contextProfile = await contextProfileModel.ContextProfile.findOne({where: { id: id}});
    if(contextProfile === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Context Profile record (ID: ${id}) not found on database`)
    }else if(contextProfile) {
        console.log(`Existing Context Profile record found for ID: ${contextProfile.id}`);
        await contextProfile.destroy();
        console.log(`Deleted Existing Context Profile (ID: ${contextProfile.id}) on database`);
    }
    return contextProfile;
}

async function alreadyExists(name){
    let extant = false;
    const extantContext = await contextProfileModel.ContextProfile.findOne({where: {name: name} });
    if(extantContext === null){
        console.log(`\nNo existing Context Profile record found for unique identifier: (${name})\n`);
    } else {
        extant = true;
        console.log(`\nExisiting Context Profile record found with unique identifier: (${name})\n`);
    }
    return extant;
}

async function exantUpdate(id, name){
    const contextProfile = await contextProfileModel.ContextProfile.findOne({where: {name: name}});
    if(contextProfile && contextProfile.id != id){
        console.log(`Update blocked. Extant Context Profile record found with identifier: ${contextProfile.name}`);
        throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Update blocked. Extant Context Profile record found with identifier: ${contextProfile.name}`)
    }
}

async function exantBulkUpdate(name){
    const extantContexts = await groupModel.Group.findAll();
    for(let context in extantContexts){
        console.log(`Update blocked. Extant Context Profile record found with identifier: ${context.name}`);
        if(context.name == name){ throw new apiErrors.ApiError(HttpStatusCode.BadRequest, 
            `Update blocked. Extant Context Profile record found with identifier: ${context.name}`);
        }
    }
}

async function bulkCreateContextProfiles(req){
    if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
    try{
        let contextProfileDataPayload = [...req.body];
        for(let contextProfile in contextProfileDataPayload){
            exantBulkUpdate(contextProfile.name);
        }
        const context = await contextProfileModel.ContextProfile.bulkCreate(contextProfileDataPayload);
        return context;
    }catch(error){
        throw error;
    }
}

async function bulkDeleteContextProfiles(req){   
    try{
        if(['guest', 'user'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const contexts = await contextProfileModel.ContextProfile.destroy({ truncate: true });
        if(contexts < 1){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No exisitng Context Profile records found on database`)
        } else if (group > 0) console.log(`Bulk Deleted (${group}) Context Profile records from database`);
        return {action: 'bulkDelete', status: 'complete', entity: 'Context Profile', bulkDeleted: group}    
    }catch(error){
        throw error;
    }
}

const contextProfileServices = {
   findContextProfilebyID,
   findContextProfileNamebyID,
   findContextProfilesbyProperty,
   createContextProfile,
   fetchContextProfiles,
   fetchContextProfilePages,
   updateContextProfilebyID,
   deleteContextProfilebyID,
   bulkCreateContextProfiles,
   bulkDeleteContextProfiles
}

module.exports = {contextProfileServices}