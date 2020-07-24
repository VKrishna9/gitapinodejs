"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var typedi_1 = require("typedi");
var AlertsData_1 = require("../utils/AlertsData");
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var sequelizer = require("sequelize");
var qUtils_1 = require("../utils/qUtils");
var LogUtils_1 = require("../utils/LogUtils");
var ProcessEnv = require("../config/config");
var tables = dbTables.getModels(dbUtils_1.connect);
var AlertMessage_1 = require("../utils/AlertMessage");
var datetime = require("node-datetime");
var AlertsRepositoryNew = /** @class */ (function () {
    function AlertsRepositoryNew(alertsdata) {
        this.alertsdata = alertsdata;
    }
    AlertsRepositoryNew.prototype.esmeAlertsInformation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tables.esmeMaster.findAll({
                            raw: true
                        }).then(function (rows) {
                            var logrows = JSON.stringify(rows);
                            rows.forEach(function (row) {
                                var dt = datetime.create(row.insertedTime);
                                row.insertedTime = dt.format("Y-m-d H:M:S");
                            });
                            LogUtils_1.logger.info("getEsmeData: Success ==>", JSON.stringify(logrows));
                            return rows;
                        }).catch(function (error) {
                            LogUtils_1.logger.error("getEsmeDatat: Failed ==>", JSON.stringify(error));
                            return JSON.stringify(error.name);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsRepositoryNew.prototype.smscAlertsInformation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tables.smscMaster.findAll({
                            raw: true
                        }).then(function (rows) {
                            var logrows = JSON.stringify(rows);
                            LogUtils_1.logger.info("getSmscData: Success ==>", JSON.stringify(logrows));
                            rows.forEach(function (row) {
                                var dt = datetime.create(row.insertedTime);
                                row.insertedTime = dt.format("Y-m-d H:M:S");
                            });
                            return rows;
                        }).catch(function (error) {
                            LogUtils_1.logger.error("getSmscData: Failed ==>", JSON.stringify(error));
                            return JSON.stringify(error.name);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsRepositoryNew.prototype.getUserData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userdata;
            return __generator(this, function (_a) {
                userdata = tables.esmeMaster.findAll({
                    where: {
                        userId: id,
                    }, raw: true
                })
                    .then(function (userrows) {
                    // console.log(userrows, "-----");
                    return (userrows);
                }).catch(function (error) {
                    return (error.name);
                });
                return [2 /*return*/, userdata];
            });
        });
    };
    AlertsRepositoryNew.prototype.altersHistory = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tables.alertsHistory.findAll({
                            where: {
                                source: source,
                            },
                            order: [
                                ["insertedTime", "DESC"]
                            ],
                            limit: 50,
                            raw: true
                        }).then(function (rows) {
                            var logrows = JSON.stringify(rows);
                            LogUtils_1.logger.info("getEsmeData: Success ==>", JSON.stringify(logrows));
                            rows.forEach(function (row) {
                                var dt = datetime.create(row.insertedTime);
                                row.insertedTime = dt.format("Y-m-d H:M:S");
                            });
                            return rows;
                        }).catch(function (error) {
                            LogUtils_1.logger.error("getEsmeDatat: Failed ==>", JSON.stringify(error));
                            return JSON.stringify(error.name);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsRepositoryNew.prototype.consumeAlerts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(qUtils_1.qconnection.subscribe(ProcessEnv.ProcessEnvQ._alert_q, function (body, headers) {
                        LogUtils_1.logger.info("consumer started on " + ProcessEnv.ProcessEnvQ._alert_q);
                        var object = new AlertMessage_1.AlertMessage(body);
                        var user_id = object._name.substring(0, object._name.indexOf("-"));
                        var sessionid = object._name.substr(object._name.indexOf("-") + 1);
                        LogUtils_1.logger.info("Alert from Queue =>", object);
                        var type;
                        if (object._source == "SERVER") {
                            type = tables.esmeMaster;
                        }
                        else if (object._source == "CLIENT") {
                            type = tables.smscMaster;
                        }
                        var alertmaster = type.upsert({ bindtype: object._bindtype, host: object._host, userId: user_id, port: object._port, source: object._source, status: object._status, systemId: object._systemid, sessionId: sessionid, name: object._name, time: object._date }).then((function (result) {
                            // logs.info(result);
                            LogUtils_1.logger.info("Inserted into Table");
                            return result;
                        }));
                        var alerthistory = tables.alertsHistory.create({ bindtype: object._bindtype, host: object._host, userId: user_id, port: object._port, source: object._source, status: object._status, systemId: object._systemid, sessionId: sessionid, name: object._name, time: object._date }).then((function (result) {
                            LogUtils_1.logger.info("Inserted into History Table");
                            return result;
                        })).catch(function (err) {
                            LogUtils_1.logger.error("consumeAlerts==>", err);
                        });
                        LogUtils_1.logger.info("Alert Queue consumed and processed ==>", alertmaster);
                        return Promise.resolve(body);
                    }))];
            });
        });
    };
    var _a;
    AlertsRepositoryNew = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [typeof (_a = typeof AlertsData_1.AlertsData !== "undefined" && AlertsData_1.AlertsData) === "function" && _a || Object])
    ], AlertsRepositoryNew);
    return AlertsRepositoryNew;
}());
exports.AlertsRepositoryNew = AlertsRepositoryNew;
