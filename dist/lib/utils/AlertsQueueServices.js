"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessEnv = require("../config/config");
var Stomp = require("stomp-client");
var js2xmlparser = require("js2xmlparser");
// const client = new Stomp(ProcessEnv.ProcessEnvQ._host, ProcessEnv.ProcessEnvQ._port, ProcessEnv.ProcessEnvQ._username, ProcessEnv.ProcessEnvQ._password);
var dbTables = require("../model/db.tables");
var dbUtils_1 = require("../utils/dbUtils");
var LogUtils_1 = require("../utils/LogUtils");
var AlertMessage_1 = require("./AlertMessage");
var qUtils_1 = require("../utils/qUtils");
var tables = dbTables.getModels(dbUtils_1.connect);
// export const qconnection1 = client.connect(function (data: any) {
//     logger.info("AlertsQueueServices ActiveMQ Connected :", data);
// }, function (err: any) {
//     logger.error("Excep : AlertsQueueServices : Error :", err);
// });
var AlertsQueueServices = /** @class */ (function () {
    function AlertsQueueServices() {
    }
    AlertsQueueServices.prototype.consumeAlerts = function () {
        LogUtils_1.logger.info("consumeAlerts: ActiveMQ Connected :");
        qUtils_1.qconnection.subscribe(ProcessEnv.ProcessEnvQ._alert_q, function (body, headers) {
            var object = new AlertMessage_1.AlertMessage(body);
            LogUtils_1.logger.log("consumeAlerts: Recevied Alert : %s", object);
            if (object._source != "NIMPL") {
                var user_id = object._name.substring(0, object._name.indexOf("-"));
                var sessionid = object._name.substr(object._name.indexOf("-") + 1);
                var tableName_1;
                if (object._source == "SERVER") {
                    tableName_1 = tables.esmeMaster;
                }
                else if (object._source == "CLIENT") {
                    tableName_1 = tables.smscMaster;
                }
                tableName_1.upsert({ bindtype: object._bindtype, host: object._host, userId: user_id, port: object._port, source: object._source, status: object._status, systemId: object._systemid, sessionId: sessionid, name: object._name, time: object._date }).then((function (result) {
                    LogUtils_1.logger.info("consumeAlerts: Upsert into table:[%s], Result:[%s]", tableName_1, result);
                    return result;
                })).catch(function (err) {
                    LogUtils_1.logger.error("consumeAlerts: Upsert into table:[%s], Result:[%s]", tableName_1, err.Error);
                });
                tables.alertsHistory.create({
                    bindtype: object._bindtype, host: object._host, userId: user_id, port: object._port,
                    source: object._source, status: object._status, systemId: object._systemid,
                    sessionId: sessionid, name: object._name, time: object._date
                }).then(function (result) {
                    LogUtils_1.logger.info("consumeAlerts: Insert into table:[AlertsHistory], Result:[%s]", result);
                    return result;
                }).catch(function (err) {
                    LogUtils_1.logger.error("consumeAlerts: Insert into table:[AlertsHistory], Failed:[%s]", err);
                });
            }
            else {
                LogUtils_1.logger.error("consumeAlerts: Insert into table:[AlertsHistory], Not Implemented");
            }
        }
        // , function (error: any) {
        //     logger.error("consumeAlerts: Insert into table:[AlertsHistory], Failed:[%s]---->", error);
        // }
        );
    };
    return AlertsQueueServices;
}());
exports.AlertsQueueServices = AlertsQueueServices;
