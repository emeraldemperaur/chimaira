const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { modelLController } = require('../controllers/modelL.controller');
const { expressValidator } = require('../middleware/validator');
const modelLRouter = express.Router();

//ModelL CRUD
modelLRouter.route('/locker')
.post(auth('createAny', 'locker'), expressValidator.initModelLValidator, modelLController.createlocker)
.get(auth('readAny', 'locker'), modelLController.fetchlockers)

modelLRouter.route('/locker/:id')
.get(auth('readAny', 'locker'), modelLController.findlockerbyId)



module.exports = {modelLRouter}