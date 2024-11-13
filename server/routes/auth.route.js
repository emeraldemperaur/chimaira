const express = require('express');
const { authController } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth');
const authRouter = express.Router();


//User Authentication
authRouter.post('/register', authController.register);
authRouter.post('/signin', authController.signin);
authRouter.get('/isauth', auth(), authController.isauth);
authRouter.post('/setrole',  auth('createAny', 'test'), authController.setrole);


module.exports = {authRouter}