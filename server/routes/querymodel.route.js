const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { queryModelController } = require('../controllers/querymodel.controller');
const { expressValidator } = require('../middleware/validator');
const queryModelRouter = express.Router();

//Query Model CRUD
queryModelRouter.route('/query')
.post(auth('createAny', 'query'), expressValidator.initModelLValidator, queryModelController.createquerymodel)
.get(auth('readAny', 'query'), queryModelController.fetchquerymodels)

queryModelRouter.route('/page')
.get(auth('readAny', 'query'), queryModelController.fetchquerymodelpages)

queryModelRouter.route('/query/:id')
.get(auth('readAny', 'query'), queryModelController.findquerymodelbyId)
.patch(auth('updateAny', 'query'), queryModelController.updatequerymodelbyId)
.delete(auth('deleteAny', 'query'), queryModelController.deletequerymodelbyId)


queryModelRouter.route('/query/:propertyName/:propertyValue')
.get(auth('readAny', 'query'), queryModelController.findquerymodelsbyProperty)

//Bulk CRUD
queryModelRouter.route('/query')
.post(auth('createAny', 'query'), queryModelController.bulkcreatequerymodel)
.delete(auth('deleteAny', 'query'), queryModelController.bulkdeletequerymodels)





module.exports = {queryModelRouter};