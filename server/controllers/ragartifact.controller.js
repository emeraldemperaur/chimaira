const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const ragArtifactController = {
    async createragartifact(req, res, next){
        try{
            const ragartifact = await servicesIndex._ragArticactServices.createRAGArtifact(req);
            res.status(HttpStatusCode.Created).json(ragartifact);
        }catch(error){
            next(error);
        }
    },
    async fetchragartifacts(req, res, next){
        try{
            const ragartifacts = await servicesIndex._ragArticactServices.fetchRAGArtifacts(req);
            if(ragartifacts){
                res.status(HttpStatusCode.Ok).json(ragartifacts);
            }
        }catch(error){
            next(error);
        }
    },
    async fetchragartifactpages(req, res, next){
        try{
            const ragartifacts = await servicesIndex._ragArticactServices.fetchRAGArtifactPages(req);
            if(ragartifacts){
                res.status(HttpStatusCode.Ok).json(ragartifacts);
            }
        }catch(error){
            next(error);
        }
    },
    async findragartifactbyId(req, res, next){
        try{
            const id = req.params.id;
            const ragartifact = await servicesIndex._ragArticactServices.findRAGArtifactbyID(id, req.user);
            if(ragartifact){
                res.status(HttpStatusCode.Ok).json(ragartifact);
            }
        }catch(error){
            next(error);
        }
    },
    async findragartifactsbyProperty(req, res, next){
        try{
            const propertyName = req.params.propertyName;
            const propertyValue = req.params.propertyValue;
            const ragartifacts = await servicesIndex._ragArticactServices.findRAGArtifactsbyProperty(req, propertyName, propertyValue);
            if(ragartifacts){
                res.status(HttpStatusCode.Ok).json(ragartifacts);
            }
        }catch(error){
            next(error);
        }
    },
    async findragartifactsbyContextId(req, res, next){
        try{
            const id = req.params.id;
            const ragartifact = await servicesIndex._ragArticactServices.findRAGArtifactsbyContextID(id, req.user);
            res.status(HttpStatusCode.Ok).json(ragartifact);
        }catch(error){
            next(error);
        }
    },
    async findragartifactsbyQueryId(req, res, next){
        try{
            const id = req.params.id;
            const ragartifact = await servicesIndex._ragArticactServices.findRAGArtifactsbyQueryID(id, req.user);
            res.status(HttpStatusCode.Ok).json(ragartifact);
        }catch(error){
            next(error);
        }
    },
    async updateragartifactbyId(req, res, next){
        try{
            const id = req.params.id;
            const ragartifact = await servicesIndex._ragArticactServices.updateRAGArtifactbyID(id, req);
            if(ragartifact){
                res.status(HttpStatusCode.Ok).json(ragartifact);
            }
        }catch(error){
            next(error);
        }
    },
    async deleteragartifactbyId(req, res, next){
        try{
            const id = req.params.id;
            const ragartifact = await servicesIndex._ragArticactServices.deleteRAGArtifactbyID(id, req);
            if(ragartifact){
                res.status(HttpStatusCode.Ok).json(ragartifact);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkdeleteragartifacts(req, res, next){
        try{
            const ragartifacts = await servicesIndex._ragArticactServices.bulkDeleteRAGArtifacts(req);
            if(ragartifacts){
                res.status(HttpStatusCode.Ok).json(ragartifacts);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkcreateragartifacts(req, res, next){
        try{
            const ragartifacts = await servicesIndex._ragArticactServices.bulkCreateRAGArtifacts(req);
            if(ragartifacts){
                res.status(HttpStatusCode.Ok).json(ragartifacts);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {ragArtifactController}