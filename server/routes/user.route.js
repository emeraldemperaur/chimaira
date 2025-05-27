const express = require('express');
const { userController } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth');
const userRouter = express.Router();


//User CRUD
userRouter.route('/profile/:id').patch( userController.updateprofile);
userRouter.route('/profile/:id').get( userController.fetchprofile)


userRouter.route('/page')
.get(auth('readAny', 'profile'), userController.fetchuserprofilepages)

userRouter.patch('/email', auth('updateOwn', 'profile'), userController.updateprofileemail);

userRouter.get('/verify', userController.verifyaccount);

userRouter.route('/profile/:id')
.delete( userController.deleteprofilebyId)

//Bulk CRUD
userRouter.route('/profiles')
.get(auth('readAny', 'profile'), userController.fetchuserprofiles)
.post(auth('createAny', 'profile'), userController.bulkcreateuserprofiles)
.delete(auth('deleteAny', 'profile'), userController.bulkdeleteuserprofiles)


module.exports = {userRouter}