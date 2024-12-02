const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const modelGController = {
    async creategroup(req, res, next){
        try{
            const group = await servicesIndex._modelGServices.createGroup(req.body);
            res.status(HttpStatusCode.Created).json(group);
        }catch(error){
            next(error);
        }
    },
    async fetchgroups(req, res, next){
        try{
            const groups = await servicesIndex._modelGServices.fetchGroups();
            if(groups){
                res.status(HttpStatusCode.Ok).json(groups);
            }
        }catch(error){
            next(error);
        }
    },
    async findgroupbyId(req, res, next){
        try{
            const id = req.params.id;
            const group = await servicesIndex._modelGServices.findGroupbyID(id, req.user);
            if(group){
                res.status(HttpStatusCode.Ok).json(group);
            }
        }catch(error){
            next(error);
        }
    },
    async findgroupsbyProperty(req, res, next){
        try{
            const propertyName = req.params.propertyName;
            const propertyValue = req.params.propertyValue;
            console.log(`\nCHECK INPUTS: ${propertyName}: ${propertyValue}\n`)
            const groups = await servicesIndex._modelGServices.findGroupsbyProperty(propertyName, propertyValue, req.user);
            if(groups){
                res.status(HttpStatusCode.Ok).json(groups);
            }
        }catch(error){
            next(error);
        }
    },
    async updategroupbyId(req, res, next){
        try{
            const id = req.params.id;
            const group = await servicesIndex._modelGServices.updateGroupbyID(id, req);
            if(group){
                res.status(HttpStatusCode.Ok).json(group);
            }
        }catch(error){
            next(error);
        }
    },
    async deletegroupbyId(req, res, next){
        try{
            const id = req.params.id;
            const group = await servicesIndex._modelGServices.deleteGroupbyID(id, req);
            if(group){
                res.status(HttpStatusCode.Ok).json(group);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {modelGController}