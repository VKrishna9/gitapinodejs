"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var LogUtils_1 = require("../utils/LogUtils");
var dbTables = require("../model/db.tables");
var Sequelize = require("sequelize");
var dbUtils_1 = require("../utils/dbUtils");
// export const sequelize = new Sequelize(ProcessEnv.ProcessEnvSynapseDB._database, ProcessEnv.ProcessEnvSynapseDB._username, ProcessEnv.ProcessEnvSynapseDB._password, {
//     host: ProcessEnv.ProcessEnvSynapseDB._host,
//     dialect: ProcessEnv.ProcessEnvSynapseDB._dialect,
//     port: ProcessEnv.ProcessEnvSynapseDB._db_port,
//     dialectOptions: {
//         connectionTimeout: 9999,
//         requestTimeout:0
//    },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000,
//         acquire: 30000
//     },
// });
// export const sequelizegateway = new Sequelize(ProcessEnv.ProcessEnvGatewayDB._database, ProcessEnv.ProcessEnvGatewayDB._username, ProcessEnv.ProcessEnvGatewayDB._password, {
//     host: ProcessEnv.ProcessEnvGatewayDB._host,
//     dialect: ProcessEnv.ProcessEnvGatewayDB._dialect,
//     port: ProcessEnv.ProcessEnvGatewayDB._db_port,
//     dialectOptions: {
//         connectionTimeout: 9999,
//         requestTimeout:0
//    },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000,
//         acquire: 30000
//     },
// });
exports.tables = dbTables.getModels(dbUtils_1.connect);
var userArray = [];
var smscArray = [];
var UserData = /** @class */ (function () {
    function UserData() {
    }
    UserData.prototype.loadUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userData, smscData;
            return __generator(this, function (_a) {
                // select Id,UserName from Synapse.dbo.Users ;
                // select SmscId,SystemId from Synapse.dbo.SmscSmpp
                userArray = [];
                userData = dbUtils_1.synapseDBconnect.query("select Id,UserName from Users")
                    .then(function (result) {
                    userArray.push(result);
                });
                smscArray = [];
                smscData = dbUtils_1.synapseDBconnect.query("select SmscId,SystemId from SmscSmpp")
                    .then(function (result) {
                    LogUtils_1.logger.info("loadUserData: success ==>", result);
                    smscArray.push(result);
                }).catch(function (error) {
                    LogUtils_1.logger.error("loadUserData: Failed ==>", error);
                    return '{Status: "Failed"}';
                });
                return [2 /*return*/];
            });
        });
    };
    return UserData;
}());
exports.UserData = UserData;
