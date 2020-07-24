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
var dbUtils_1 = require("../utils/dbUtils");
var MemDb_1 = require("../utils/MemDb");
var redisUtils_1 = require("../utils/redisUtils");
var LogUtils_1 = require("../utils/LogUtils");
var loadash = require("lodash");
var convert = require("xml-js");
var GroupsRespository = /** @class */ (function () {
    function GroupsRespository() {
    }
    GroupsRespository.prototype.loadGroups = function (memDb) {
        LogUtils_1.logger.info("loadGroups  :");
        return dbUtils_1.connect.query("select DISTINCT A.Id as smscId,A.SMSCName as smscName,A.ConnectionType connectionType, B.HostDetails as bindIp,B.Port as bindPort,B.SystemId as systemId,B.Password as password, B.AlivePeriod as enqueryTime,B.ServerTimeOut as bindTimeOut, B.ProtocolVersion as protocolVersion,B.CharSet as charSet,B.ThroughPut as tps,B.SystemType as systemType,B.DestTon as destTon, B.DestNpi as destNpi,B.SourceTon as srcTon,B.SourceNpi as srcNpi,B.SourceAddress srcAddress,B.Instance as groupName,B.Transmitter as tx, B.Transciever as trx,B.Receiver as rx,ISNULL(B.DCS,0) as dcs from [Synapse].[dbo].SmscMaster A with(nolock) join [Synapse].[dbo].SmscSmpp B  with(nolock) on A.Id=B.SmscId where A.SMSCStatus=1", { type: dbUtils_1.connect.QueryTypes.SELECT })
            //  return connect.query("select * from groups ", { type: connect.QueryTypes.SELECT })
            .then(function (rows) {
            LogUtils_1.logger.info("loadGroups: rows fetched:", rows.length);
            if (rows.length > 0) {
                rows.forEach(function (row) {
                    var cgrouplist = {};
                    cgrouplist.groupName = row.groupName.trim();
                    cgrouplist.smscId = Number(row.smscId);
                    cgrouplist.systemId = row.systemId.trim();
                    cgrouplist.smscName = row.smscName.trim();
                    cgrouplist.tps = Number(row.tps);
                    cgrouplist.txSessions = Number(row.tx);
                    cgrouplist.rxSessions = Number(row.rx);
                    cgrouplist.trxSessions = Number(row.trx);
                    cgrouplist.bindIp = row.bindIp.trim();
                    cgrouplist.bindPort = Number(row.bindPort);
                    cgrouplist.password = row.password.trim();
                    cgrouplist.enqueryTime = Number(row.enqueryTime);
                    cgrouplist.bindTimeOut = Number(row.bindTimeOut);
                    cgrouplist.protocolVersion = row.protocolVersion.trim();
                    cgrouplist.charSet = row.charSet.trim();
                    cgrouplist.systemType = row.systemType;
                    cgrouplist.destTon = Number(row.destTon);
                    cgrouplist.destNpi = Number(row.destNpi);
                    cgrouplist.srcTon = Number(row.srcTon);
                    cgrouplist.srcNpi = Number(row.srcNpi);
                    cgrouplist.srcAddress = row.srcAddress;
                    cgrouplist.dcs = Number(row.dcs);
                    cgrouplist.connectionType = Number(row.connectionType);
                    memDb.addGroup(cgrouplist);
                });
            }
            else {
                LogUtils_1.logger.info("loadGroups: no data found");
            }
            LogUtils_1.logger.info("loadGroups:", memDb.getAllGroupsLength());
        })
            .catch(function (error) {
            var errorMessage = "Error from DataBase: Error:[" + error.name + "], Error Message:[" + error + "]";
            LogUtils_1.logger.error("loadGroups: Failes", errorMessage);
            return errorMessage;
        });
    };
    GroupsRespository.prototype.processGroupsList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var memDb, glist, names, finnames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LogUtils_1.logger.info("Process Groups List:");
                        memDb = new MemDb_1.MemDb();
                        glist = [];
                        return [4 /*yield*/, memDb.getGroupNames()];
                    case 1:
                        names = _a.sent();
                        finnames = loadash.chain(names).map('groupName').uniq().value();
                        LogUtils_1.logger.info("processGroupsList: group names count:", finnames.length);
                        finnames.forEach(function (name) {
                            var masterlist = {};
                            masterlist.groupName = name;
                            glist.push(masterlist);
                        });
                        return [2 /*return*/, this.getSmscId(glist)];
                }
            });
        });
    };
    GroupsRespository.prototype.getSmscId = function (masterlist) {
        return __awaiter(this, void 0, void 0, function () {
            var slist, memDb;
            var _this = this;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("Process Groups List: getSmscId", masterlist.length);
                slist = [];
                memDb = new MemDb_1.MemDb();
                masterlist.forEach(function (item) {
                    item.groupName = item.groupName;
                    var smscList = {};
                    item.smscIds = memDb.getSmscIdbyGroupName(item.groupName);
                    LogUtils_1.logger.info("processGroupsList:getSmscId: group names count:", item.smscIds.length);
                    var options = _this.getOptions(item.smscIds);
                    //  logger.info("getSmscId", options)
                    slist.push(item);
                });
                return [2 /*return*/, slist];
            });
        });
    };
    GroupsRespository.prototype.getOptions = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            var optionlist, memDb;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("Process Groups List: getOptions", list.length);
                optionlist = [];
                memDb = new MemDb_1.MemDb();
                list.forEach(function (item) {
                    var options = memDb.getSystemDetailsbySmscId(item.smscId);
                    item.smscIdName = item.smscId + ' (' + options[0].smscName + ')';
                    item.options = options;
                    LogUtils_1.logger.info("processGroupsList:getOptions: group names count:", options.length);
                    optionlist.push(item);
                });
                return [2 /*return*/, optionlist];
            });
        });
    };
    GroupsRespository.prototype.addremoveGroup = function (groupaddremove, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var redisClient, memDb, gdetails;
            return __generator(this, function (_a) {
                redisClient = new redisUtils_1.RedisClient();
                LogUtils_1.logger.info("addremoveGroup:", groupaddremove.groupName, groupaddremove.smscId, groupaddremove.type);
                if (groupaddremove.type === 'remove') {
                    return [2 /*return*/, redisClient.cgroupRemove(groupaddremove, luserName)];
                }
                else {
                    memDb = new MemDb_1.MemDb();
                    gdetails = memDb.getAllGroupDetails(groupaddremove);
                    LogUtils_1.logger.info("addremoveGroup:", gdetails);
                    return [2 /*return*/, redisClient.cgroupAdd(gdetails, luserName)];
                }
                return [2 /*return*/];
            });
        });
    };
    GroupsRespository.prototype.groupsHistory = function (luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var redisClient;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("groupsHistory:");
                redisClient = new redisUtils_1.RedisClient();
                return [2 /*return*/, redisClient.groupsHisotry()];
            });
        });
    };
    return GroupsRespository;
}());
exports.GroupsRespository = GroupsRespository;
