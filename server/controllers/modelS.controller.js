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
    },
    async findlockergroupsbyProperty(req, res, next){
        try{
            const propertyName = req.params.propertyName;
            const propertyValue = req.params.propertyValue;
            const lockergroups = await servicesIndex._modelSServices.findLockerGroupsbyProperty(propertyName, propertyValue, req.user);
            if(lockergroups){
                res.status(HttpStatusCode.Ok).json(lockergroups);
            }
        }catch(error){
            next(error);
        }
    },
    async findlockergroupsbyGroupId(req, res, next){
        try{
            const id = req.params.id;
            const lockergroup = await servicesIndex._modelSServices.findLockerGroupsbyGroupID(id, req.user);
            res.status(HttpStatusCode.Ok).json(lockergroup);
        }catch(error){
            next(error);
        }
    },
    async findlockergroupsbyLockerId(req, res, next){
        try{
            const id = req.params.id;
            const lockergroup = await servicesIndex._modelSServices.findLockerGroupsbyLockerID(id, req.user);
            res.status(HttpStatusCode.Ok).json(lockergroup);
        }catch(error){
            next(error);
        }
    },
    async updatelockergroupbyId(req, res, next){
        try{
            const id = req.params.id;
            const lockergroup = await servicesIndex._modelSServices.updateLockerGroupbyID(id, req);
            if(lockergroup){
                res.status(HttpStatusCode.Ok).json(lockergroup);
            }
        }catch(error){
            next(error);
        }
    },
    async deletelockergroupbyId(req, res, next){
        try{
            const id = req.params.id;
            const locker = await servicesIndex._modelSServices.deleteLockerGroupbyID(id, req);
            if(locker){
                res.status(HttpStatusCode.Ok).json(locker);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {modelSController}