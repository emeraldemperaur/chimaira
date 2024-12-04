const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const userRouter = express.Router();


//User CRUD
userRouter.route('/profile')
.get(auth('readOwn', 'profile'), userController.fetchprofile)
.patch(auth('updateOwn', 'profile'), userController.updateprofile);

userRouter.route('/page')
.get(auth('readAny', 'profile'), userController.fetchuserprofilepages)

userRouter.patch('/email', auth('updateOwn', 'profile'), userController.updateprofileemail);

userRouter.get('/verify', userController.verifyaccount);

userRouter.route('/profile/:id')
.delete(auth('deleteAny', 'profile'), userController.deleteprofilebyId)

//Bulk CRUD
userRouter.route('/profiles')
.get(auth('readAny', 'profile'), userController.fetchuserprofiles)
.post(auth('createAny', 'profile'), userController.bulkcreateuserprofiles)
.delete(auth('deleteAny', 'profile'), userController.bulkdeleteuserprofiles)


module.exports = {userRouter}