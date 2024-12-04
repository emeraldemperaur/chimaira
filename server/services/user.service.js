const status = require('http-status');
const jwt = require('jsonwebtoken');
const userModel = require('../db_models/user');
const { apiErrors } = require('../middleware/apiError');
const { HttpStatusCode } = require('axios');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { mjolnirTools } = require('../utils/mjolnir');



async function findUserbyUUID(uuid){
    const user = await userModel.User.findOne({where: {[Op.or]: [{email: uuid}, {uuid: uuid}]}});
    if (user === null){
        throw new Error(`UUID: ${uuid} not found on database`);
    }else {
        console.log(`Existing User record found with unique identifier: ${user.email} `)
    }
    return user;
}

async function findUserbyID(id){
    const user = await userModel.User.findOne({where: { id: id}});
    if(user === null){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing User Record (ID: ${id}) not found on database`)
    }else {
        console.log(`Existing User Record found for ID: ${user.id}`);
    }
    return user;
}

async function fetchAllUserProfiles(req){
    if(!['id', 'email', 'firstName', 'lastName', 'uuid', 'role', 'verified', 'createdOn', undefined]
        .includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid User Profile propertyName (${req.query.sortby}) provided.`);
    if(!['id', 'email', 'firstName', 'lastName', 'uuid', 'role', 'verified', 'createdOn', undefined]
        .includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid User Profile propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined]
        .includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid User Profile propertyName (${req.query.order}) provided.`);
    const sortby = req.query.sortby || 'id';
    const order = req.query.order || 'DESC';
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    try{
        const users = await userModel.User.findAll({offset: skip, limit: limit, order: [[sortby, order]]});
        if(users.length === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile records found on database`);
        else console.log(`(${users.length}) User Profile records found on database`);
        return users;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile records found on database`)
    }
}

async function fetchUserProfilePages(req){
    if(!['id', 'email', 'firstName', 'lastName', 'uuid', 'role', 'verified', 'createdOn', undefined].includes(req.query.sortby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroup propertyName (${req.query.sortby}) provided.`);
    if(!['id', 'email', 'firstName', 'lastName', 'uuid', 'role', 'verified', 'createdOn', undefined].includes(req.query.filterby)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid LockerGroup propertyName (${req.query.filterby}) provided.`);
    if(!['ASC', 'DESC', undefined].includes(req.query.order)) throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Invalid User Profile propertyName (${req.query.order}) provided.`);
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
            case 'email':
                await userModel.User.findAndCountAll({include: { all: true }, where: { email: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
              .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
              break;
            case 'firstName':
                await userModel.User.findAndCountAll({include: { all: true }, where: { firstName: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
                .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
              break;
            case 'lastName':
                await userModel.User.findAndCountAll({include: { all: true }, where: { lastName: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
                .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
              break;
            case 'uuid':
                await userModel.User.findAndCountAll({include: { all: true }, where: { uuid: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
                .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
                break;
             case 'role':
                await userModel.User.findAndCountAll({include: { all: true }, where: { role: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
                .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
                break;
            case 'verified':
                await userModel.User.findAndCountAll({include: { all: true }, where: { verified: keyword}, offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
                .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
                break;
            case 'createdOn':
                endDate = new Date(new Date(keyword).toISOString());
                endDate.setDate(endDate.getDate() + 1);
                startDate = new Date(endDate.getDate() - 1);  
                await userModel.User.findAndCountAll({include: { all: true }, where: { createdOn: { [Op.lt]: endDate, [Op.gt]: startDate }}, 
                    offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
                .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
                break;
            default:
                await userModel.User.findAndCountAll({include: { all: true }, offset: offset, limit: limit, order: [[sortby, order]]})
                .then(async (resultData) => {
                    if(resultData.count === 0) throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`);
                    dataResponse = await mjolnirTools.getPaginateData(resultData, page, limit);
                    console.log(`${resultData.count} User Profile records found on database`);
                })
                .catch((error) => { throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`) });
          }
        return dataResponse;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, `No User Profile Records found on database`)
    }
}

async function updateUserProfile(req){
    try{
        const user = await userModel.User.findOne({ where: { id: req.user.id }});
        const salt = await bcrypt.genSalt(10, 'a');
        if(!user){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'Existing User Record not found on database')
        }
        await user.update({
            password: bcrypt.hashSync(req.body.password, salt),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            uuid: req.body.uuid,
            role: req.body.role
        },)
        const extantUser = await user.save();
        return extantUser;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'Extant User Record not found on database')
    }
}

async function updateUserProfileEmail(req){
    try{
        const isUser = await userModel.User.findOne({ where: {email: req.body.newemail}});
        if(isUser){
            throw new apiErrors.ApiError(HttpStatusCode.BadRequest, `Extant User Record with email (${req.body.newemail}) already exists on database`);
        }
        const extantUser = await userModel.User.findOne({ where: {[Op.or]: [{email: req.user.email}, {id: req.user.id}]}});
        if(!extantUser){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Extant User Record with email (${req.body.newemail}) not found on database`);
        }
        if(extantUser){
            await extantUser.update({
                email: req.body.newemail,
                verified: false
            })
            return extantUser.save();
        }
    }catch(error){
        throw error;
    }
}

async function deleteUserProfileByID(id, req){
    try{
        if(['unauthorizedrolename'].includes(req.user.role)) throw new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized');
        const user = await userModel.User.findOne({ where: { id: id }});
        if(user === null){
            throw new apiErrors.ApiError(HttpStatusCode.NotFound, `Existing User Profile (ID: ${id}) not found on database`)
        }else if(user) {
            console.log(`Existing User Profile found for ID: ${user.id}`);
            await user.destroy();
            console.log(`Deleted Existing User Profile (ID: ${user.id}) from database`);
        }
        return user;
    }catch(error){
        throw new apiErrors.ApiError(HttpStatusCode.NotFound, 'Extant User Profile not found on database')
    }
}

const genRegisterToken = (user) =>{
    const userObject = {sub: Buffer.from(user.uuid, 'utf8').toString('hex'), email: user.email}
    const token = jwt.sign(userObject, process.env.DB_CODEX, {expiresIn: '13h'});
    return token;
}

const validateToken = (token) => {
    return jwt.verify(token, process.env.DB_CODEX);
}

const userServices = {
    findUserbyUUID,
    findUserbyID,
    fetchAllUserProfiles,
    fetchUserProfilePages,
    updateUserProfile,
    updateUserProfileEmail,
    genRegisterToken,
    validateToken,
    deleteUserProfileByID
}

module.exports = {userServices}