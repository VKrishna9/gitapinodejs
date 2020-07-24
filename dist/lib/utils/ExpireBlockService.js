"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js_1 = require("log4js");
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var sequelizer = require("sequelize");
var tables = dbTables.getModels(dbUtils_1.connect);
var ProcessEnv = require("../config/config");
var EmailUtils_1 = require("./EmailUtils");
var datetime = require('node-datetime');
var logger = log4js_1.getLogger();
var emailalerts = new EmailUtils_1.EmailAlerts();
var client = require("redis-pooling")({
    maxPoolSize: 10,
    credentials: {
        host: ProcessEnv.ProcessEnvDBRedis._host,
        port: ProcessEnv.ProcessEnvDBRedis._port,
        password: ProcessEnv.ProcessEnvDBRedis._password
    },
});
var ExpireBlockService = /** @class */ (function () {
    function ExpireBlockService() {
    }
    ExpireBlockService.prototype.processExpireBlockMessage = function () {
        var expiredArray = [];
        var promise = new Promise(function (resolve, reject) {
            client.hvals(ProcessEnv.ProcessEnvDBRedis._block_user_map, function (err, result) {
                if (err) {
                    logger.error("processExpireBlockMessage: Failed =>", err);
                    reject(false);
                }
                else {
                    logger.info("processExpireBlockMessage: Success =>", result);
                    result.forEach(function (message) {
                        var now = new Date();
                        var obj = JSON.parse(message);
                        var expiredDate = new Date(obj.expireTime);
                        //let difference = now - expiredDate;
                        var key = (obj.userName + ":" + obj.senderId).toUpperCase();
                        logger.info("processExpireBlockMessage: Key:[%s], Now:[%s], expiredDate:[%s]", key, now, expiredDate);
                        if (expiredDate >= now) {
                            logger.info("processExpireBlockMessage: Block not expired :", obj.userName);
                        }
                        else {
                            logger.info("processExpireBlockMessage: BlockMessage expired :", obj.userName);
                            var expiredMessage = {};
                            expiredMessage.key = key;
                            expiredMessage.expireTime = obj.expireTime;
                            expiredMessage.expireCid = obj.campaignId;
                            expiredArray.push(expiredMessage);
                        }
                    });
                    resolve(true);
                }
            }, function (err) {
                logger.error("processExpireBlockMessage: Failed =>", err);
                reject(false);
            });
        });
        promise.then(function (data) {
            logger.info("processExpireBlockMessage: Recevied data:[%s], expiredMessage:[%s]", data, expiredArray);
            if (expiredArray.length > 0) {
                expiredArray.forEach(function (message) {
                    logger.info("processExpireBlockMessage: Key:[%s],expireTime:[%s]", message.key, message.expireTime);
                    client.hdel(ProcessEnv.ProcessEnvDBRedis._block_user_map, message.key, function (err, result) {
                        if (err) {
                            logger.error("processExpireBlockMessage: Error deleted Block key:[%s] =>", message.key);
                        }
                        else {
                            logger.info("processExpireBlockMessage: Deleted Block key:[%s] =>", message);
                            // save delete message to DB
                            var key = message.key;
                            var index = key.indexOf(":");
                            var userid_1 = (key.substring(0, index));
                            var senderid_1 = key.substring(key.indexOf(":") + 1);
                            tables.blockeduser.create({
                                username: userid_1,
                                senderid: senderid_1,
                                luser: "0",
                                expiredTime: message.expireTime,
                                action: "Unblocked", campaignId: message.expireCid
                            }).then(function (result) {
                                var dt = datetime.create();
                                var date = dt.format("Y-m-d H:M:S");
                                var emailparams = {};
                                emailparams.param1 = userid_1;
                                emailparams.param2 = senderid_1;
                                emailparams.param3 = message.expireTime;
                                emailparams.username = "Auto Expired";
                                emailparams.time = date;
                                emailparams.type = 2;
                                emailalerts.emailAlerts(emailparams);
                                logger.info("processExpireBlockMessage: logged into table: success");
                            }).catch(function (error) {
                                logger.info("processExpireBlockMessage: logged into table: failed");
                            });
                        }
                    });
                });
            }
        });
    };
    return ExpireBlockService;
}());
exports.ExpireBlockService = ExpireBlockService;
