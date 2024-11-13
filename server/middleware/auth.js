const passport = require('passport');
const { apiErrors } = require('./apiError');
const { HttpStatusCode } = require('axios');
const { roles } = require('../utils/user.roles');

const verify = (req, res, resolve, reject, rights) => async(err, user) =>{
    if(err || !user){ return reject(new apiErrors.ApiError(HttpStatusCode.Unauthorized, 'User Access Unauthorized'))}
    req.user = user;
    if(rights.length){
        const action = rights[0];
        const resource = rights[1];
        const permission = roles.can(user.role)[action](resource)
        if(!permission.granted){ return reject(new apiErrors.ApiError(HttpStatusCode.Forbidden, 'User Access Forbidden'))}
        res.locals.permission = permission;
    }
    resolve();
}

const auth = (...rights) => async(req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', {session: false}, verify(req, res, resolve, reject, rights))(req, res, next)
    })
    .then(() => next())
    .catch((err) => next(err))
}

module.exports = {auth}