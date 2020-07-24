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
var util_1 = require("util");
var ProcessEnv = require("../config/config");
var requestify = require("requestify");
var LogUtils_1 = require("../utils/LogUtils");
var dbUtils_1 = require("../utils/dbUtils");
var redisUtils_1 = require("../utils/redisUtils");
var EmailUtils_1 = require("../utils/EmailUtils");
var fs = require("fs");
var dateTime = require('node-datetime');
var readline = require("readline");
var Promiser = require("bluebird");
var csvData = [];
var pushData = [];
var DnddnsRepository = /** @class */ (function () {
    function DnddnsRepository(redisClient) {
        this.redisClient = redisClient;
        this.process = function processByMsisdn(msisdn, results, cb) {
            LogUtils_1.logger.info("process: => Redis %s  results=> %s", msisdn, results);
            var pri1 = redisUtils_1.RedisClient.prototype.findStatusByRef(msisdn, redisUtils_1.RefType.VIP);
            var pri2 = redisUtils_1.RedisClient.prototype.findStatusByRef(msisdn, redisUtils_1.RefType.DND);
            var pri3 = redisUtils_1.RedisClient.prototype.findStatusByRef(msisdn, redisUtils_1.RefType.DNS);
            Promise.all([pri1, pri2, pri3]).then(function (values) {
                LogUtils_1.logger.info("process: => processByMsisdn ==>", values);
                var result = { number: msisdn, gdnd: values[0], dnd: values[1], dns: values[2] };
                results.push(result);
                cb(results);
            }).catch(function (error) {
                LogUtils_1.logger.error("process: processByMsisdn ==>", error);
                return '{Status: "Failed"}';
            });
        };
    }
    DnddnsRepository.prototype.dnddnsProcess = function (dnsProcess, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var successcount, fileParams, dbfile, fileId, fileCount, files, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        successcount = 0;
                        return [4 /*yield*/, dbUtils_1.connect.query("Select action, filePath, type, count from DnsFileUpload where id = :id ", {
                                replacements: { id: dnsProcess.getFileId() },
                                type: dbUtils_1.connect.QueryTypes.SELECT,
                                raw: true
                            }).then(function (result) {
                                return result;
                            }).catch(function (error) {
                                LogUtils_1.logger.error("dnddnsProcess: ==>", error);
                                return '{Status: "Failed"}';
                            })];
                    case 1:
                        fileParams = _a.sent();
                        dbfile = fileParams[0].filePath;
                        fileId = fileParams[0].id;
                        fileCount = fileParams[0].count;
                        files = [
                            dbfile.trim()
                        ]
                            .map(function (f) { return _this.fillArrayWithFileData(f); });
                        promises = [];
                        return [2 /*return*/, Promise
                                .all(files)
                                .then(function (result) {
                                csvData = result[0];
                                _this.updateStatus(dnsProcess.getFileId(), 1);
                                var promises = [];
                                for (var i = 0; i < csvData.length; i++) {
                                    var trimmsisdn = csvData[i].trim();
                                    if (trimmsisdn != "" && !isNaN(trimmsisdn)) {
                                        pushData.push(trimmsisdn);
                                    }
                                    if ((i % 10000 == 0 || i === (csvData.length - 1))) {
                                        var action = fileParams[0].action;
                                        var tableName = fileParams[0].type;
                                        var requestObject = { action: action.trim(), tableName: tableName.trim(), msisdns: pushData };
                                        promises.push(_this.dnsSubmit(requestObject, dnsProcess.getFileId())
                                            .then(function (scount) {
                                            successcount = successcount + Number(scount);
                                            LogUtils_1.logger.info("Responce count ++ =>", successcount);
                                            DnddnsRepository.prototype.updateCount(dnsProcess.getFileId(), scount)
                                                .then(function (result) {
                                                LogUtils_1.logger.info("Dnsresponse updated to DB", result);
                                            })
                                                .catch(function (err) {
                                                LogUtils_1.logger.info("Dnsresponse updated to DB: failed=>", util_1.error);
                                            });
                                        })
                                            .catch(function (error) {
                                            LogUtils_1.logger.info("", error);
                                        }));
                                        LogUtils_1.logger.info("dnddnsProcess: msisdns submitted:", i);
                                        pushData = [];
                                    }
                                    // if (i === (csvData.length - 1)) {
                                    //     this.updateStatus(dnsProcess.getFileId(), 2);
                                    // }
                                }
                                new Promise(function (resolve, reject) {
                                    Promise.all(promises).then(function (data) {
                                        var dt = dateTime.create();
                                        var date = dt.format('Y-m-d H:M:S');
                                        var emailalerts = new EmailUtils_1.EmailAlerts();
                                        var emailparams = {};
                                        emailparams.param1 = fileParams[0].type;
                                        emailparams.param2 = fileParams[0].action;
                                        emailparams.param3 = fileParams[0].count;
                                        emailparams.username = luserName;
                                        emailparams.time = date;
                                        emailparams.type = 3;
                                        emailparams.filename = fileParams[0].filePath;
                                        emailparams.id = successcount;
                                        emailalerts.emailAlerts(emailparams);
                                        resolve(data);
                                    })
                                        .catch(function (err) {
                                        var dt = dateTime.create();
                                        var date = dt.format('Y-m-d H:M:S');
                                        var emailalerts = new EmailUtils_1.EmailAlerts();
                                        var emailparams = {};
                                        emailparams.param1 = fileParams[0].type;
                                        emailparams.param2 = fileParams[0].action;
                                        emailparams.param3 = fileParams[0].count;
                                        emailparams.username = luserName;
                                        emailparams.time = date;
                                        emailparams.type = 3;
                                        emailparams.id = successcount;
                                        emailalerts.emailAlerts(emailparams);
                                        LogUtils_1.logger.error("DND/DNS single number failed:", err);
                                    });
                                });
                                //   this.updatetoDb();
                                LogUtils_1.logger.info("dnddnsProcess: count ==>", csvData.length);
                                LogUtils_1.logger.info("dnddnsProcess: success ==>", csvData.length);
                                return { Status: "Success", Message: "File Processing" };
                            }).catch(function (error) {
                                LogUtils_1.logger.error("dnddnsProcess: ==> Excep", error);
                                return { Status: "Success", Message: "File Processing" };
                            })];
                }
            });
        });
    };
    DnddnsRepository.prototype.fillArrayWithFileData = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var array = [];
                        var finalfilepath = (ProcessEnv.ProcessEnvDnd._fileFolder + file);
                        var rl = readline.createInterface({
                            input: fs.createReadStream(finalfilepath, "utf-8")
                        });
                        rl.on("line", function (line) {
                            array.push(line);
                        });
                        rl.on("close", function () {
                            return resolve(array);
                        });
                    })];
            });
        });
    };
    DnddnsRepository.prototype.updateStatus = function (fileid, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dbUtils_1.connect.query("UPDATE DnsFileUpload SET status = :status WHERE id = :id", {
                        replacements: { status: status, id: fileid },
                        type: dbUtils_1.connect.QueryTypes.UPDATE,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.info("update status: success");
                        return result;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("updatestatus: failed ==>", error);
                        return error;
                    })];
            });
        });
    };
    DnddnsRepository.prototype.updateCount = function (fileid, sCount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dbUtils_1.connect.query("UPDATE DnsFileUpload SET successCount = successCount + :count, status = 2 WHERE id = :id", {
                        replacements: { count: sCount, id: fileid },
                        type: dbUtils_1.connect.QueryTypes.UPDATE,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.info("updateCount: success=>", fileid, sCount);
                        return result;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("updateCount: failed ==>", error);
                        return error;
                    })];
            });
        });
    };
    DnddnsRepository.prototype.getAllFileHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dbUtils_1.connect.query("SELECT TOP 20 id, loginuserId, action, type, filepath, count, status, convert(varchar,insertedTime,105) +  ' '  + convert(VARCHAR(8), insertedTime, 14) as insertedTime, successCount as processedCount FROM DnsFileUpload ORDER BY id DESC", {
                        type: dbUtils_1.connect.QueryTypes.SELECT,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.info("getAllFileHistory: success ==>", result);
                        return result;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("getAllFileHistory: failed ==>", error.name);
                        return error;
                    })];
            });
        });
    };
    DnddnsRepository.prototype.dnsSubmit = function (item, fileId) {
        LogUtils_1.logger.info("Request:", item);
        return requestify.request(ProcessEnv.ProcessEnvDnd._url, { method: "POST", body: item, headers: { "ContentType": "application/json" }, timeout: 200000 })
            .then(function (response) {
            // logger.info("=====>", response.body)
            var respBody = JSON.parse(response.body);
            LogUtils_1.logger.info("dnsSubmit: Success =>", respBody.message);
            return respBody.message;
        }).catch(function (error) {
            LogUtils_1.logger.error("dnsSubmit: failed =>", error);
            // return ({Status: false, Message:"Service not active"});
        });
    };
    DnddnsRepository.prototype.processSingleNumber = function (updatenumber, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var requestObject;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("processSingleNumber: =>", updatenumber);
                requestObject = { action: updatenumber.getAction(), tableName: updatenumber.getType(), msisdns: [updatenumber.getMsisdns()] };
                return [2 /*return*/, Promise.resolve(requestify.request(ProcessEnv.ProcessEnvDnd._url, { method: "POST", body: requestObject, headers: { "ContentType": "application/json" } })
                        .then(function (response) {
                        LogUtils_1.logger.info("processSingleNumber: =>", response.body);
                        var dt = dateTime.create();
                        var date = dt.format('Y-m-d H:M:S');
                        var emailalerts = new EmailUtils_1.EmailAlerts();
                        var emailparams = {};
                        emailparams.param1 = updatenumber.getType();
                        emailparams.param2 = updatenumber.getAction();
                        emailparams.param3 = updatenumber.getMsisdns();
                        emailparams.username = luserName;
                        emailparams.time = date;
                        emailparams.type = 4;
                        emailalerts.emailAlerts(emailparams);
                        return { Status: "Success", Message: response.body.message };
                    }).catch(function (error) {
                        LogUtils_1.logger.error("processSingleNumber: => DND/DNS Request failed", error);
                        return error;
                    })).catch(function (error) {
                        LogUtils_1.logger.error("processSingleNumber: => DND/DNS Request failed", error);
                        return error;
                    })];
            });
        });
    };
    DnddnsRepository.prototype.updateNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DnddnsRepository.prototype.checkStatus = function (checkStatus, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var results, msisdnarray;
            var _this = this;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("checkStatus: =>", checkStatus.numbers);
                results = [];
                msisdnarray = [];
                checkStatus.numbers.split(",").forEach(function (number) {
                    if (number.length > 6) {
                        if (msisdnarray.indexOf(number) == -1) {
                            msisdnarray.push(number);
                        }
                        else {
                            LogUtils_1.logger.info("Repeated numbers");
                        }
                    }
                });
                LogUtils_1.logger.info("checkStatus: MSISDN processed ==>", msisdnarray);
                return [2 /*return*/, msisdnarray.reduce(function (promise, msisdn) {
                        return promise.then(function () { return new Promise(function (resolve) {
                            _this.process(msisdn, results, resolve);
                            msisdnarray = [];
                        }); }).catch(function (error) {
                            LogUtils_1.logger.error("checkStatus: processByMsisdn ==>", error);
                            msisdnarray = [];
                            return '{Status: "Failed"}';
                        });
                    }, Promise.resolve())];
            });
        });
    };
    DnddnsRepository.prototype.saveFilePath = function (filename, count, loginuserId, action, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("saveFilePath: Uploded file count =>", count);
                return [2 /*return*/, dbUtils_1.connect.query("EXEC DndDnsInsert :loginid, :action, :type, :filepath, :count, :status", {
                        replacements: { loginid: loginuserId, action: action, type: type, filepath: filename, count: count, status: 0 },
                        type: dbUtils_1.connect.QueryTypes.SELECT,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.info("saveFilePath: success ==>", result[0].lastinsertid);
                        return result[0].lastinsertid;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("saveFilePath: failed ==>", error.name);
                        return error;
                    })];
            });
        });
    };
    DnddnsRepository.prototype.getAllDnsFileData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dbUtils_1.connect.query("SELECT * FROM DnsFileUpload", {
                        type: dbUtils_1.connect.QueryTypes.SELECT,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.info("getAllDnsFileData: success ==>:", result);
                        return result;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("getAllDnsFileData: failed ==>", error.name);
                        return error;
                    })];
            });
        });
    };
    return DnddnsRepository;
}());
exports.DnddnsRepository = DnddnsRepository;
