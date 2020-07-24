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
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var sequelizer = require("sequelize");
var LogUtils_1 = require("../utils/LogUtils");
var tables = dbTables.getModels(dbUtils_1.connect);
var loadash = require("lodash");
var MemDb_1 = require("../utils/MemDb");
var datetime = require("node-datetime");
var AlertsRepository = /** @class */ (function () {
    // constructor(private alertsdata: AlertsData) {
    // }
    function AlertsRepository() {
    }
    AlertsRepository.prototype.getDataSmsc = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tables.smscMaster.findAll({ attributes: [
                                'Source',
                                'userId',
                                'SystemId',
                                'port',
                                'host',
                                'bindtype',
                                [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('Time'), 'dd-MM-yyyy HH:mm:ss'), 'Time'],
                                'Status',
                                'sessionId',
                                'name',
                                [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('insertedTime'), 'dd-MM-yyyy HH:mm:ss'), 'insertedTime']
                            ],
                            order: [
                                ['userId', 'DESC'],
                            ],
                            raw: true
                        }).then(function (records) {
                            LogUtils_1.logger.info("records date format:===>", records);
                            return records;
                        }).catch(function (err) {
                            LogUtils_1.logger.info("getDataSmsc: Error :", err);
                            return err;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsRepository.prototype.getDataEsme = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tables.esmeMaster.findAll({ attributes: [
                                'Source',
                                'userId',
                                'SystemId',
                                'port',
                                'host',
                                'bindtype',
                                [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('Time'), 'dd-MM-yyyy HH:mm:ss'), 'Time'],
                                'Status',
                                'sessionId',
                                'name',
                                [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('insertedTime'), 'dd-MM-yyyy HH:mm:ss'), 'insertedTime']
                            ],
                            order: [
                                ['userId', 'DESC'],
                            ],
                            raw: true
                        }).then(function (records) {
                            //  logger.info("records date format:===>", records);
                            return records;
                        }).catch(function (err) {
                            LogUtils_1.logger.info("getDataEsme: Error :", err);
                            return err;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsRepository.prototype.esmeAlertsInformation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("esmeAlertsInformation: ==>");
                resp = this.getDataEsme();
                return [2 /*return*/, resp.then(function (records) {
                        LogUtils_1.logger.info("processEsmes ===>", records);
                        return _this.processEsmes(records);
                    })];
            });
        });
    };
    AlertsRepository.prototype.esmeAlertsInformationNew = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("esmeAlertsInformationNew: ==>");
                resp = this.getDataEsme();
                return [2 /*return*/, resp.then(function (records) {
                        var esmeList = [];
                        LogUtils_1.logger.info("esmeAlertsInformationNew: ===>");
                        return _this.processEsmes(records);
                    })];
            });
        });
    };
    AlertsRepository.prototype.processEsmes = function (records) {
        return __awaiter(this, void 0, void 0, function () {
            var esmeList, memDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        esmeList = [];
                        memDb = new MemDb_1.MemDb();
                        return [4 /*yield*/, loadash.chain(records).groupBy("userId")
                                .map(function (currentItem) {
                                var mainEsme = {};
                                var record = currentItem[0];
                                mainEsme.esmeId = record.userId;
                                mainEsme.esmeName = memDb.getUserNameByUserId(record.userId);
                                mainEsme.systemId = record.systemId;
                                mainEsme.port = record.port;
                                mainEsme.host = record.host;
                                var trxCount = 0;
                                var trCount = 0;
                                var rxCount = 0;
                                var connectedCount = 0;
                                var failedCount = 0;
                                var tot = 0;
                                LogUtils_1.logger.info("processEsmes:Row count :", currentItem.length);
                                var sessions = [];
                                currentItem.forEach(function (row) {
                                    var session = {};
                                    //logger.info("Row :", row);
                                    if (row.bindtype === 'TRANSMITTER') {
                                        trCount++;
                                    }
                                    else if (row.bindtype === 'RECEIVER') {
                                        rxCount++;
                                    }
                                    else {
                                        trxCount++;
                                    }
                                    if (row.Status === 'CONNECTED') {
                                        connectedCount++;
                                    }
                                    else {
                                        failedCount++;
                                    }
                                    // tot++;
                                    session.bindMode = row.bindtype;
                                    session.sessionId = row.sessionId;
                                    session.status = row.Status;
                                    session.time = row.Time;
                                    sessions.push(session);
                                });
                                mainEsme.trx = trxCount;
                                mainEsme.tx = trCount;
                                mainEsme.rx = rxCount;
                                mainEsme.cCount = connectedCount;
                                mainEsme.fCount = failedCount + connectedCount;
                                mainEsme.sessionList = sessions;
                                esmeList.push(mainEsme);
                            }).value()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, esmeList];
                }
            });
        });
    };
    AlertsRepository.prototype.processSmsc = function (records) {
        return __awaiter(this, void 0, void 0, function () {
            var esmeList, memDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        esmeList = [];
                        memDb = new MemDb_1.MemDb();
                        return [4 /*yield*/, loadash.chain(records).groupBy("userId")
                                .map(function (currentItem) {
                                var mainEsme = {};
                                var record = currentItem[0];
                                mainEsme.esmeId = record.userId;
                                mainEsme.esmeName = memDb.getSystemIdBySmscId(record.userId);
                                mainEsme.systemId = record.systemId;
                                mainEsme.port = record.port;
                                mainEsme.host = record.host;
                                var trxCount = 0;
                                var trCount = 0;
                                var rxCount = 0;
                                var connectedCount = 0;
                                var failedCount = 0;
                                var tot = 0;
                                LogUtils_1.logger.info("processEsmes:Row count :", currentItem.length);
                                var sessions = [];
                                currentItem.forEach(function (row) {
                                    var session = {};
                                    //logger.info("Row :", row);
                                    if (row.bindtype === 'TRANSMITTER') {
                                        trCount++;
                                    }
                                    else if (row.bindtype === 'RECEIVER') {
                                        rxCount++;
                                    }
                                    else {
                                        trxCount++;
                                    }
                                    if (row.Status === 'CONNECTED') {
                                        connectedCount++;
                                    }
                                    else {
                                        failedCount++;
                                    }
                                    // tot++;
                                    session.bindMode = row.bindtype;
                                    session.sessionId = row.sessionId;
                                    session.status = row.Status;
                                    session.time = row.Time;
                                    sessions.push(session);
                                });
                                mainEsme.trx = trxCount;
                                mainEsme.tx = trCount;
                                mainEsme.rx = rxCount;
                                mainEsme.cCount = connectedCount;
                                mainEsme.fCount = failedCount + connectedCount;
                                mainEsme.sessionList = sessions;
                                esmeList.push(mainEsme);
                            }).value()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, esmeList];
                }
            });
        });
    };
    AlertsRepository.prototype.smscAlertsInformation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                resp = this.getDataSmsc();
                return [2 /*return*/, resp.then(function (records) {
                        var esmeList = [];
                        LogUtils_1.logger.info("smscAlertsInformation: processEsmesNew ===>", esmeList);
                        return _this.processSmsc(records);
                    })];
            });
        });
    };
    AlertsRepository.prototype.getUserData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userdata;
            return __generator(this, function (_a) {
                userdata = tables.esmeMaster.findAll({
                    where: {
                        userId: id,
                    }, raw: true
                })
                    .then(function (userrows) {
                    // logger.info(userrows, "-----");
                    return (userrows);
                }).catch(function (error) {
                    LogUtils_1.logger.info("getUserData=>", error.name);
                    return (error.name);
                });
                return [2 /*return*/, userdata];
            });
        });
    };
    AlertsRepository.prototype.altersHistory = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tables.alertsHistory.findAll({ attributes: [
                                'Source',
                                'userId',
                                ['SystemId', 'systemId'],
                                'port',
                                'host',
                                'bindtype',
                                [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('Time'), 'dd-MM-yyyy HH:mm:ss'), 'time'],
                                ['Status', 'status'],
                                'sessionId',
                                'name',
                                [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('insertedTime'), 'dd-MM-yyyy HH:mm:ss'), 'insertedTime']
                            ],
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
                            LogUtils_1.logger.info("altersHistory: Success ==>", JSON.stringify(logrows));
                            // rows.forEach(row => {
                            //     let dt = datetime.create(row.insertedTime);
                            //     row.insertedTime = dt.format("Y-m-d H:M:S");
                            // });
                            return rows;
                        }).catch(function (error) {
                            LogUtils_1.logger.error("altersHistory: Failed ==>", JSON.stringify(error));
                            return JSON.stringify(error.name);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsRepository.prototype.getThrottleCount = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            var dateTime, dt, currentdate, query, startdate, enddate, smsccon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LogUtils_1.logger.info("getThrottleCount:=>");
                        dateTime = require("node-datetime");
                        dt = dateTime.create();
                        currentdate = dt.format("Y-m-d");
                        query = "";
                        startdate = source.startdate;
                        enddate = source.enddate;
                        smsccon = "";
                        if (source.type === "today") {
                            if (source.smscid === 'NA') {
                                smsccon = "";
                            }
                            else {
                                smsccon = "and a.SmscId = :smscid";
                            }
                            LogUtils_1.logger.info("getThrottleCount:=> Today, type:", smsccon);
                            query = " select a.smscid as 'smscid' ,c.SMSCName as 'smscname',d.VendorName as 'Operator',a.Outboundsender as 'Sender',Count(*) as 'ThrottleErrorCount',b.ThroughPut as 'TPSinDB' from Gateway.dbo.InvalidSubmitSM a  left join Synapse.dbo.Smscsmpp b on a.Smscid=b.SmscId left join Synapse.dbo.SmscMaster c on a.smscId = c.Id left  join Synapse.dbo.Vendors d on c.VendorId = d.Id where Sentdate between :startdate  and :enddate " + smsccon + " group by a.smscid,c.SMSCName,d.VendorName,a.Outboundsender,b.ThroughPut";
                            startdate = currentdate + " 00:00:00";
                            enddate = currentdate + " 23:59:59";
                        }
                        else {
                            LogUtils_1.logger.info("getThrottleCount:=> Custom, type:", smsccon);
                            if (source.smscid != 'NA') {
                                smsccon = "";
                            }
                            else {
                                smsccon = "and a.SmscId = :smscid";
                            }
                            query = " select a.smscid as 'smscid',c.SMSCName as 'smscname',d.VendorName as 'Operator',a.Outboundsender as 'Sender',a.Count as 'ThrottleErrorCount',b.ThroughPut as 'TPSinDB' from Gateway.dbo.VM_MIS_Outgoing_Summary a left join Synapse.dbo.Smscsmpp b on a.Smscid=b.SmscId left join Synapse.dbo.SmscMaster c on a.smscId = c.Id left  join Synapse.dbo.Vendors d on c.VendorId = d.Id where Submitdate between :startdate and :enddate";
                        }
                        return [4 /*yield*/, dbUtils_1.connect.query(query, {
                                replacements: { startdate: startdate,
                                    enddate: enddate,
                                    smscid: source.smscid },
                                type: dbUtils_1.connect.QueryTypes.SELECT
                            })
                                .then(function (records) {
                                LogUtils_1.logger.info("getThrottleCount: recourds count:=>", records.length);
                                if (records.length > 0) {
                                    return records;
                                }
                                else {
                                    return null;
                                }
                            }).catch(function (error) {
                                LogUtils_1.logger.error("getThrottleCount: =>", error);
                                return JSON.stringify(error.name);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AlertsRepository.prototype.getSMSCId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var smscwithKey, memDb, smscdata;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getSMSCID:=>");
                smscwithKey = [];
                memDb = new MemDb_1.MemDb();
                smscdata = memDb.getAllSMSCs();
                smscdata.forEach(function (element) {
                    var smsclist = {};
                    smsclist.smscId = element.smscId;
                    smsclist.smscName = element.name;
                    smsclist.key = element.name + "(" + element.smscId + ")";
                    // smscdata.smscId = oldsmscdata.ssmscId;
                    smscwithKey.push(smsclist);
                });
                LogUtils_1.logger.info("getSMSCID:=>", smscwithKey.length);
                return [2 /*return*/, smscwithKey];
            });
        });
    };
    AlertsRepository.prototype.getThrottleHistory = function (shortcodeid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AlertsRepository.prototype.consumeAlerts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AlertsRepository = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [])
    ], AlertsRepository);
    return AlertsRepository;
}());
exports.AlertsRepository = AlertsRepository;
