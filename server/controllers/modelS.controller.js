const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const modelSController = {
    async createlockergroup(req, res, next){
        try{
            const lockergroup = await servicesIndex._modelSServices.createLockerGroup(req.body);
            res.status(HttpStatusCode.Created).json(lockergroup);
        }catch(error){
            next(error);
        }
    },
    async fetchlockergroups(req, res, next){
        try{
            const lockergroups = await servicesIndex._modelSServices.fetchLockerGroups();
            if(lockergroups){
                res.status(HttpStatusCode.Ok).json(lockergroups);
            }
        }catch(error){
            next(error);
        }
    },
    async findlockergroupbyId(req, res, next){
        try{
            const id = req.params.id;
            const lockergroup = await servicesIndex._modelSServices.findLockerGroupbyID(id, req.user);
            if(lockergroup){
                res.status(HttpStatusCode.Ok).json(lockergroup);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {modelSController}