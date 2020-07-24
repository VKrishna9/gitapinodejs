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
var ProcessEnv = require("../config/config");
var BlockMessage_1 = require("./BlockMessage");
var LogUtils_1 = require("../utils/LogUtils");
var MemDb_1 = require("./MemDb");
var infoarray = [];
var client = require("redis-pooling")({
    maxPoolSize: 10,
    credentials: {
        host: ProcessEnv.ProcessEnvDBRedis._host,
        port: ProcessEnv.ProcessEnvDBRedis._port,
        password: ProcessEnv.ProcessEnvDBRedis._password
    }
});
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var sequelizer = require("sequelize");
var tables = dbTables.getModels(dbUtils_1.connect);
var shortid = require('shortid');
var EmailUtils_1 = require("./EmailUtils");
var dateTime = require("node-datetime");
var emailalerts = new EmailUtils_1.EmailAlerts();
var memdb = new MemDb_1.MemDb();
var RedisClient = /** @class */ (function () {
    function RedisClient() {
    }
    RedisClient.prototype.saveBlockMessage = function (blockMessage, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage, blockValue, cId, dt, date;
            return __generator(this, function (_a) {
                blockValue = JSON.stringify(blockMessage);
                shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
                cId = shortid.generate();
                dt = dateTime.create();
                date = dt.format("Y-m-d H:M:S");
                blockValue = blockValue.replace("{", "{\"@class\":\"com.vm.utils.BlockMessage\" , \"campaignId\":\"" + cId + "\", ");
                blockValue = blockValue.replace("}", ", \"receivedTime\":\"" + date + "\" }");
                return [2 /*return*/, Promise.resolve(client.hset(ProcessEnv.ProcessEnvDBRedis._block_user_map, blockMessage.getKey(), blockValue)
                        .then(function (result, err) {
                        if (err) {
                            errorMessage = new BlockMessage_1.BlockErrorMessage(false, err);
                            LogUtils_1.logger.info("saveBlockMessage : error, params ==>", err, blockMessage.getKey());
                            return new BlockMessage_1.BlockErrorMessage(false, "OK");
                        }
                        else if (result === 1) {
                            LogUtils_1.logger.info("saveBlockMessage: Success : blocked params ==>", blockMessage.getKey());
                            tables.blockeduser.create({
                                username: blockMessage.getUsername(),
                                senderid: blockMessage.getSenderid(),
                                luser: luserName,
                                expiredTime: blockMessage.getExpiredtime(),
                                action: "Blocked", campaignId: cId
                            }).then(function (result) {
                                LogUtils_1.logger.info("saveBlockMessage: logged into table: success");
                            }).catch(function (error) {
                                LogUtils_1.logger.error("saveBlockMessage: logged into table: failed", error.err);
                            });
                            var loggedusername = memdb.getUserNameByUserId(Number(blockMessage.getLoginuserid()));
                            var dt_1 = dateTime.create();
                            var edate = dt_1.format("Y-m-d H:M:S");
                            var emailparams = {};
                            emailparams.param1 = blockMessage.getUsername();
                            emailparams.param2 = blockMessage.getSenderid();
                            emailparams.param3 = blockMessage.getExpiredtime();
                            emailparams.username = luserName;
                            emailparams.time = edate;
                            emailparams.type = 1;
                            emailalerts.emailAlerts(emailparams);
                            return new BlockMessage_1.BlockErrorMessage(true, "Successfully Blocked");
                        }
                        else {
                            LogUtils_1.logger.info("saveBlockMessage: Failed : error, params ==>", result, blockMessage.getKey());
                            return new BlockMessage_1.BlockErrorMessage(false, "Duplicate/Invalid Request");
                        }
                    }).catch(function (error) {
                        LogUtils_1.logger.error("saveBlockMessage: Failed : error, params ==>", error);
                        return new BlockMessage_1.BlockErrorMessage(false, error.name);
                    }))];
            });
        });
    };
    RedisClient.prototype.getBlockedMessageByKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage;
            return __generator(this, function (_a) {
                infoarray = [];
                return [2 /*return*/, Promise.resolve(client.hvals(ProcessEnv.ProcessEnvDBRedis._block_user_map)
                        .then(function (result, error) {
                        if (error) {
                            errorMessage = new BlockMessage_1.BlockErrorMessage(false, error.name);
                            LogUtils_1.logger.info("getBlockedMessageByKey: Failed : error ==>", error.name);
                            return errorMessage;
                        }
                        else if (result) {
                            LogUtils_1.logger.info("getBlockedMessageByKey: Success :  ==>", result);
                            result.forEach(function (reply, i) {
                                infoarray.push(JSON.parse(reply));
                            });
                            return (infoarray);
                        }
                        else {
                            LogUtils_1.logger.info("getBlockedMessageByKey: Failed : error ==>", error.name);
                            return new BlockMessage_1.BlockErrorMessage(true, "");
                        }
                    })).catch(function (error) {
                        LogUtils_1.logger.error("getBlockedMessageByKey: Failed : error ==>", error.name);
                        errorMessage = new BlockMessage_1.BlockErrorMessage(false, error.name);
                        return errorMessage;
                    })];
            });
        });
    };
    RedisClient.prototype.deleteBlockMessage = function (unblock, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("deleteBlockMessage==>", unblock);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        client.hget(ProcessEnv.ProcessEnvDBRedis._block_user_map, unblock.getKey())
                            .then(function (data) {
                            LogUtils_1.logger.info("deleteBlockMessage: getData :", data);
                            if (data) {
                                resolve(JSON.parse(data));
                            }
                            else {
                                reject(0);
                            }
                        });
                    }).then(function (cid) {
                        return new Promise(function (resolve, reject) {
                            client.hdel(ProcessEnv.ProcessEnvDBRedis._block_user_map, unblock.getKey())
                                .then(function (deletedrec) {
                                LogUtils_1.logger.info("deleteBlockMessage: deleteData :", deletedrec);
                                if (deletedrec === 1) {
                                    resolve(cid);
                                }
                                else {
                                    reject(0);
                                }
                            }).catch(function (err) {
                                LogUtils_1.logger.error("deleteBlockMessage: deleteData :", err);
                                reject(0);
                            });
                        });
                    }).then(function (logCid) {
                        return new Promise(function (resolve, reject) {
                            //  const finCid:string =  logCid;
                            tables.blockeduser.create({
                                username: unblock.getUsername(),
                                senderid: unblock.getSenderid(),
                                luser: luserName,
                                expiredTime: logCid.expireTime,
                                action: "Unblocked", campaignId: logCid.campaignId
                            }).then(function (result) {
                                LogUtils_1.logger.info("deleteBlockMessage: logtoDB : Sucess");
                                var dt = dateTime.create();
                                var edate = dt.format("Y-m-d H:M:S");
                                var loggedusername = memdb.getUserNameByUserId(Number(unblock.getLoginuserid()));
                                var emailparams = {};
                                emailparams.param1 = unblock.getUsername();
                                emailparams.param2 = unblock.getSenderid();
                                emailparams.param3 = logCid.expireTime;
                                emailparams.username = luserName;
                                emailparams.time = edate;
                                emailparams.type = 2;
                                emailalerts.emailAlerts(emailparams);
                                resolve(new BlockMessage_1.BlockErrorMessage(true, "UnBlocked"));
                            }).catch(function (error) {
                                LogUtils_1.logger.error("deleteBlockMessage: logtoDB: Failed :", error);
                                reject(new BlockMessage_1.BlockErrorMessage(false, "Duplicate/Invalid Request"));
                            });
                        });
                    }).catch(function (error) {
                        LogUtils_1.logger.error("deleteBlockMessage: Failed :", error);
                        return false;
                    })];
            });
        });
    };
    // async unblockKey(unblock: UnBlockMessage, cid:any){
    //     let errorMessage: BlockErrorMessage;
    //     return await Promise.resolve(client.hdel(ProcessEnv.ProcessEnvDBRedis._block_user_map, unblock.getKey())
    //     .then(function (result: any, err: any) {
    //         if (err) {
    //             logger.error("unblockKey: Failed : error ==>", err);
    //             errorMessage = new BlockErrorMessage(false, err);
    //          return errorMessage;
    //         } else if (result) {
    //             const date =new Date();
    //             tables.blockeduser.create(
    //          {
    //           luser: unblock.getLoginuserid(), senderid: unblock.getSenderid(), username:unblock.getUsername(), action:"unblock", campaignId:cid
    //      }).then(result =>{
    //          logger.info ("unblockKey: logged into table: success");
    //          return new BlockErrorMessage(true, "UnBlocked");
    //      }).catch(error => {
    //          logger.info ("unblockKey: logged into table: failed", cid, error);
    //          return new BlockErrorMessage(false, "Duplicate/Invalid Request");
    //      });  
    //      return  new BlockErrorMessage(true, "UnBlocked");
    //         } else {
    //             logger.info("deleteBlockMessage: Failed : error ==>", err);
    //             return null;
    //             //  return new BlockErrorMessage(false, "Duplicate/Invalid Request");
    //         }
    //        ;
    //     }).catch((error: any) => {
    //         logger.error("getBlockedMessageByKey: Failed : error ==>", error.name);
    //         errorMessage = new BlockErrorMessage(false, error);
    //         return null;
    //     }))
    // }
    //     async getCid(key: any){
    //         logger.info("getCid ==>");
    //         return Promise.resolve(client.hvals(ProcessEnv.ProcessEnvDBRedis._block_user_map, key)
    //             .then(function (result: any, err: any) {
    //                 if (err) {
    //                     logger.info("deleteBlockMessage: Failed : error ==>", err);
    //                     return null;
    //                     //return new BlockErrorMessage(false, "Duplicate request");
    //                 } else if (result) {
    //                    return result.campaignId;
    //                 } else {
    //                     logger.info("deleteBlockMessage: Failed : error ==>", err);
    //                     return null;
    //                     //  return new BlockErrorMessage(false, "Duplicate/Invalid Request");
    //                 }
    //             }).catch((error: any) => {
    //                 logger.error("getBlockedMessageByKey: Failed : error ==>", error.name);
    //                 return null;
    //             }));
    //     }
    // async findDnd(number: string, type: number) {
    //     let key: string;
    //     switch (type) {
    //         case 1:
    //             key = ProcessEnv.ProcessEnvDnd._dndKey;
    //             break;
    //         case 2:
    //             key = ProcessEnv.ProcessEnvDnd._dnsKey;
    //             break;
    //         case 3:
    //             key = ProcessEnv.ProcessEnvDnd._gdnsKey;
    //             break;
    //         default:
    //             key = "";
    //     }
    //     const resultval = await Promise.resolve(client.hget(key, number))
    //         .then((result: any) => {
    //             logger.info(result);
    //             if (result != null) {
    //                 console.log(key, " check ==>  true");
    //                 return true;
    //             } else {
    //                 console.log(key, "dnd check ==> false");
    //                 return false;
    //             }
    //             // return (result);
    //         }).catch(error => {
    //             logger.info(error, "==>");
    //             return false;
    //         });
    //     return resultval;
    // }
    RedisClient.prototype.findStatusByRef = function (number, type) {
        var mapName = type === RefType.VIP ? ProcessEnv.ProcessEnvDnd._gdnsKey : type === RefType.DND ? ProcessEnv.ProcessEnvDnd._dndKey : ProcessEnv.ProcessEnvDnd._dnsKey;
        var resultval = Promise.resolve(client.hget(mapName, number))
            .then(function (result) {
            LogUtils_1.logger.info("findStatusByRef: MSISDN: [%s],RefType: [%s], result: [%s] =>", number, type, result);
            return result === null ? false : true;
        }).catch(function (error) {
            LogUtils_1.logger.error("findStatusByRef: findStatusByRef =>", error);
            return false;
        });
        return resultval;
    };
    RedisClient.prototype.logData = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    RedisClient.prototype.saveLoginuserToken = function (loginResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // let loginErrorMessage: LoginErrorMessage;
                // const key = "AUTH:"+loginResponse.getUserId();
                Promise.resolve(client.setex(loginResponse.getToken(), ProcessEnv.ProcessEnvService._userSessionTimeout * 60, JSON.stringify(loginResponse), function (err, result) {
                    LogUtils_1.logger.info("saveLoginuserToken : sucess=>", result);
                    if (err)
                        LogUtils_1.logger.error("saveLoginuserToken : Failed=>", result);
                }));
                return [2 /*return*/];
            });
        });
    };
    RedisClient.prototype.reviveUserToken = function (token, userObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // let loginErrorMessage: LoginErrorMessage;
                // const key = "AUTH:"+loginResponse.getUserId();
                Promise.resolve(client.setex(token, ProcessEnv.ProcessEnvService._userSessionTimeout * 60, JSON.stringify(userObj), function (err, result) {
                    LogUtils_1.logger.info("reviveUserToken : sucess=>", result);
                    if (err)
                        LogUtils_1.logger.error("reviveUserToken : Failed=>", result);
                }));
                return [2 /*return*/];
            });
        });
    };
    RedisClient.prototype.getExpiryKey = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(client.get(token)).then(function (result) {
                            LogUtils_1.logger.info("getExpiryKey : sucess=>", result);
                            if (result != null) {
                                return result;
                            }
                            else {
                                return false;
                            }
                            //return result;
                        }).catch(function (error) {
                            LogUtils_1.logger.error("getExpiryKey : failed=>", error);
                            return error;
                        })];
                    case 1: 
                    // const decoded: any = JWT.decode(token);
                    // logger.info("decoded ==>:", decoded.id);
                    // const redistoken = new RedisClient();
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RedisClient.prototype.deleteKey = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(client.del(token)).then(function (result) {
                            LogUtils_1.logger.info("getExpiryKey : sucess=>", result);
                            if (result != null && result === 1) {
                                LogUtils_1.logger.info("deleteKey> =", result);
                                return true;
                            }
                            else {
                                return false;
                            }
                            //return result;
                        }).catch(function (error) {
                            LogUtils_1.logger.error("getExpiryKey : failed=>", error);
                            return false;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RedisClient.prototype.getUserSenderData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getUserSenderData ==>");
                return [2 /*return*/, Promise.resolve(client.hkeys(ProcessEnv.ProcessEnvDBRedis._router_map)
                        .then(function (result, error) {
                        LogUtils_1.logger.info("getUserSenderData: success");
                        return result;
                    })).catch(function (error) {
                        LogUtils_1.logger.error("getUserSenderData: Failed : error ==>", error.name);
                        errorMessage = new BlockMessage_1.BlockErrorMessage(false, error.name);
                        return errorMessage;
                    })];
            });
        });
    };
    RedisClient.prototype.checkBlockStatus = function (key) {
        return Promise.resolve(client.hget(ProcessEnv.ProcessEnvDBRedis._block_user_map, key)).then(function (result) {
            LogUtils_1.logger.info("checkBlockStatus : sucess=>", key, result);
            if (result != null) {
                return 1;
            }
            else {
                return 0;
            }
            //return result;
        }).catch(function (error) {
            LogUtils_1.logger.error("getExpiryKey : failed=>", error);
            return error;
        });
    };
    RedisClient.prototype.checkGroupStatus = function (smscId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("RedisUtils: checkGroupStatus:", smscId);
                return [2 /*return*/, Promise.resolve(client.hget(ProcessEnv.ProcessEnvDBRedis._groups_map, smscId)).then(function (result) {
                        LogUtils_1.logger.info("checkBlockStatus : sucess=>", smscId, result);
                        if (result != null) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                        //return result;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("checkGroupStatus : failed=>", error);
                        return error;
                    })];
            });
        });
    };
    RedisClient.prototype.cgroupAdd = function (smscdata, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage, smscPacket;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("RedisUtils: cgroupAdd:", smscdata[0].smscId);
                smscPacket = JSON.stringify(smscdata);
                smscPacket = smscPacket.replace("[{", "{\"@class\":\"com.vm.utils.RedisEsme\", ");
                smscPacket = smscPacket.replace("}]", ", \"prasDlr\": false }");
                return [2 /*return*/, Promise.resolve(client.hset(ProcessEnv.ProcessEnvDBRedis._groups_map, smscdata[0].smscId, smscPacket)
                        .then(function (result, err) {
                        if (err) {
                            errorMessage = new BlockMessage_1.BlockErrorMessage(false, err);
                            LogUtils_1.logger.error("cgroupAdd : error, params ==>", err, smscdata[0].smscId);
                            return new BlockMessage_1.BlockErrorMessage(false, "OK");
                        }
                        else if (result === 1) {
                            LogUtils_1.logger.info("cgroupAdd: Success : blocked params ==>", smscdata[0].smscId);
                            var dt = dateTime.create();
                            var edate = dt.format("Y-m-d H:M:S");
                            var emailparams = {};
                            emailparams.param1 = smscdata[0].groupName;
                            emailparams.param2 = smscdata[0].smscId;
                            emailparams.param3 = "add";
                            emailparams.username = luserName;
                            emailparams.time = edate;
                            emailparams.type = 8;
                            emailalerts.emailAlerts(emailparams);
                            return new BlockMessage_1.BlockErrorMessage(true, "Successfully Added");
                        }
                        else {
                            LogUtils_1.logger.info("cgroupAdd: Failed : error, params ==>", result, smscdata[0].smscId);
                            return new BlockMessage_1.BlockErrorMessage(false, "Duplicate/Invalid Request");
                        }
                    }).catch(function (error) {
                        LogUtils_1.logger.error("cgroupAdd: Failed : error, params ==>", error);
                        return new BlockMessage_1.BlockErrorMessage(false, error.name);
                    }))];
            });
        });
    };
    RedisClient.prototype.cgroupRemove = function (groupRemove, luserName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("cgroupRemove==>", groupRemove.smscId);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        client.hdel(ProcessEnv.ProcessEnvDBRedis._groups_map, groupRemove.smscId)
                            .then(function (deletedrec) {
                            LogUtils_1.logger.info("cgroupRemove: deleteData : SmcdId", groupRemove.smscId, deletedrec);
                            if (deletedrec === 1) {
                                resolve(groupRemove);
                            }
                            else {
                                reject(0);
                            }
                        }).catch(function (err) {
                            LogUtils_1.logger.error("cgroupRemove: deleteData : SmcdId", groupRemove.smscId, err);
                            reject(0);
                        });
                    })
                        .then(function (log) {
                        return new Promise(function (resolve, reject) {
                            LogUtils_1.logger.info("cgroupRemove: logtoDB : Sucess:  SmcdId", groupRemove.smscId);
                            var dt = dateTime.create();
                            var edate = dt.format("Y-m-d H:M:S");
                            var loggedusername = luserName;
                            var emailparams = {};
                            emailparams.param1 = groupRemove.groupName;
                            emailparams.param2 = groupRemove.smscId;
                            emailparams.param3 = "removed";
                            emailparams.username = luserName;
                            emailparams.time = edate;
                            emailparams.type = 9;
                            emailalerts.emailAlerts(emailparams);
                            resolve(new BlockMessage_1.BlockErrorMessage(true, "Removed"));
                        });
                    }).catch(function (error) {
                        LogUtils_1.logger.error("cgroupRemove: Failed :", groupRemove.smscId, error);
                        return new BlockMessage_1.BlockErrorMessage(false, error.name);
                    })];
            });
        });
    };
    RedisClient.prototype.groupsHisotry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var addArray;
            return __generator(this, function (_a) {
                addArray = [];
                return [2 /*return*/, Promise.resolve(client.hvals(ProcessEnv.ProcessEnvDBRedis._groups_map)).then(function (result) {
                        LogUtils_1.logger.info("groupsHisotry :sucess", result.length);
                        if (result != null) {
                            result.forEach(function (element) {
                                var smscdata = JSON.parse(element);
                                var smscsdded = {};
                                smscsdded.smscId = smscdata.smscId;
                                smscsdded.groupName = smscdata.groupName;
                                smscsdded.tps = smscdata.tps;
                                smscsdded.txSessions = smscdata.txSessions;
                                smscsdded.trxSessions = smscdata.trxSessions;
                                smscsdded.rxSessions = smscdata.rxSessions;
                                smscsdded.smscName = smscdata.smscName;
                                addArray.push(smscsdded);
                            });
                            LogUtils_1.logger.info("groupsHisotry: loaded data: count", addArray.length);
                            return addArray;
                        }
                        else {
                            return [];
                        }
                        //return result;
                    }).catch(function (error) {
                        LogUtils_1.logger.error("groupsHisotry : failed=>", error);
                        return error;
                    })];
            });
        });
    };
    RedisClient = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [])
    ], RedisClient);
    return RedisClient;
}());
exports.RedisClient = RedisClient;
var RefType;
(function (RefType) {
    RefType[RefType["VIP"] = 0] = "VIP";
    RefType[RefType["DND"] = 1] = "DND";
    RefType[RefType["DNS"] = 2] = "DNS";
})(RefType = exports.RefType || (exports.RefType = {}));
