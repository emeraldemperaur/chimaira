const { servicesIndex } = require('../services');
const { HttpStatusCode } = require('axios');

const userController = {
    async editUser(req, res, next){
        res.json({"done": true});
    }
}


module.exports = {userController}