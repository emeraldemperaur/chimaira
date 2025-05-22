const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const queryModelController = {
    async createquerymodel(req, res, next){
        try{
            const querymodel = await servicesIndex._queryModelServices.createQueryModel(req);
            res.status(HttpStatusCode.Created).json(querymodel);
        }catch(error){
            next(error);
        }
    },
    async fetchquerymodels(req, res, next){
        try{
            const querymodels = await servicesIndex._queryModelServices.fetchQueryModels(req);
            if(querymodels){
                res.status(HttpStatusCode.Ok).json(querymodels);
            }
        }catch(error){
            next(error);
        }
    },
    async fetchquerymodelpages(req, res, next){
        try{
            const querymodels = await servicesIndex._queryModelServices.fetchQueryModelPages(req);
            if(querymodels){
                res.status(HttpStatusCode.Ok).json(querymodels);
            }
        }catch(error){
            next(error);
        }
    },
    async findquerymodelbyId(req, res, next){
        try{
            const id = req.params.id;
            const querymodel = await servicesIndex._queryModelServices.findQueryModelbyID(id, req.user);
            if(querymodel){
                res.status(HttpStatusCode.Ok).json(querymodel);
            }
        }catch(error){
            next(error);
        }
    },
    async findquerymodelsbyProperty(req, res, next){
        try{
            const propertyName = req.params.propertyName;
            const propertyValue = req.params.propertyValue;
            const querymodel = await servicesIndex._queryModelServices.findQueryModelsbyProperty(req, propertyName, propertyValue);
            if(querymodel){
                res.status(HttpStatusCode.Ok).json(querymodel);
            }
        }catch(error){
            next(error);
        }
    },
    async updatequerymodelbyId(req, res, next){
        try{
            const id = req.params.id;
            const querymodel = await servicesIndex._queryModelServices.updateLockerbyID(id, req);
            if(querymodel){
                res.status(HttpStatusCode.Ok).json(querymodel);
            }
        }catch(error){
            next(error);
        }
    },
    async deletequerymodelbyId(req, res, next){
        try{
            const id = req.params.id;
            const querymodel = await servicesIndex._queryModelServices.deleteQueryModelbyID(id, req);
            if(querymodel){
                res.status(HttpStatusCode.Ok).json(querymodel);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkdeletequerymodels(req, res, next){
        try{
            const querymodels = await servicesIndex._queryModelServices.bulkDeleteQueryModels(req);
            if(querymodels){
                res.status(HttpStatusCode.Ok).json(querymodels);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkcreatequerymodel(req, res, next){
        try{
            const querymodel = await servicesIndex._queryModelServices.bulkCreateQueryModels(req);
            if(querymodel){
                res.status(HttpStatusCode.Ok).json(querymodel);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {queryModelController};