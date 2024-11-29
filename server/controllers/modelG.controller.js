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
    }
}
module.exports = {modelGController}