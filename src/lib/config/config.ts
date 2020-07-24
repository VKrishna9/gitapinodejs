const EnvVariable = require("../../config/config.json");

export const ProcessEnvService = {
    _port: EnvVariable.service.port,
    _basecontext: EnvVariable.service.basecontext,
    _loginterval: EnvVariable.service.loginterval,
    _userSessionTimeout: EnvVariable.service.userloginTimeout
   
};

export const ProcessEnvMongoDB = {
    _url: EnvVariable.mongodb.url  
};

export const ProcessEnvLog4js = {
    _log4jspath: EnvVariable.log4j.log4jpath
};
