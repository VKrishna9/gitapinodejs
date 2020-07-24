"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessEnvLog4js = exports.ProcessEnvService = void 0;
var EnvVariable = require("../../config/config.json");
exports.ProcessEnvService = {
    _port: EnvVariable.service.port,
    _basecontext: EnvVariable.service.basecontext,
    _loginterval: EnvVariable.service.loginterval,
    _userSessionTimeout: EnvVariable.service.userloginTimeout,
    _loaduserdata: EnvVariable.service.loaduserdata,
    _loadusersenderdata: EnvVariable.service.loadusersenderdata,
    _deleteexpiredusersender: EnvVariable.service.deleteexpiredusersender,
    _emailinterval: EnvVariable.service.emailinterval,
    _groupsinterval: EnvVariable.service.cgroupsinterval
};
exports.ProcessEnvLog4js = {
    _log4jspath: EnvVariable.log4j.log4jpath
};
