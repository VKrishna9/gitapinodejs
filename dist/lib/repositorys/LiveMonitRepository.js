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
var redisUtils_1 = require("./../utils/redisUtils");
var typedi_1 = require("typedi");
var BlockMessage_1 = require("../utils/BlockMessage");
var LogUtils_1 = require("../utils/LogUtils");
var datetime = require("node-datetime");
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var tables = dbTables.getModels(dbUtils_1.connect);
var Container_1 = require("typedi/Container");
var LiveMonitRepository = /** @class */ (function () {
    function LiveMonitRepository(redisClient) {
        this.redisClient = redisClient;
        this.memDb = Container_1.Container.get("memDb");
    }
    LiveMonitRepository.prototype.blockUser = function (value, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.redisClient.checkBlockStatus(value.getKey())
                        .then(function (result) {
                        LogUtils_1.logger.info("check status =====>", result);
                        if (result === 1) {
                            LogUtils_1.logger.info("blockUser: already blocked.: true");
                            return new BlockMessage_1.BlockErrorMessage(false, "Duplicate/Invalid Request");
                        }
                        else {
                            return _this.redisClient.saveBlockMessage(value, luserName);
                        }
                    }).catch(function (err) {
                        return new BlockMessage_1.BlockErrorMessage(false, "Error");
                    })];
            });
        });
    };
    LiveMonitRepository.prototype.getAllBlockedMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.redisClient.getBlockedMessageByKey()];
            });
        });
    };
    LiveMonitRepository.prototype.unblockUser = function (value, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.redisClient.deleteBlockMessage(value, luserName)];
            });
        });
    };
    LiveMonitRepository.prototype.liveUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockCampaignsList, that, resp;
            var _this = this;
            return __generator(this, function (_a) {
                blockCampaignsList = [];
                that = this;
                LogUtils_1.logger.info("liveUserData ==>");
                resp = dbUtils_1.connect.query(" select top 100 b.userName,a.InboundSender as 'senderId',a.Message as 'message',count(*) as submitCount,a.moduleName,CONVERT(VARCHAR(33), max(a.ReceivedDate),105)+  ' '  + convert(VARCHAR(8), max(a.ReceivedDate), 14) as receivedTime from Gateway.dbo.ServerTransactions a  inner join Synapse.dbo.Users b on a.IncomingUserid = b.id  where a.ReceivedDate > DATEADD(MINUTE, -30, GETDATE()) group by b.UserName,a.InboundSender,a.Message,a.ModuleName order by SubmitCount desc", { type: dbUtils_1.connect.QueryTypes.SELECT })
                    .then(function (records) {
                    LogUtils_1.logger.info("liveUserData: success : reponse ==>", records.length);
                    if (records.length > 0) {
                        records.forEach(function (record) {
                            var key = (record.userName + ":" + record.senderId).toUpperCase();
                            var liveCampaigns = {};
                            liveCampaigns.userName = record.userName;
                            liveCampaigns.senderId = record.senderId;
                            liveCampaigns.submitCount = record.submitCount;
                            liveCampaigns.moduleName = record.moduleName;
                            liveCampaigns.receivedTime = record.receivedTime;
                            liveCampaigns.message = record.message;
                            blockCampaignsList.push(liveCampaigns);
                        });
                        return _this.processRedis(blockCampaignsList);
                    }
                    else {
                        return blockCampaignsList;
                    }
                })
                    .catch(function (err) {
                    LogUtils_1.logger.error("liveUserData: Failed : reponse ==>", err.name);
                    return ([]);
                });
                return [2 /*return*/, (resp)];
            });
        });
    };
    LiveMonitRepository.prototype.processRedis = function (blockCampaignsList) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            var _this = this;
            return __generator(this, function (_a) {
                promises = [];
                blockCampaignsList.forEach(function (element) {
                    var key = (element.userName + ":" + element.senderId).toUpperCase();
                    promises.push(_this.redisClient.checkBlockStatus(key)
                        .then(function (result) {
                        element.status = result;
                        return element;
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
    // async liveUserData<T>() {
    //   const blockCampaignsList: any[] = [];
    //   var that = this;
    //   logger.info("liveUserData ==>")
    //                                  // select top 100 b.UserName,a.InboundSender,a.Message,count(*) as SubmitCount,a.ModuleName,CONVERT(VARCHAR(33),max(a.ReceivedDate),120) as LastReceivedDate from Gateway.dbo.ServerTransactions a inner join Synapse.dbo.Users b on a.IncomingUserid = b.id where a.ReceivedDate > DATEADD(MINUTE, -1000, GETDATE()) group by b.UserName,a.InboundSender,a.Message,a.ModuleName order by SubmitCount desc
    //                                 // select top 100 b.UserName,a.InboundSender,a.Message,count(*) as SubmitCount,a.ModuleName,max(a.ReceivedDate) as LastReceivedDate from Gateway.dbo.ServerTransactions a  inner join Synapse.dbo.Users b on a.IncomingUserid = b.id where a.ReceivedDate > DATEADD(MINUTE, -1000, GETDATE()) group by b.UserName,a.InboundSender,a.Message,a.ModuleName order by SubmitCount desc"
    //   const resp =  connect.query(" select top 100 b.userName,a.InboundSender as 'senderId',a.Message as 'message',count(*) as submitCount,a.moduleName,CONVERT(VARCHAR(33), max(a.ReceivedDate),105)+  ' '  + convert(VARCHAR(8), max(a.ReceivedDate), 14) as receivedTime from Gateway.dbo.ServerTransactions a  inner join Synapse.dbo.Users b on a.IncomingUserid = b.id  where a.ReceivedDate > DATEADD(MINUTE, -60, GETDATE()) group by b.UserName,a.InboundSender,a.Message,a.ModuleName order by SubmitCount desc",
    //         { type: connect.QueryTypes.SELECT})
    //         .then( (records: any[]) => {
    //           logger.info("liveUserData: success : reponse ==>", records.length );
    //           // rows.forEach((row: any) => {
    //             if (records.length > 0) {
    //               var promise = new Promise(function (resolve, reject) {
    //                  records.forEach(record => {
    //            //     logger.info("=======>" ,record[0]);
    //                 const key = (record.userName + ":" + record.senderId).toUpperCase();
    //                    const liveCampaigns: LiveCampaigns = {} as any;
    //                    liveCampaigns.userName = record.userName;
    //                    liveCampaigns.senderId = record.senderId;
    //                    liveCampaigns.submitCount = record.submitCount;
    //                    liveCampaigns.moduleName = record.moduleName;
    //                    liveCampaigns.receivedTime = record.receivedTime;
    //                    liveCampaigns.message = record.message;
    //                   //  that.redisClient.checkBlockStatus(key)
    //                   //  .then(response => {
    //                   // //  logger.info("liveUserData: blocked : in CTO=>", response);
    //                   //   if (response === false){
    //                   //     liveCampaigns.status = 1;
    //                   //   }else{
    //                   //     liveCampaigns.status = 0;
    //                   //   }
    //                   //    blockCampaignsList.push(liveCampaigns);
    //                   //     resolve (blockCampaignsList);
    //                   //  }).catch(err=>{
    //                   //   logger.info("liveUserData: blocked :Failed=>", err);
    //                   //    reject(err); 
    //                   //  })
    //                   blockCampaignsList.push(liveCampaigns);
    //                     //  resolve (blockCampaignsList);
    //                  } );
    //                   resolve  (((blockCampaignsList)));
    //                })
    //           //  return Promise.all(blockCampaignsList).then(res=> {
    //           //       logger.info("live list:", res)
    //           //         return res;
    //           //       })
    //             return promise.then(res=> {
    //               logger.info("live list:", res)
    //                 return res;
    //               })
    //               } else {
    //                  return blockCampaignsList;
    //                }
    //           // });
    //             //return (rows);
    //         })
    //         .then((newList: any) =>{
    //           const status = new Promise((resolve, reject) => { 
    //           newList.forEach((element:any) => {
    //             const key = (element.userName + ":" + element.senderId).toUpperCase();
    //            const stat = this.redisClient.checkBlockStatus(key)
    //             .then(resp=>{
    //              return (resp);
    //             }).catch(err=>{
    //               reject(err);
    //             })
    //             element.status = stat;
    //             logger.info("---->", element.status);
    //           });
    //           resolve(newList)
    //           });
    //          return status.then(newlist2 =>{
    //           return newlist2;
    //           })
    //         })
    //         .catch((err: any) => {
    //             logger.error("liveUserData: Failed : reponse ==>", err.name );
    //             return ([]);
    //         });
    //       //  logger.info("liveUserData: Success : reponse ==>", resp );
    //        return (resp);
    // }
    LiveMonitRepository.prototype.getUserSenderHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getUserSenderHistory ==>");
                return [2 /*return*/, tables.blockeduser.findAll({ attributes: [
                            'username',
                            'senderid',
                            'luser',
                            'action',
                            'campaignId',
                            [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('expiredTime'), 'dd-MM-yyyy HH:mm:ss'), 'expiredTime'],
                            [dbUtils_1.connect.fn('format', dbUtils_1.connect.col('datetime'), 'dd-MM-yyyy HH:mm:ss'), 'datetime']
                        ],
                        limit: 25,
                        order: [
                            ['id', 'DESC']
                        ],
                        raw: true
                    }).then(function (rows) {
                        LogUtils_1.logger.info("getUserSenderHistory : Success==>");
                        //   rows.forEach(row => {
                        //     let dt = datetime.create(row.datetime, "Y-m-d H:M:S");
                        //     row.datetime = dt.format("Y-m-d H:M:S");
                        // });
                        //const memdb: MemDb = new MemDb();
                        var userid = 0;
                        rows.forEach(function (row) {
                            userid = row.luser;
                            if (userid != null && userid != '0') {
                                row.luser = row.luser;
                            }
                            else {
                                row.luser = "Expired";
                            }
                        });
                        // logger.info("getUserSenderHistory : Success==>", rows);
                        return rows;
                    }).catch(function (error) {
                        LogUtils_1.logger.info("getUserSenderHistory : Failed ==>", error);
                        return [];
                    })];
            });
        });
    };
    var _a;
    LiveMonitRepository = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [typeof (_a = typeof redisUtils_1.RedisClient !== "undefined" && redisUtils_1.RedisClient) === "function" && _a || Object])
    ], LiveMonitRepository);
    return LiveMonitRepository;
}());
exports.LiveMonitRepository = LiveMonitRepository;
