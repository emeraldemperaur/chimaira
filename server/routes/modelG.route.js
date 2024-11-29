const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { modelGController } = require('../controllers/modelG.controller');
const { expressValidator } = require('../middleware/validator');
const modelGRouter = express.Router();

//ModelG CRUD
modelGRouter.route('/group')
.post(auth('createAny', 'group'), expressValidator.initModelGValidator, modelGController.creategroup)
.get(auth('readAny', 'group'), modelGController.fetchgroups)

modelGRouter.route('/group/:id')
.get(auth('readAny', 'group'), modelGController.findgroupbyId)



module.exports = {modelGRouter}