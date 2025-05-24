const { HttpStatusCode } = require('axios');
const { check, validationResult } = require('express-validator');

const initContextValidator = [
    check('name')
        .trim().not().isEmpty().withMessage(`You need to provide a 'name' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'name' property/value`),
    check('prologue')
        .trim().not().isEmpty().withMessage(`You need to provide a 'prologue' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'prologue' property/value`),
    check('category')
        .trim().not().isEmpty().withMessage(`You need to provide a 'category' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'category' property/value`),
    check('isQueryCommand')
        .trim().not().isEmpty().withMessage(`You need to provide a 'isQueryCommand' property/value`)
        .isBoolean().withMessage(`You need to provide a true or false 'isQueryCommand' property/value`)
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

const initConfigurationValidator = [
    check('name')
        .trim().not().isEmpty().withMessage(`You need to provide a 'name' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'name' property/value`),
    check('provider')
        .trim().not().isEmpty().withMessage(`You need to provide a 'provider' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'provider' property/value`),
    check('key')
        .trim().not().isEmpty().withMessage(`You need to provide a 'key' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'key' property/value`)
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

const initQueryValidator = [
    check('name')
        .trim().not().isEmpty().withMessage(`You need to provide a 'name' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid '' property/value`),
    check('type')
        .trim().not().isEmpty().withMessage(`You need to provide a 'type' property/value`)
        .isLength({min: 2}).withMessage(`You need to provide a valid 'type' property/value`),
    check('tags')
        .trim().not().isEmpty().withMessage(`You need to provide a 'tag' property/value`)
        .isArray().withMessage(`You need to provide a true or false 'tag' property/value`)
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

const initArtifactValidator = [
    check('name')
        .trim().not().isEmpty().withMessage(`You need to provide a 'name' property/value`)
        .isLength({min: 3}).withMessage(`You need to provide a valid 'name' property/value`),
    check('synopsis')
        .trim().not().isEmpty().withMessage(`You need to provide a 'synopsis' property/value`)
        .isString().isLength({min: 6}).withMessage(`You need to provide a valid length 'synopsis' property/value`),
    check('response')
        .isArray().withMessage(`You need to provide a valid 'response' property/value`),
    check('mementos')
        .isArray().withMessage(`You need to provide a valid 'mementos' property/value`)
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
    initContextValidator,
    initConfigurationValidator,
    initQueryValidator,
    initArtifactValidator,
    initUserValidator
}

module.exports = { expressValidator }