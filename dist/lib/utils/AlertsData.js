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
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var sequelizer = require("sequelize");
var js2xmlparser = require("js2xmlparser");
var qUtils_1 = require("../utils/qUtils");
var typedi_1 = require("typedi");
var LogUtils_1 = require("../utils/LogUtils");
var tables = dbTables.getModels(dbUtils_1.connect);
var AlertsData = /** @class */ (function () {
    function AlertsData(campaignpublishtoqueue) {
        this.campaignpublishtoqueue = campaignpublishtoqueue;
    }
    AlertsData.prototype.alertsInformation = function (reqtype) {
        return __awaiter(this, void 0, void 0, function () {
            var type, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (reqtype == "SERVER") {
                            type = tables.esmeMaster;
                        }
                        else if (reqtype == "CLIENT") {
                            type = tables.smscMaster;
                        }
                        return [4 /*yield*/, type.findAll({
                                attributes: ["userId", [sequelizer.fn("COUNT", sequelizer.col("userId")), "Count"]],
                                group: ["userId"],
                                raw: true
                            })
                                .then(function (value) {
                                var data = JSON.stringify(value);
                                LogUtils_1.logger.info("alertsInformation:  =>", data);
                                return data;
                            }).catch(function (error) {
                                LogUtils_1.logger.error("alertsInformation: Error =>", error);
                                var data = JSON.stringify(error);
                                // console.log("value =>", data);
                                return data;
                            })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    AlertsData.prototype.getUserData = function (resume_campid) {
        return __awaiter(this, void 0, void 0, function () {
            var find_condition, d, date, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (resume_campid != 0) {
                            find_condition = { where: { campaignId: resume_campid, status: 0 }, raw: true };
                        }
                        else {
                            d = new Date();
                            d.setDate(d.getDate() - 5);
                            date = d.toISOString().replace(/\..+/, "");
                            // date = date.(0,10);
                            find_condition = { where: { insertTime: {
                                        $gt: date
                                    } }, raw: true };
                            // find_condition = { where: {  status:0 }, raw: true };
                        }
                        return [4 /*yield*/, tables.campaignCtoStatus.findAll(find_condition)
                                .then(function (value) {
                                // var data = JSON.stringify(value);
                                LogUtils_1.logger.info("alertsInformation: success =>");
                                return value;
                            }).catch(function (error) {
                                LogUtils_1.logger.error("getUserData: Failed=>", error);
                                var data = JSON.stringify(error);
                                // console.log("value =>", data);
                                return data;
                            })];
                    case 1:
                        resp = _a.sent();
                        LogUtils_1.logger.info("alertsInformation: resp =>", resp);
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    AlertsData = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [qUtils_1.CampaignPublishToQueue])
    ], AlertsData);
    return AlertsData;
}());
exports.AlertsData = AlertsData;
