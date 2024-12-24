const { HttpStatusCode } = require('axios');
const { check, validationResult } = require('express-validator');

const initModelGValidator = [
    check('name')
        .trim().not().isEmpty().withMessage(`You need to provide a 'name' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'name' property/value`),
    check('creator')
        .trim().not().isEmpty().withMessage(`You need to provide a 'creator' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'creator' property/value`),
    check('private')
        .trim().not().isEmpty().withMessage(`You need to provide a 'private' property/value`)
        .isBoolean().withMessage(`You need to provide a true or false 'private' property/value`)
    ,
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(HttpStatusCode.BadRequest).json({
                errors: errors.array()
            })
        }
        next();
    }
]

const initUserValidator = [
    check('email')
        .trim().not().isEmpty().withMessage(`You need to provide a 'email' property/value`)
        .isEmail().withMessage(`You need to provide a valid 'email' property/value`),
    check('password')
        .trim().not().isEmpty().withMessage(`You need to provide a 'password' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'password' property/value`),
    check('firstName')
        .trim().not().isEmpty().withMessage(`You need to provide a 'firstName' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'firstName' property/value`),
    check('lastName')
        .trim().not().isEmpty().withMessage(`You need to provide a 'lastName' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'lastName' property/value`),
    check('uuid')
        .trim().not().isEmpty().withMessage(`You need to provide a 'uuid' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'uuid' property/value`),
    check('role')
        .trim().not().isEmpty().withMessage(`You need to provide a 'role' property/value`)
        .isLength({min: 3, max: 6}).withMessage(`You need to provide a valid 'role' property/value`)
    ,
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(HttpStatusCode.BadRequest).json({
                errors: errors.array()
            })
        }
        next();
    }
]

const initModelLValidator = [
    check('name')
        .trim().not().isEmpty().withMessage(`You need to provide a 'name' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid '' property/value`),
    check('owner')
        .trim().not().isEmpty().withMessage(`You need to provide a 'owner' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'owner' property/value`),
    check('locked')
        .trim().not().isEmpty().withMessage(`You need to provide a 'locked' property/value`)
        .isBoolean().withMessage(`You need to provide a true or false 'locked' property/value`)
    ,
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(HttpStatusCode.BadRequest).json({
                errors: errors.array()
            })
        }
        next();
    }
]

const initModelSValidator = [
    check('name')
        .trim().not().isEmpty().withMessage(`You need to provide a 'name' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'name' property/value`),
    check('tags')
        .trim().not().isEmpty().withMessage(`You need to provide a 'tags' property/value`)
        .isJSON().withMessage(`You need to provide a valid json 'tags' property/value`),
    check('groupId')
        .trim().not().isEmpty().withMessage(`You need to provide a 'groupId' property/value`)
        .isInt().withMessage(`You need to provide a valid 'groupId' property/value`),
    check('lockerId')
        .trim().not().isEmpty().withMessage(`You need to provide a 'lockerId' property/value`)
        .isInt().withMessage(`You need to provide a valid 'lockerId' property/value`)
    ,
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(HttpStatusCode.BadRequest).json({
                errors: errors.array()
            })
        }
        next();
    }
]

const expressValidator = {
    initModelGValidator,
    initModelLValidator,
    initModelSValidator,
    initUserValidator
}

module.exports = { expressValidator }