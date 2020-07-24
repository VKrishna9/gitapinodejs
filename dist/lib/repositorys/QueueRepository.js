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
var AmqUtils_1 = require("../utils/AmqUtils");
var LogUtils_1 = require("../utils/LogUtils");
var millify = require("millify");
var convert = require("xml-js");
var QueueRepository = /** @class */ (function () {
    function QueueRepository() {
    }
    QueueRepository.prototype.loadQueues = function (memDb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AmqUtils_1.AmqCon.prototype.AmqResponse().then(function (result) {
                            var jsonObj = convert.xml2json(result, { compact: true, spaces: 4 });
                            var queueArray = JSON.parse(jsonObj).queues.queue;
                            queueArray.forEach(function (queue) {
                                var name = queue._attributes.name;
                                var index = name.lastIndexOf("_");
                                var myQueue = {};
                                myQueue.queueName = name;
                                myQueue.size = millify(Number(queue.stats._attributes.size), 3);
                                myQueue.consumerCount = queue.stats._attributes.consumerCount;
                                myQueue.processCount = millify(Number(queue.stats._attributes.dequeueCount), 3);
                                if (name.startsWith("QT_SERVER_ESME_")) {
                                    var index_1 = name.lastIndexOf("_") + 1;
                                    var userId = parseInt(name.substring(index_1));
                                    myQueue.userId = name.substring(index_1);
                                    myQueue.name = memDb.getUserNameByUserId(userId); // myQueue.userId ;
                                    myQueue.drConsumerCount = "-";
                                    myQueue.drCount = "-";
                                    if (name.startsWith("QT_SERVER_ESME_DR_")) {
                                        myQueue.drConsumerCount = queue.stats._attributes.consumerCount;
                                        myQueue.drCount = millify(Number(queue.stats._attributes.size), 3);
                                    }
                                    memDb.addEsmeQueue(myQueue);
                                }
                                else if (name.startsWith("QT_CLIENT_ESME_") && name != "QT_CLIENT_ESME_DR" && name != "QT_CLIENT_ESME_PR") {
                                    var index_2 = name.lastIndexOf("_") + 1;
                                    myQueue.userId = name.substring(index_2);
                                    var smscId = parseInt(name.substring(index_2));
                                    myQueue.name = memDb.getSystemIdBySmscId(smscId);
                                    memDb.addSmscQueue(myQueue);
                                }
                                else if (name === "QT_CLIENT_ESME_DR" || name === "QT_CLIENT_ESME_PR") {
                                    memDb.addManageQueue(myQueue);
                                }
                                else {
                                    memDb.addManageQueue(myQueue);
                                }
                            });
                            LogUtils_1.logger.info("loadQueues: Queue Loaded : ok");
                            return "ok";
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return QueueRepository;
}());
exports.QueueRepository = QueueRepository;
