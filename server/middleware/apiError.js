const { dbSQLize } = require('../database');
const { HttpStatusCode } = require('axios');
class ApiError extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
}

const convertToApiError = (err, req, res, next) => {
    let error = err;
    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error.name == 'SequelizeValidationError' ?
        HttpStatusCode.BadRequest : HttpStatusCode.InternalServerError;
        const message = error.message || HttpStatusCode[statusCode];
        error = new ApiError(statusCode, message);
    }
    next(error)
}

const apiErrors = {
    ApiError,
    handleError,
    convertToApiError
}

module.exports = { apiErrors }