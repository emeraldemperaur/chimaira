const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const contextProfileController = {
    async createcontextprofile(req, res, next){
        try{
            const contextprofile = await servicesIndex._contexProfileService.createContextProfile(req.body);
            res.status(HttpStatusCode.Created).json(contextprofile);
        }catch(error){
            next(error);
        }
    },
    async fetchcontextprofiles(req, res, next){
        try{
            const contextprofile = await servicesIndex._contexProfileService.fetchContextProfiles(req);
            if(contextprofile){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    },
    async fetchcontextprofilepages(req, res, next){
        try{
            const contextprofile = await servicesIndex._contexProfileService.fetchContextProfilePages(req);
            if(contextprofile){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    },
    async findcontextprofilebyId(req, res, next){
        try{
            const id = req.params.id;
            const contextprofile = await servicesIndex._contexProfileService.findContextProfilebyID(id, req.user);
            if(contextprofile){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    },
    async findcontextprofilesbyProperty(req, res, next){
        try{
            const propertyName = req.params.propertyName;
            const propertyValue = req.params.propertyValue;
            console.log(`\nCHECK INPUTS: ${propertyName}: ${propertyValue}\n`)
            const contextprofile = await servicesIndex._contexProfileService.findContextProfilesbyProperty(req, propertyName, propertyValue);
            if(contextprofile){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    },
    async updatecontextprofilebyId(req, res, next){
        try{
            const id = req.params.id;
            const contextprofile = await servicesIndex._contexProfileService.updateContextProfilebyID(id, req);
            if(contextprofile){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    },
    async deletecontextprofilebyId(req, res, next){
        try{
            const id = req.params.id;
            const contextprofile = await servicesIndex._contexProfileService.deleteContextProfilebyID(id, req);
            if(group){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkdeletecontextprofiles(req, res, next){
        try{
            const id = req.params.id;
            const contextprofile = await servicesIndex._contexProfileService.bulkDeleteContextProfiles(req);
            if(contextprofile){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    },
    async bulkcreatecontextprofiles(req, res, next){
        try{
            const id = req.params.id;
            const contextprofile = await servicesIndex._contexProfileService.bulkCreateContextProfiles(req);
            if(contextprofile){
                res.status(HttpStatusCode.Ok).json(contextprofile);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {contextProfileController}