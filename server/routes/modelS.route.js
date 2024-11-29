const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { modelSController } = require('../controllers/modelS.controller');
const { expressValidator } = require('../middleware/validator');
const modelSRouter = express.Router();

//ModelS CRUD
modelSRouter.route('/lockergroup')
.post(auth('createAny', 'lockergroup'), expressValidator.initModelSValidator, modelSController.createlockergroup)
.get(auth('readAny', 'lockergroup'), modelSController.fetchlockergroups)

modelSRouter.route('/lockergroup/:id')
.get(auth('readAny', 'lockergroup'), modelSController.findlockergroupbyId)


module.exports = {modelSRouter}