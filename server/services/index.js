const { authServices } = require("./auth.service");
const { userServices } = require("./user.service");

const _authServices = authServices;
const _userServices = userServices;

const servicesIndex = {
    _authServices,
    _userServices
}

module.exports = {servicesIndex}
