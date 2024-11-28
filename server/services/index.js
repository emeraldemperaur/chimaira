const { authServices } = require("./auth.service");
const { emailServices } = require("./email.service");
const { modelGServices } = require("./modelG.service");
const { modelLServices } = require("./modelL.service");
const { modelSServices } = require("./modelS.service");
const { userServices } = require("./user.service");


const _authServices = authServices;
const _userServices = userServices;
const _emailServices = emailServices;
const _modelGServices = modelGServices;
const _modelLServices = modelLServices;
const _modelSServices = modelSServices

const servicesIndex = {
    _authServices,
    _userServices,
    _emailServices,
    _modelGServices,
    _modelLServices,
    _modelSServices
}

module.exports = {servicesIndex}
