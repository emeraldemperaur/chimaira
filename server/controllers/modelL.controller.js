const { apiErrors } = require('../middleware/apiError');
const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const modelLController = {
    async createlocker(req, res, next){
        try{
            const locker = await servicesIndex._modelLServices.createLocker(req.body);
            res.status(HttpStatusCode.Created).json(locker);
        }catch(error){
            next(error);
        }
    },
    async fetchlockers(req, res, next){
        try{
            const lockers = await servicesIndex._modelLServices.fetchLockers();
            if(lockers){
                res.status(HttpStatusCode.Ok).json(lockers);
            }
        }catch(error){
            next(error);
        }
    },
    async findlockerbyId(req, res, next){
        try{
            const id = req.params.id;
            const locker = await servicesIndex._modelLServices.findLockerbyID(id, req.user);
            if(locker){
                res.status(HttpStatusCode.Ok).json(locker);
            }
        }catch(error){
            next(error);
        }
    },
    async findlockersbyProperty(req, res, next){
        try{
            const propertyName = req.params.propertyName;
            const propertyValue = req.params.propertyValue;
            const lockers = await servicesIndex._modelLServices.findLockersbyProperty(propertyName, propertyValue, req.user);
            if(lockers){
                res.status(HttpStatusCode.Ok).json(lockers);
            }
        }catch(error){
            next(error);
        }
    },
    async updatelockerbyId(req, res, next){
        try{
            const id = req.params.id;
            const locker = await servicesIndex._modelLServices.updateLockerbyID(id, req);
            if(locker){
                res.status(HttpStatusCode.Ok).json(locker);
            }
        }catch(error){
            next(error);
        }
    },
    async deletelockerbyId(req, res, next){
        try{
            const id = req.params.id;
            const locker = await servicesIndex._modelLServices.deleteLockerbyID(id, req);
            if(locker){
                res.status(HttpStatusCode.Ok).json(locker);
            }
        }catch(error){
            next(error);
        }
    }
}
module.exports = {modelLController}