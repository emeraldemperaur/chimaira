const status = require('http-status');
const jwt = require('jsonwebtoken');
const groupModel = require('../db_models/entitymodelG');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const e = require('express');

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

async function fetchGroups(){
    try{
        const groups = await groupModel.Group.findAll();
        if(groups === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Group records found on database')
        }else {
            console.log(`(${groups.length}) Group records found on database`);
        }
        return groups;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'No Group records found on database')
    }
}

async function findGroupsbyProperty(propertyName, propertyValue, user){
    if(!['name', 'creator', 'uuid1', 'uuid2', 'private', 'createdOn'].includes(propertyName)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid Group propertyName (${propertyName}) provided.`)
    try{
        if(['unauthorizedrolename'].includes(user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        var groups = [];
        var startDate;
        var endDate;
        switch(propertyName) {
            case 'name':
              groups = await groupModel.Group.findAll({where: { name: propertyValue}});
              break;
            case 'creator':
              groups = await groupModel.Group.findAll({where: { creator: propertyValue}});
              break;
            case 'uuid1':
              groups = await groupModel.Group.findAll({where: { uuid1: propertyValue}});
              break;
            case 'uuid2':
              groups = await groupModel.Group.findAll({where: { uuid2: propertyValue}});
              break;
            case 'private':
              groups = await groupModel.Group.findAll({where: { private: propertyValue}});
              break;
            case 'createdOn':
              endDate = new Date(new Date(propertyValue).toISOString());
              endDate.setDate(endDate.getDate() + 1);
              startDate = new Date(endDate.getDate() - 1);
              groups = await groupModel.Group.findAll({where: { createdOn:{ [Op.lt]: endDate, [Op.gt]: startDate } }});
              break;
            default:
              groups = await groupModel.Group.findAll({where: { name: propertyValue}});
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

const modelGServices = {
   findGroupbyID,
   findGroupNamebyID,
   findGroupsbyProperty,
   createGroup,
   fetchGroups,
   updateGroupbyID,
   deleteGroupbyID
}

module.exports = {modelGServices}