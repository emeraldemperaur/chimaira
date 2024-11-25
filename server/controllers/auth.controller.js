const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');


const authController = {
    async register(req, res, next){
        try{
            const { email, uuid, password, firstName, lastName, role } = req.body;
            const user = await servicesIndex._authServices.createUser(email, uuid, password, firstName, lastName, role);
            const token = servicesIndex._authServices.genAuthToken(user);

            // EMAIL VERIFICATION
            servicesIndex._emailServices.registerEmail(email, user);

            res.cookie('x-access-token', token)
            .status(201).send({user, token})
        }catch(error){
            next(error)
        }
    },
    async signin(req, res, next){
        try{
            const { email, password } = req.body;
            const user = await servicesIndex._authServices.signInWithUIDAndPassword(email, password);
            const token = servicesIndex._authServices.genAuthToken(user);
            
            res.cookie('x-access-token', token).send({user, token})
        }catch(error){
            next(error)
        }

    },
    async isauth(req, res, next){
        res.json(req.user);
    },
    async setrole(req, res, next){
        res.json({"done": true});
    }
}


module.exports = {authController}