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

modelGRouter.route('/page')
.get(auth('readAny', 'group'), modelGController.fetchgrouppages)

modelGRouter.route('/group/:id')
.get(auth('readAny', 'group'), modelGController.findgroupbyId)
.patch(auth('updateAny', 'group'), modelGController.updategroupbyId)
.delete(auth('deleteAny', 'group'), modelGController.deletegroupbyId)

modelGRouter.route('/group/:propertyName/:propertyValue')
.get(auth('readAny', 'group'), modelGController.findgroupsbyProperty)

//Bulk CRUD
modelGRouter.route('/groups')
.post(auth('createAny', 'group'), modelGController.bulkcreategroups)
.delete(auth('deleteAny', 'group'), modelGController.bulkdeletegroups)



module.exports = {modelGRouter}