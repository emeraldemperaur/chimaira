const express = require('express');
const { authController } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth');
const { expressValidator } = require('../middleware/validator');
const authRouter = express.Router();


//User Authentication
authRouter.post('/register', expressValidator.initUserValidator, authController.register);
authRouter.post('/signin', authController.signin);
authRouter.get('/isauth', auth(), authController.isauth);
authRouter.post('/setrole',  auth('createAny', 'test'), authController.setrole);


module.exports = {authRouter}