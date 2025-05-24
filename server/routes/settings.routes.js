const express = require('express');
const { auth } = require('../middleware/auth');
const { expressValidator } = require('../middleware/validator');
const { configurationController } = require('../controllers/settings.controller');
const configurationRouter = express.Router();

//ModelS CRUD
configurationRouter.route('/config')
.post(auth('createAny', 'config'), expressValidator.initConfigurationValidator, configurationController.createconfiguration)
.get(auth('readAny', 'config'), configurationController.fetchconfigurations)

configurationRouter.route('/page')
.get(auth('readAny', 'config'), configurationController.fetchconfigurationspages)

configurationRouter.route('/config/:id')
.get(auth('readAny', 'config'), configurationController.findconfigurationbyId)
.patch(auth('updateAny', 'config'), configurationController.updateconfigurationbyId)
.delete(auth('deleteAny', 'config'), configurationController.deleteconfigurationbyId)

configurationRouter.route('/config/:propertyName/:propertyValue')
.get(auth('readAny', 'config'), configurationController.findconfigurationsbyProperty)

//Bulk CRUD
configurationRouter.route('/rags')
.post(auth('createAny', 'config'), configurationController.bulkcreateconfigurations)
.delete(auth('deleteAny', 'config'), configurationController.bulkdeleteconfigurations)

module.exports = {configurationRouter}