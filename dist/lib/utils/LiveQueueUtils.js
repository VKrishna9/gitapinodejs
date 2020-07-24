"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LiveQueue = /** @class */ (function () {
    function LiveQueue(loginuserid) {
        this.loginuserid = loginuserid;
    }
    return LiveQueue;
}());
exports.LiveQueue = LiveQueue;
var LiveQueueErrorMessage = /** @class */ (function () {
    function LiveQueueErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return LiveQueueErrorMessage;
}());
exports.LiveQueueErrorMessage = LiveQueueErrorMessage;
