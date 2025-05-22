const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { ragArtifactController } = require('../controllers/ragartifact.controller');
const { expressValidator } = require('../middleware/validator');
const ragArtifactRouter = express.Router();

//ModelS CRUD
ragArtifactRouter.route('/rag')
.post(auth('createAny', 'rag'), expressValidator.initModelSValidator, ragArtifactController.createragartifact)
.get(auth('readAny', 'rag'), ragArtifactController.fetchragartifacts)

ragArtifactRouter.route('/page')
.get(auth('readAny', 'rag'), ragArtifactController.fetchragartifactpages)

ragArtifactRouter.route('/rag/:id')
.get(auth('readAny', 'rag'), ragArtifactController.findragartifactbyId)
.patch(auth('updateAny', 'rag'), ragArtifactController.updateragartifactbyId)
.delete(auth('deleteAny', 'rag'), ragArtifactController.deleteragartifactbyId)


ragArtifactRouter.route('/rag/contex/:id')
.get(auth('readAny', 'rag'), ragArtifactController.findragartifactsbyContextId)

ragArtifactRouter.route('/rag/query/:id')
.get(auth('readAny', 'rag'), ragArtifactController.findragartifactsbyQueryId)

ragArtifactRouter.route('/rag/:propertyName/:propertyValue')
.get(auth('readAny', 'rag'), ragArtifactController.findragartifactsbyProperty)

//Bulk CRUD
ragArtifactRouter.route('/rags')
.post(auth('createAny', 'rag'), ragArtifactController.bulkcreateragartifacts)
.delete(auth('deleteAny', 'rag'), ragArtifactController.bulkdeleteragartifacts)

module.exports = {ragArtifactRouter}