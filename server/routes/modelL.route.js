const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const { modelLController } = require('../controllers/modelL.controller');
const modelLRouter = express.Router();

//ModelL CRUD
modelLRouter.route('/locker')
.post(auth('createAny', 'locker'), modelLController.createlocker)
.get(auth('readAny', 'locker'), modelLController.fetchlockers)



module.exports = {modelLRouter}