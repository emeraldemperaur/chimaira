const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { modelGController } = require('../controllers/modelG.controller');
const modelGRouter = express.Router();

//ModelG CRUD
modelGRouter.route('/group')
.post(auth('createAny', 'group'), modelGController.creategroup)
.get(auth('readAny', 'group'), modelGController.fetchgroups)



module.exports = {modelGRouter}