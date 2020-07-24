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
var CampaignResume_1 = require("../utils/CampaignResume");
var qUtils_1 = require("../utils/qUtils");
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var redisUtils_1 = require("../utils/redisUtils");
var tables = dbTables.getModels(dbUtils_1.connect);
var LogUtils_1 = require("../utils/LogUtils");
var EmailUtils_1 = require("../utils/EmailUtils");
var CampaignUtils_1 = require("../utils/CampaignUtils");
var dateTime = require('node-datetime');
// const datetime = require("node-datetime");
var dt = dateTime.create();
var edate = dt.format('Y-m-d H:M:S');
var CampaignResumeRepository = /** @class */ (function () {
    function CampaignResumeRepository(campaignpublishtoqueue) {
        this.campaignpublishtoqueue = campaignpublishtoqueue;
    }
    CampaignResumeRepository.prototype.getAllCampaignsData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getAllCampaignRecords()];
            });
        });
    };
    CampaignResumeRepository.prototype.resumeCampaign = function (value, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LogUtils_1.logger.info("resumeCampaign: ==>", value);
                        return [4 /*yield*/, this.getCampaignRecords(value.getCampaignId())
                                .then(function (rows) {
                                if (rows.length === 0) {
                                    LogUtils_1.logger.info("resumeCampaign: failed ==>", value.getCampaignId());
                                    return new CampaignResume_1.CampaignResumeErrorMessage(false, "Duplicate/Invalid Request");
                                }
                                else {
                                    LogUtils_1.logger.info("resumeCampaign: success ==>", value.getCampaignId());
                                    _this.resumeCampaignData(value, rows[0].messagesCount, rows[0].campaignType, luserName);
                                    return new CampaignResume_1.CampaignResumeErrorMessage(true, "In Process");
                                }
                            }).catch(function (error) {
                                LogUtils_1.logger.error("resumeCampaign: failed ==>", error);
                                return new CampaignResume_1.CampaignResumeErrorMessage(false, error.name);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CampaignResumeRepository.prototype.resumeCampaignData = function (value, rCid, rctype, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var recordscount, _loop_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LogUtils_1.logger.info("resumeCampaignData: value ==>", value);
                        recordscount = Math.ceil(rCid / 10000);
                        // if (rCid <= 10000){
                        //   recordscount = rCid
                        // } else {
                        //    recordscount = rCid / 10000;
                        // }
                        this.campaignpublishtoqueue.updateCTT(value.getCampaignId(), rctype);
                        _loop_1 = function (i) {
                            var lowerLimit, upperLimit;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        lowerLimit = i * 10000;
                                        upperLimit = 10000;
                                        return [4 /*yield*/, tables.campaignSctt.findAll({
                                                // attributes: [
                                                //   [sequelize.fn('convert(varchar,', sequelize.col('Sentdate'), 113), 'sentdate']
                                                // ],
                                                where: {
                                                    campaignId: value.getCampaignId()
                                                },
                                                offset: lowerLimit,
                                                limit: upperLimit,
                                                raw: true
                                            }).then(function (rows) {
                                                // rows.forEach( row =>{
                                                //    logger.info("resumeCampaignData: row ==>", row.sentdate);
                                                // });
                                                var stat = 1;
                                                if (i === recordscount - 1 || i === recordscount) {
                                                    stat = 2;
                                                }
                                                else {
                                                    stat = stat;
                                                }
                                                if (i === (recordscount - 1)) {
                                                    var emailalerts = new EmailUtils_1.EmailAlerts();
                                                    var emailparams = {};
                                                    emailparams.param1 = value.getCampaignId();
                                                    emailparams.param2 = value.getCount();
                                                    emailparams.param3 = rCid;
                                                    emailparams.username = luserName;
                                                    emailparams.time = edate;
                                                    emailparams.type = 5;
                                                    emailalerts.emailAlerts(emailparams);
                                                }
                                                _this.campaignpublishtoqueue.publishCampaign(rows, value.getCampaignId(), stat, rctype, "", "");
                                            }).catch(function (error) {
                                                LogUtils_1.logger.error("resumeCampaignData: Failed ==>", JSON.stringify(error));
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= recordscount)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CampaignResumeRepository.prototype.getAllCampaignRecords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var d, ctoCampaignslist, that, date, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        d = new Date();
                        ctoCampaignslist = [];
                        that = this;
                        d.setDate(d.getDate() - 5);
                        date = d.toISOString().replace(/\..+/, "");
                        return [4 /*yield*/, tables.campaignCtoStatus.findAll({
                                attributes: [
                                    'campaignId',
                                    'campaignType',
                                    'messagesCount',
                                    'status',
                                    [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('insertTime'), 'dd-MM-yyyy HH:mm:ss'), 'insertTime'],
                                    'processedCount',
                                    [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('resumedTime'), 'dd-MM-yyyy HH:mm:ss'), 'resumedTime']
                                ],
                                where: {
                                    insertTime: {
                                        $gt: date
                                    }
                                }, raw: true
                            })
                                .then(function (rows) {
                                LogUtils_1.logger.info("getAllCampaignRecords: success ==>", rows);
                                if (rows.length > 0) {
                                    rows.forEach(function (row) {
                                        var ctoCamppaigns = {};
                                        ctoCamppaigns.campaignId = row.campaignId;
                                        // ctoCamppaigns.campaignTypeid = row.campaignType;
                                        if (row.campaignType === 1) {
                                            ctoCamppaigns.campaignType = "Non-Scheduled";
                                            ctoCamppaigns.insertTime = row.insertTime;
                                        }
                                        else if (row.campaignType === 2) {
                                            ctoCamppaigns.campaignType = "Scheduled";
                                            ctoCamppaigns.insertTime = row.insertTime;
                                        }
                                        else {
                                            ctoCamppaigns.campaignType = "Blocked";
                                            ctoCamppaigns.insertTime = "-";
                                        }
                                        ctoCamppaigns.messagesCount = row.messagesCount;
                                        ctoCamppaigns.processedCount = row.processedCount;
                                        ctoCamppaigns.status = row.status;
                                        if (row.status === 0) {
                                            ctoCamppaigns.resumedTime = '-';
                                        }
                                        else {
                                            ctoCamppaigns.resumedTime = row.resumedTime;
                                        }
                                        ctoCampaignslist.push(ctoCamppaigns);
                                    });
                                    return that.checkCtoTime(ctoCampaignslist);
                                }
                                // rows.forEach(row => {
                                //   let dt = datetime.create(row.insertTime);
                                //   row.insertTime = dt.format("Y-m-d H:M:S");
                                // })
                                return (rows);
                            }).catch(function (error) {
                                LogUtils_1.logger.error("getAllCampaignRecords: failed ==>", error);
                                var data = JSON.parse(error);
                                return data;
                            })];
                    case 1:
                        resp = _a.sent();
                        console.log("resp =>", resp);
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    CampaignResumeRepository.prototype.checkCtoTime = function (ctoCampaignslist) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            return __generator(this, function (_a) {
                promises = [];
                ctoCampaignslist.forEach(function (row) {
                    promises.push(dbUtils_1.synapseDBconnect.query("SELECT  *  FROM [Synapse].[dbo].[CampaignTypeTimeMap] where CampaignTypeId = 1", {
                        //          replacements: { ctypeid: 1 },
                        type: dbUtils_1.connect.QueryTypes.SELECT,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.info("checkCtoTime: =>", result);
                        if (result.length > 0) {
                            var date = new Date();
                            var current_hour = date.getHours();
                            var starttime = result[0].FromTime;
                            var endtime = result[0].ToTime;
                            starttime = starttime.substr(0, starttime.indexOf(':'));
                            endtime = endtime.substr(0, endtime.indexOf(':'));
                            LogUtils_1.logger.info("times===>", starttime, endtime, current_hour);
                            if (current_hour > starttime && current_hour < endtime) {
                                row.ctostatus = 0;
                                return row;
                            }
                            else {
                                row.ctostatus = 1;
                                return row;
                            }
                        }
                        else {
                            row.ctostatus = 0;
                            return row;
                        }
                    }).catch(function (err) {
                        LogUtils_1.logger.error("getBlockedCampaignRecords:check ctostatus: =>", err);
                        return err;
                    }));
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Promise.all(promises).then(function (data) {
                            //console.log("=========>", data);
                            resolve(data);
                        });
                    })];
            });
        });
    };
    CampaignResumeRepository.prototype.getCampaignRecords = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LogUtils_1.logger.info("getCampaignRecords: =>", campaignId);
                        return [4 /*yield*/, tables.campaignCtoStatus.findAll({
                                attributes: [
                                    'campaignId',
                                    'campaignType',
                                    'messagesCount',
                                    'status',
                                    [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('insertTime'), 'dd-MM-yyyy HH:mm:ss'), 'insertTime'],
                                    'processedCount',
                                    [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('resumedTime'), 'dd-MM-yyyy HH:mm:ss'), 'resumedTime']
                                ],
                                where: { campaignId: campaignId, status: 0 },
                                raw: true
                            })
                                .then(function (rows) {
                                LogUtils_1.logger.info("getAllCampaignRecords: Succeds ==>", rows);
                                // rows.forEach(row => {
                                //   let dt = datetime.create(row.insertTime);
                                //   row.insertTime = dt.format("Y-m-d H:M:S");
                                // });
                                return (rows);
                            }).catch(function (error) {
                                var data = JSON.parse(error);
                                LogUtils_1.logger.error("getAllCampaignRecords: Failed: error ==>", error);
                                return data;
                            })];
                    case 1:
                        resp = _a.sent();
                        console.log("resp =>", resp);
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    CampaignResumeRepository.prototype.getBlockedCampaignRecords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockCampaignsList, that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockCampaignsList = [];
                        that = this;
                        return [4 /*yield*/, dbUtils_1.connect.query("select  incomingusername,outboundsender,count(*) as 'count', CampaignId as campaignId from CampaignSCTT where Sentdate between concat(REPLACE(CONVERT(VARCHAR, DATEADD(dd, -3, GETDATE()), 102), '.', '-'),' 00:00:00') and concat(REPLACE(CONVERT(VARCHAR, DATEADD(dd, 0, GETDATE()), 102), '.', '-'),' 23:59:59') and modulename='block' group by incomingusername,outboundsender, CampaignId", { type: dbUtils_1.connect.QueryTypes.SELECT })
                                .then(function (records) {
                                LogUtils_1.logger.info("getBlockedCampaignRecords: blocked campaigns:=>", records.length);
                                if (records.length > 0) {
                                    records.forEach(function (record) {
                                        var blockedCampaigns = {};
                                        blockedCampaigns.campaignId = record.campaignId;
                                        blockedCampaigns.incomingusername = record.incomingusername;
                                        blockedCampaigns.outboundsender = record.outboundsender;
                                        blockedCampaigns.count = record.count;
                                        blockCampaignsList.push(blockedCampaigns);
                                    });
                                    return that.checkBlockCampaign(blockCampaignsList);
                                }
                                else {
                                    return blockCampaignsList;
                                }
                            }).catch(function (error) {
                                LogUtils_1.logger.error("getBlockedCampaignRecords: =>", error.err);
                                return blockCampaignsList;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CampaignResumeRepository.prototype.checkBlockCampaign = function (blockCampaignsList) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            return __generator(this, function (_a) {
                promises = [];
                blockCampaignsList.forEach(function (row) {
                    promises.push(tables.campaignCtoStatus.findAll({
                        where: { campaignId: row.campaignId }
                    }).then(function (result) {
                        if (result.length > 0) {
                            LogUtils_1.logger.error("getBlockedCampaignRecords: checkBlockCampaigns: =>", result.length);
                            row.status = 1;
                            return row;
                        }
                        else {
                            row.status = 0;
                            return row;
                        }
                    }).catch(function (err) {
                        LogUtils_1.logger.error("getBlockedCampaignRecords:check ctostatus: =>", err);
                        return err;
                    }));
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Promise.all(promises).then(function (data) {
                            resolve(data);
                        });
                    })];
            });
        });
    };
    CampaignResumeRepository.prototype.resumeBlockedCampaignRecords = function (resumeBlockedCampaigns, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var dt, formatted, that, recordscount, redisClient, campaignutils;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("Resume request:resumeBlockedCampaignRecords: Id", resumeBlockedCampaigns.getCampaignId());
                dt = dateTime.create();
                formatted = dt.format('Y-m-d H:M:S');
                that = this;
                recordscount = Math.ceil(resumeBlockedCampaigns.getCount() / 10000);
                redisClient = new redisUtils_1.RedisClient();
                campaignutils = new CampaignUtils_1.CampaignUtils();
                return [2 /*return*/, redisClient.checkBlockStatus(resumeBlockedCampaigns.getKey())
                        .then(function (result) {
                        if (result === 1) {
                            LogUtils_1.logger.info("resumeBlockedCampaignRecords: user and senderid blocked.");
                            return new CampaignResume_1.CampaignResumeErrorMessage(false, "Please unblock senderid");
                        }
                        else {
                            return campaignutils.blockCampaignCheckDuplicate(resumeBlockedCampaigns)
                                .then(function (campstatus) {
                                if (campstatus != 0) {
                                    //  resumeBlockedCampaigns.getCount = campstatus;
                                    LogUtils_1.logger.info("resumeBlockedCampaign: Success: campaign processed");
                                    campaignutils.processCampaign(resumeBlockedCampaigns, campstatus, luserName);
                                    return new CampaignResume_1.CampaignResumeErrorMessage(true, "Successfully resumed");
                                }
                                else {
                                    LogUtils_1.logger.info("resumeBlockedCampaign: Failed: campaign already processed");
                                    return new CampaignResume_1.CampaignResumeErrorMessage(false, "Duplicate Request");
                                }
                            });
                        }
                    }).catch(function (err) {
                        LogUtils_1.logger.info("resumeBlockedCampaign", err);
                        return new CampaignResume_1.CampaignResumeErrorMessage(false, "Please unblock senderid");
                    })];
            });
        });
    };
    var _a;
    CampaignResumeRepository = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [typeof (_a = typeof qUtils_1.CampaignPublishToQueue !== "undefined" && qUtils_1.CampaignPublishToQueue) === "function" && _a || Object])
    ], CampaignResumeRepository);
    return CampaignResumeRepository;
}());
exports.CampaignResumeRepository = CampaignResumeRepository;
