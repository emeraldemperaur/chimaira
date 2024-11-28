const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { modelSController } = require('../controllers/modelS.controller');
const modelSRouter = express.Router();

//ModelS CRUD
modelSRouter.route('/lockergroup')
.post(auth('createAny', 'lockergroup'), modelSController.createlockergroup)
.get(auth('readAny', 'lockergroup'), modelSController.fetchlockergroups)



module.exports = {modelSRouter}