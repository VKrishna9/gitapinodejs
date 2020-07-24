"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var ProcessEnv = require("../config/config");
var typedi_1 = require("typedi");
var Stomp = require("stomp-client");
var js2xmlparser = require("js2xmlparser");
var client = new Stomp(ProcessEnv.ProcessEnvQ._host, ProcessEnv.ProcessEnvQ._port, ProcessEnv.ProcessEnvQ._username, ProcessEnv.ProcessEnvQ._password);
var dbTables = require("../model/db.tables");
var LogUtils_1 = require("../utils/LogUtils");
var dbUtils_1 = require("../utils/dbUtils");
var PduXml_1 = require("../utils/PduXml");
// import { Sequelize } from "sequelize-typescript";
var datetime = require("node-datetime");
var tables = dbTables.getModels(dbUtils_1.connect);
exports.qconnection = client.connect(function (data) {
    LogUtils_1.logger.info("qutils: ActiveMQ Connected :", data);
}, function (err) {
    LogUtils_1.logger.error("qutils: Excep: qutils : Error :", err);
});
var CampaignPublishToQueue = /** @class */ (function () {
    function CampaignPublishToQueue() {
    }
    CampaignPublishToQueue.prototype.publishCampaign = function (rows, rcampid, stat, type, lowerlimit, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var rowCount, _i, rows_1, row, dt, campid, esme_id, object, pdupacket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LogUtils_1.logger.info("Resume request: [CampaignId:" + rcampid + "],  publishCampaign: [limit: " + lowerlimit + "] ");
                        rowCount = 0;
                        _i = 0, rows_1 = rows;
                        _a.label = 1;
                    case 1:
                        if (!(_i < rows_1.length)) return [3 /*break*/, 4];
                        row = rows_1[_i];
                        // rows.forEach(async row => {
                        rowCount = rowCount + 1;
                        dt = datetime.create(row.sentdate);
                        row.sentdate = dt.format("Y-m-d H:M:S");
                        campid = rcampid;
                        esme_id = row.incomingUserid;
                        object = new PduXml_1.PduXML(row);
                        pdupacket = js2xmlparser.parse("LOG", object);
                        pdupacket = pdupacket.replace("<LOG>", '<LOG TYPE="SUBMIT_SM">');
                        pdupacket = pdupacket.replace('<?xml version="1.0"?>', "");
                        // logger.info("pdupacket: ", pdupacket);
                        return [4 /*yield*/, Promise.resolve(exports.qconnection.publish((ProcessEnv.ProcessEnvQ._cct_q + esme_id), pdupacket))];
                    case 2:
                        // logger.info("pdupacket: ", pdupacket);
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        ;
                        this.logUpdateCTT((rows.length), rcampid, stat, type);
                        LogUtils_1.logger.info("---------------------------------[Campid: " + rcampid + "]:For Loop End-----------------------------------------");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    CampaignPublishToQueue.prototype.updateCTT = function (campaignid, rcamp) {
        return __awaiter(this, void 0, void 0, function () {
            var dateTime, dt, campId;
            return __generator(this, function (_a) {
                dateTime = require("node-datetime");
                dt = dateTime.create();
                campId = campaignid;
                dbUtils_1.connect.query("UPDATE campaign_cto_status SET status=1,processedCount=0,resumedTime=CURRENT_TIMESTAMP WHERE campaignId = :campid", { replacements: { campid: campaignid },
                    type: dbUtils_1.connect.QueryTypes.UPDATE,
                    raw: true })
                    // tables.campaignCtoStatus.update(
                    //   {  campaignId: campaignid, status: 1, campaignType: rcamp, processedCount:0, resumedTime: "" },
                    //   { where: { campaignId: campaignid } }
                    // )
                    .then((function (result) {
                    LogUtils_1.logger.info("updateCTT: success ==>", result);
                })).catch(function (error) {
                    LogUtils_1.logger.error("updateCTT: Failed ==>", error);
                });
                return [2 /*return*/];
            });
        });
    };
    CampaignPublishToQueue.prototype.logUpdateCTT = function (i, campcid, stat, type) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("Resume request: [CampaignId:" + campcid + "],  logUpdateCTT: [offset: " + i + "] ");
                query = "update campaign_cto_status set status = :stat, processedcount = processedcount + :cnt where campaignid = :cid";
                // if (type == 1){
                //    query = "update campaign_cto_status set status = :stat, processedcount = :cnt where campaignid = :cid"
                // } else {
                //    query = query;
                // }
                return [2 /*return*/, dbUtils_1.connect.query(query, {
                        replacements: { stat: stat, cnt: i, cid: campcid },
                        type: dbUtils_1.connect.QueryTypes.UPDATE
                    })
                        .then(function (result) {
                        LogUtils_1.logger.info("Resume request: [CampaignId:" + campcid + "],  logUpdateCTT: [Success: " + result + "] ");
                        return result;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("logUpdateCTT: error =>", error);
                        return error;
                    })
                    // tables.campaignCtoStatus.update( 
                    //   { 
                    //      campaignId: campcid, processedCount: i , status: stat, campaignType: 1 },
                    //   { where: { campaignId: campcid } }
                    // ).then(
                    //   (result => {
                    //     logger.info("logUpdateCTT ==>", result);
                    //   })
                    //   ).catch(error => {
                    //     logger.error("logUpdateCTT ==>", error);
                    //   });
                    //   logger.info("Campaign resume: records processed, campaignid and status ==>", i, campcid, stat);
                ];
            });
        });
    };
    CampaignPublishToQueue = __decorate([
        typedi_1.Service()
    ], CampaignPublishToQueue);
    return CampaignPublishToQueue;
}());
exports.CampaignPublishToQueue = CampaignPublishToQueue;
