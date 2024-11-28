const status = require('http-status');
const jwt = require('jsonwebtoken');
const groupModel = require('../db_models/entitymodelG');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

async function findGroupbyID(id){
    const group = await groupModel.Group.findOne({where: { id: id}});
    if(group === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing Group Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing Group Record found for ID: ${group.id}`);
    }
    return group;
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
const modelGServices = {
   findGroupbyID,
   createGroup,
   fetchGroups
}

module.exports = {modelGServices}