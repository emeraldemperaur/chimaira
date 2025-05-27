const express = require('express');
const { auth } = require('../middleware/auth');
const { expressValidator } = require('../middleware/validator');
const { configurationController } = require('../controllers/settings.controller');
const configurationRouter = express.Router();

//ModelS CRUD
configurationRouter.route('/config')
.post( expressValidator.initConfigurationValidator, configurationController.createconfiguration)
.get( configurationController.fetchconfigurations)

configurationRouter.route('/page')
.get(auth('readAny', 'config'), configurationController.fetchconfigurationspages)

configurationRouter.route('/config/:id')
.get(auth('readAny', 'config'), configurationController.findconfigurationbyId)
.patch( configurationController.updateconfigurationbyId)
.delete( configurationController.deleteconfigurationbyId)

configurationRouter.route('/config/:propertyName/:propertyValue')
.get(auth('readAny', 'config'), configurationController.findconfigurationsbyProperty)

//Bulk CRUD
configurationRouter.route('/rags')
.post(auth('createAny', 'config'), configurationController.bulkcreateconfigurations)
.delete(auth('deleteAny', 'config'), configurationController.bulkdeleteconfigurations)

module.exports = {configurationRouter}