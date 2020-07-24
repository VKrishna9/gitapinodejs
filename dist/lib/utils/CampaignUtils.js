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
var sequelizeUtils_1 = require("./sequelizeUtils");
var LogUtils_1 = require("./LogUtils");
var dateTime = require('node-datetime');
var qUtils_1 = require("../utils/qUtils");
var EmailUtils_1 = require("./EmailUtils");
var dbUtils_1 = require("../utils/dbUtils");
var CampaignUtils = /** @class */ (function () {
    function CampaignUtils() {
    }
    CampaignUtils.prototype.blockCampaignCheckDuplicate = function (resumeBlockedCampaigns) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  blockCampaignCheckDuplicate");
                return [2 /*return*/, sequelizeUtils_1.tables.campaignCtoStatus.findAll({
                        where: { campaignId: resumeBlockedCampaigns.getCampaignId() },
                        raw: true
                    }).then(function (campstatus) {
                        if (campstatus.length > 0) {
                            LogUtils_1.logger.info("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  blockCampaignCheckDuplicate: exisis in [CTO_STATUS:" + campstatus.length + "] Failed");
                            return 0;
                        }
                        return _this.getBlockedCount(resumeBlockedCampaigns.getCampaignId())
                            .then(function (mastercount) {
                            LogUtils_1.logger.info("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  getMasterCount: [Mastercount: " + campstatus.length + "] ");
                            return mastercount;
                        }).catch(function (err) {
                            LogUtils_1.logger.error("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  getMasterCount: [Mastercount: " + err + "] ");
                            return 0;
                        });
                    }).then(function (resp) {
                        if (resp != 0) {
                            return _this.insertBlockedCampaignStatus(resumeBlockedCampaigns, resp)
                                .then(function (result) {
                                return resp;
                            })
                                .catch(function (err) {
                                LogUtils_1.logger.error("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  getMasterCount: [Mastercount: " + err + "] ");
                                return 0;
                            });
                        }
                    })
                        .catch(function (err) {
                        LogUtils_1.logger.error("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  getMasterCount: [Mastercount: " + err + "] ");
                        return false;
                    })];
            });
        });
    };
    CampaignUtils.prototype.insertBlockedCampaignStatus = function (resumeBlockedCampaigns, mastercount) {
        return __awaiter(this, void 0, void 0, function () {
            var that, dt, formatted;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("Resume request:  insertBlockedCampaignStatus: Id: ", resumeBlockedCampaigns.getCampaignId());
                that = this;
                dt = dateTime.create();
                formatted = dt.format('Y-m-d H:M:S');
                return [2 /*return*/, sequelizeUtils_1.tables.campaignCtoStatus.create({ campaignId: resumeBlockedCampaigns.getCampaignId(), campaignType: 3, messagesCount: mastercount, processedCount: 0, insertTime: formatted, status: 1 }).then((function (result) {
                        LogUtils_1.logger.info("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  insertBlockedCampaignStatus: [Insert in to status: Success] ");
                        return true;
                    }))
                        .catch(function (err) {
                        LogUtils_1.logger.error("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  insertBlockedCampaignStatus: [Insert in to status: " + err + "] ");
                        return false;
                    })];
            });
        });
    };
    CampaignUtils.prototype.getBlockedCount = function (campid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dbUtils_1.connect.query("select  count(*) as 'count' from CampaignSCTT where CampaignId = :campid and Sentdate between concat(REPLACE(CONVERT(VARCHAR, DATEADD(dd, -2, GETDATE()), 102), '.', '-'),' 00:00:00') and concat(REPLACE(CONVERT(VARCHAR, DATEADD(dd, 0, GETDATE()), 102), '.', '-'),' 23:59:59') and modulename='block' group by incomingusername,outboundsender, CampaignId", {
                        replacements: { campid: campid },
                        type: dbUtils_1.connect.QueryTypes.SELECT,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.info("blockedcount: =>", result[0]);
                        return result[0].count;
                    })
                        .catch(function (err) {
                        return 0;
                    })];
            });
        });
    };
    CampaignUtils.prototype.processCampaign = function (resumeBlockedCampaigns, mastercount, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var recordscount, dat, edate, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recordscount = Math.ceil(mastercount / 10000);
                        dat = dateTime.create();
                        edate = dat.format('Y-m-d H:M:S');
                        LogUtils_1.logger.info("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  processCampaign: [count: " + mastercount + "] ");
                        _loop_1 = function (i) {
                            var lowerLimit, stat;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        LogUtils_1.logger.info("[CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "]---------------------------Start for loop--------------------------------------------- " + i);
                                        lowerLimit = i * 10000;
                                        stat = 1;
                                        if (i === recordscount - 1 || i === recordscount) {
                                            stat = 2;
                                        }
                                        else {
                                            stat = stat;
                                        }
                                        return [4 /*yield*/, this_1.processRecords(resumeBlockedCampaigns.getCampaignId(), lowerLimit, stat)
                                                .then(function (result) {
                                                //  logger.info("logupdate2 ==>", (i % ProcessEnvService._loginterval === 0));
                                                if (i === recordscount - 1) {
                                                    var emailalerts = new EmailUtils_1.EmailAlerts();
                                                    var emailparams = {};
                                                    emailparams.param1 = resumeBlockedCampaigns.getCampaignId();
                                                    emailparams.param2 = resumeBlockedCampaigns.getCount();
                                                    emailparams.param3 = mastercount;
                                                    emailparams.username = luserName;
                                                    emailparams.time = edate;
                                                    emailparams.type = 6;
                                                    emailalerts.emailAlerts(emailparams);
                                                }
                                                //  logger.info("resumeBlockedCampaignRecords: Success", result);
                                            }).catch(function (error) {
                                                LogUtils_1.logger.error("Resume request: [CampaignId:" + resumeBlockedCampaigns.getCampaignId() + "],  processCampaign: [count: " + error + "] ");
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
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
    CampaignUtils.prototype.processRecords = function (campaignid, lowerLimit, currentstat) {
        LogUtils_1.logger.info("Resume request: [CampaignId:" + campaignid + "],  processRecords: [processing count: " + currentstat + ", limit: " + lowerLimit + "] ");
        var campaignpublishtoqueue = new qUtils_1.CampaignPublishToQueue();
        return sequelizeUtils_1.tables.campaignSctt.findAll({
            where: {
                campaignId: campaignid
            },
            offset: lowerLimit,
            limit: 10000,
            raw: true
        }).then(function (rows) {
            LogUtils_1.logger.info("Resume request: [CampaignId:" + campaignid + "],  processRecords: [rows count: " + rows.length + "] ");
            return campaignpublishtoqueue.publishCampaign(rows, campaignid, currentstat, 3, lowerLimit, "10000");
        }).catch(function (err) {
            LogUtils_1.logger.error("Resume request: [CampaignId:" + campaignid + "],  processRecords: [rows error: " + err + "] ");
            return false;
        });
    };
    return CampaignUtils;
}());
exports.CampaignUtils = CampaignUtils;
