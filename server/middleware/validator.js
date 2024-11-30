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
    initModelSValidator
}

module.exports = { expressValidator }