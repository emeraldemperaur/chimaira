const { authServices } = require("./auth.service");
const { emailServices } = require("./email.service");
const { contextProfileServices } = require("./contextprofile.service");
const { queryModelServices } = require("./querymodel.service");
const { ragArtifactServices } = require("./ragartifact.service");
const { userServices } = require("./user.service");
const { configurationServices } = require("./settings.service");


const _authServices = authServices;
const _userServices = userServices;
const _emailServices = emailServices;
const _contexProfileService = contextProfileServices;
const _queryModelServices = queryModelServices;
const _ragArticactServices = ragArtifactServices;
const _configurationServices = configurationServices

const servicesIndex = {
    _authServices,
    _userServices,
    _emailServices,
    _contexProfileService,
    _queryModelServices,
    _ragArticactServices,
    _configurationServices
}

module.exports = {servicesIndex}
