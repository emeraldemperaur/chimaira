const { authServices } = require("./auth.service");
const { emailServices } = require("./email.service");
const { userServices } = require("./user.service");


const _authServices = authServices;
const _userServices = userServices;
const _emailServices = emailServices

const servicesIndex = {
    _authServices,
    _userServices,
    _emailServices
}

module.exports = {servicesIndex}
