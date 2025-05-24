const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const configurationController = {
    async createconfiguration(req, res, next){
        try{
            const configuration = await servicesIndex._configurationServices.createConfiguration(req);
            res.status(HttpStatusCode.Created).json(configuration);
        }catch(error){
            next(error);
        }
    },
    async fetchconfigurations(req, res, next){
        try{
            const configurations = await servicesIndex._configurationServices.fetchConfigurations(req);
            if(configurations){
                res.status(HttpStatusCode.Ok).json(configurations);
            }
        }catch(error){
            next(error);
        }
    },
    async fetchconfigurationspages(req, res, next){
        try{
            const configurations = await servicesIndex._configurationServices.fetchConfigurationPages(req);
            if(configurations){
                res.status(HttpStatusCode.Ok).json(configurations);
            }
        }catch(error){
            next(error);
        }
    },
    async findconfigurationbyId(req, res, next){
        try{
            const id = req.params.id;
            const configuration = await servicesIndex._configurationServices.findConfigurationbyID(id, req.user);
            if(configuration){
                res.status(HttpStatusCode.Ok).json(configuration);
            }
        }catch(error){
            next(error);
        }
    },
    async findconfigurationsbyProperty(req, res, next){
        try{
            const propertyName = req.params.propertyName;
            const propertyValue = req.params.propertyValue;
            const configurations = await servicesIndex._configurationServices.findConfigurationsbyProperty(req, propertyName, propertyValue);
            if(configurations){
                res.status(HttpStatusCode.Ok).json(configurations);
            }
        }catch(error){
            next(error);
        }
    },
    async updateconfigurationbyId(req, res, next){
        try{
            const id = req.params.id;
            const configuration = await servicesIndex._configurationServices.updateConfigurationbyID(id, req);
            if(configuration){
                res.status(HttpStatusCode.Ok).json(configuration);
            }
        }catch(error){
            next(error);
        }
    },
    async deleteconfigurationbyId(req, res, next){
        try{
            const id = req.params.id;
            const configuration = await servicesIndex._configurationServices.deleteConfigurationbyID(id, req);
            if(configuration){
                res.status(HttpStatusCode.Ok).json(configuration);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkdeleteconfigurations(req, res, next){
        try{
            const configurations = await servicesIndex._configurationServices.bulkDeleteConfigurations(req);
            if(configurations){
                res.status(HttpStatusCode.Ok).json(configurations);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkcreateconfigurations(req, res, next){
        try{
            const configurations = await servicesIndex._configurationServices.bulkCreateConfigurations(req);
            if(configurations){
                res.status(HttpStatusCode.Ok).json(configurations);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {configurationController}