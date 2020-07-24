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
var requestify = require("requestify");
var AmqUtils_1 = require("../utils/AmqUtils");
var LogUtils_1 = require("../utils/LogUtils");
var convert = require("xml-js");
var each = require("foreach");
var bodyParser = require("body-parser");
var multer = require("multer");
var dbUtils_1 = require("../utils/dbUtils");
// let IncomingResult: any = [];
// const OutGoingResult: any = [];
// let InOutQueueItems: any = {  IncomingQ: IncomingResult, OutGoingQ: OutGoingResult  };
var CTOResult = [];
var LiveCTOResult = [];
var MainCtoDetails = { CTOResult: CTOResult, LiveCTOResult: LiveCTOResult };
var showingArray = ["QT_SERVER_ESME_", "QT_CLIENT_ESME_"];
var myUtils = require("underscore");
var Container_1 = require("typedi/Container");
var income = [];
var outgoing = [];
var manage = [];
var LiveQueueRepository = /** @class */ (function () {
    function LiveQueueRepository(amqConnection) {
        this.amqConnection = amqConnection;
        this.memDb = Container_1.Container.get("memDb");
    }
    LiveQueueRepository.prototype.getQueueInformation = function (reqtype) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LogUtils_1.logger.info("getQueueInformation :: Started");
                        return [4 /*yield*/, AmqUtils_1.AmqCon.prototype.AmqResponse().then(function (result) {
                                //  const res = await this.amqConnection.AmqResponse()
                                var jsonObj = convert.xml2json(result, { compact: true, spaces: 4 });
                                var queueArray = JSON.parse(jsonObj).queues.queue;
                                queueArray.forEach(function (queue) {
                                    var name = queue._attributes.name;
                                    var index = name.lastIndexOf("_");
                                    var myQueue = {};
                                    myQueue.queueName = name;
                                    myQueue.size = queue.stats._attributes.size;
                                    myQueue.consumerCount = queue.stats._attributes.consumerCount;
                                    myQueue.processCount = queue.stats._attributes.dequeueCount;
                                    if (name.startsWith("QT_SERVER_ESME_")) {
                                        if (name.startsWith("QT_SERVER_ESME_DR_")) {
                                            myQueue.drCount = queue.stats._attributes.size;
                                            myQueue.drConsumerCount = queue.stats._attributes.consumerCount;
                                        }
                                        else {
                                            myQueue.drCount = 0;
                                            myQueue.drConsumerCount = 0;
                                        }
                                        var index_1 = name.lastIndexOf("_") + 1;
                                        var userId_1 = parseInt(name.substring(index_1));
                                        myQueue.userId = name.substring(index_1);
                                        myQueue.name = _this.memDb.getUserNameByUserId(userId_1); // myQueue.userId ;
                                        //  myQueue.name =  this.getUserName(myQueue.userId).then(name => { return name; }) ;
                                        // Promise.all(myQueue);
                                        _this.memDb.addEsmeQueue(myQueue);
                                        //  income.push(myQueue);
                                    }
                                    else if (name.startsWith("QT_CLIENT_ESME_")) {
                                        var index_2 = name.lastIndexOf("_") + 1;
                                        myQueue.userId = name.substring(index_2);
                                        var smscId = parseInt(name.substring(index_2));
                                        myQueue.name = _this.memDb.getSystemIdBySmscId(smscId); // myQueue.userId ;
                                        //  Promise.all(myQueue);
                                        // outgoing.push(myQueue);
                                        _this.memDb.addSmscQueue(myQueue);
                                    }
                                    else {
                                        manage.push(myQueue);
                                        _this.memDb.addManageQueue(myQueue);
                                    }
                                });
                                var incominglist = [];
                                incominglist = myUtils.sortBy(income, "size");
                                income = [];
                                var outgoinglist = [];
                                outgoinglist = myUtils.sortBy(outgoing, "size");
                                outgoing = [];
                                var managelist = [];
                                managelist = myUtils.sortBy(manage, "size");
                                manage = [];
                                var userId = myUtils.pluck(income, "userId");
                                LogUtils_1.logger.info("getQueueInformation: income =>", incominglist.length);
                                // logger.info("getQueueInformation: income =>", userId);
                                LogUtils_1.logger.info("getQueueInformation: outgoing =>", outgoing.length);
                                LogUtils_1.logger.info("getQueueInformation: manage =>", manage.length);
                                if (reqtype == "incoming") {
                                    return incominglist.reverse();
                                }
                                if (reqtype == "outgoing") {
                                    return outgoinglist.reverse();
                                }
                                if (reqtype == "manage") {
                                    return managelist.reverse();
                                }
                            }).catch(function (error) {
                                LogUtils_1.logger.error("getQueueInformation: error =>", error);
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, (res)];
                }
            });
        });
    };
    LiveQueueRepository.prototype.getAllEsmeDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getAllEsmeDetails: => EsmeCount =>", this.memDb.getAllEsmeDetails().length);
                return [2 /*return*/, this.memDb.getAllEsmeDetailsNew()];
            });
        });
    };
    LiveQueueRepository.prototype.getAllEsmeDetailsTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var emsearray;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getAllEsmeDetailsTest: => EsmeCount =>", this.memDb.getAllEsmeDetails().length);
                emsearray = this.memDb.getAllEsmeDetails();
                return [2 /*return*/, this.memDb.mergeQueues(emsearray)];
            });
        });
    };
    LiveQueueRepository.prototype.getAllSmscDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getAllSmscDetails: => SMSCCount =>", this.memDb.getAllSmscDetails().length);
                return [2 /*return*/, this.memDb.getAllSmscDetails()];
            });
        });
    };
    LiveQueueRepository.prototype.getAllManageQueueDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getAllManageQueueDetails: => ManageCount =>", this.memDb.getAllManageQueueDetails().length);
                return [2 /*return*/, this.memDb.getAllManageQueueDetails()];
            });
        });
    };
    LiveQueueRepository.prototype.getUserName = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dbUtils_1.synapseDBconnect.query("SELECT UserName  FROM Users where Id = :userId", {
                        replacements: { userId: userid },
                        type: dbUtils_1.synapseDBconnect.QueryTypes.SELECT,
                        raw: true
                    }).then(function (result) {
                        LogUtils_1.logger.error("getUserName: resumeCampaign: success ==>", result);
                        return result;
                    })
                        .catch(function (error) {
                        LogUtils_1.logger.error("getUserName: resumeCampaign: Failed: ==>", error);
                        return '{Status: "Failed"}';
                    })];
            });
        });
    };
    return LiveQueueRepository;
}());
exports.LiveQueueRepository = LiveQueueRepository;
