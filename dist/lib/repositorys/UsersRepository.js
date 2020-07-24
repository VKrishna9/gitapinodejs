"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbUtils_1 = require("../utils/dbUtils");
var LogUtils_1 = require("../utils/LogUtils");
var convert = require("xml-js");
var UsersRepository = /** @class */ (function () {
    function UsersRepository() {
    }
    UsersRepository.prototype.loadUser = function (memDb) {
        LogUtils_1.logger.info("UserReposiroty  :");
        return dbUtils_1.synapseDBconnect.query("select Id as userId,UserName as name from Users", { type: dbUtils_1.synapseDBconnect.QueryTypes.SELECT })
            .then(function (rows) {
            rows.forEach(function (row) {
                // console.log("User :", row);
                memDb.addUser(row);
            });
            return "ok";
        }).then(function (result) {
            LogUtils_1.logger.info("User complted  :", result);
            return dbUtils_1.synapseDBconnect.query("select Id as smscId,SMSCName as name from SmscMaster", { type: dbUtils_1.synapseDBconnect.QueryTypes.SELECT })
                .then(function (rows) {
                if (rows.length > 0) {
                    rows.forEach(function (row) {
                        memDb.addSmsc(row);
                    });
                }
                else {
                    LogUtils_1.logger.log("loadUser: => SMSC Records not found.");
                }
                return "ok";
            }).catch(function (error) {
                var errorMessage = "Error from DataBase: Error:[" + error.name + "], Error Message:[" + error.original.message + "]";
                LogUtils_1.logger.error("Select SmscSmpp =>", errorMessage);
            });
        })
            .catch(function (error) {
            var errorMessage = "Error from DataBase: Error:[" + error.name + "], Error Message:[" + error.original.message + "]";
            LogUtils_1.logger.error("loadUser =>", errorMessage);
            return errorMessage;
        });
    };
    return UsersRepository;
}());
exports.UsersRepository = UsersRepository;
