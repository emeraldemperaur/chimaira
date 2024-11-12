const express = require('express');
const { userController } = require('../controllers/user.controller');
const userRouter = express.Router();


//User CRUD
userRouter.post('/edit', userController.editUser);


module.exports = {userRouter}