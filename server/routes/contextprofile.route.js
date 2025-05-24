const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { contextProfileController } = require('../controllers/contextprofile.controller');
const { expressValidator } = require('../middleware/validator');
const contextProfileRouter = express.Router();

//ContextProfile CRUD
contextProfileRouter.route('/context')
.post(auth('createAny', 'context'), expressValidator.initContextValidator, contextProfileController.createcontextprofile)
.get(auth('readAny', 'context'), contextProfileController.fetchcontextprofiles)

contextProfileRouter.route('/page')
.get(auth('readAny', 'context'), contextProfileController.fetchcontextprofilepages)

contextProfileRouter.route('/context/:id')
.get(auth('readAny', 'context'), contextProfileController.findcontextprofilebyId)
.patch(auth('updateAny', 'context'), contextProfileController.updatecontextprofilebyId)
.delete(auth('deleteAny', 'context'), contextProfileController.deletecontextprofilebyId)

contextProfileRouter.route('/context/:propertyName/:propertyValue')
.get(auth('readAny', 'context'), contextProfileController.findcontextprofilesbyProperty)

//Bulk CRUD
contextProfileRouter.route('/context')
.post(auth('createAny', 'context'), contextProfileController.bulkcreatecontextprofiles)
.delete(auth('deleteAny', 'context'), contextProfileController.bulkdeletecontextprofiles)



module.exports = {contextProfileRouter}