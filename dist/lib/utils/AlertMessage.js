"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlertMessage = /** @class */ (function () {
    function AlertMessage(msg) {
        var msgsplititems = msg.split(",");
        if (msgsplititems.length === 7) {
            this._source = msgsplititems[1].split("=")[1];
            this._cmd = msgsplititems[0].split("=")[1];
            this._systemid = msgsplititems[2].split("=")[1];
            this._name = msgsplititems[3].split("=")[1];
            this._host = msgsplititems[4].split("=")[1];
            this._date = msgsplititems[5].split("=")[1];
            this._status = msgsplititems[6].split("=")[1];
            this._password = "";
            this._port = "";
            this._bindtype = "";
        }
        else if (msgsplititems.length === 10) {
            this._source = msgsplititems[1].split("=")[1];
            this._cmd = msgsplititems[0].split("=")[1];
            this._name = msgsplititems[2].split("=")[1];
            this._systemid = msgsplititems[3].split("=")[1];
            this._password = msgsplititems[4].split("=")[1];
            this._host = msgsplititems[5].split("=")[1];
            this._port = msgsplititems[6].split("=")[1];
            this._bindtype = msgsplititems[7].split("=")[1];
            this._date = msgsplititems[8].split("=")[1];
            this._status = msgsplititems[9].split("=")[1];
        }
        else {
            this._source = "NIMPL";
        }
    }
    AlertMessage.prototype.getcmd = function () {
        return this._cmd;
    };
    AlertMessage.prototype.getsource = function () {
        return this._source;
    };
    AlertMessage.prototype.getname = function () {
        return this._name;
    };
    AlertMessage.prototype.getsystemid = function () {
        return this._systemid;
    };
    AlertMessage.prototype.getpassword = function () {
        return this._password;
    };
    AlertMessage.prototype.gethost = function () {
        return this._host;
    };
    AlertMessage.prototype.getport = function () {
        return this._port;
    };
    AlertMessage.prototype.getbindtype = function () {
        return this._bindtype;
    };
    AlertMessage.prototype.getdate = function () {
        return this._date;
    };
    AlertMessage.prototype.getstatus = function () {
        return this._status;
    };
    return AlertMessage;
}());
exports.AlertMessage = AlertMessage;
var AlertUserInfo = /** @class */ (function () {
    function AlertUserInfo(_userId, _reqType) {
        this.userId = _userId;
        this.reqType = _reqType;
    }
    AlertUserInfo.prototype.getuserKey = function () {
        return (this.userId);
    };
    AlertUserInfo.prototype.gettypeKey = function () {
        return (this.reqType);
    };
    AlertUserInfo.prototype.isValid = function () {
        return this.userId ? false : this.userId < 0 ? false : true;
        // if (this.userId < 0) {
        //     return false;
        // }
        // return true;
    };
    return AlertUserInfo;
}());
exports.AlertUserInfo = AlertUserInfo;
var AlertUserInfoErrorMessage = /** @class */ (function () {
    function AlertUserInfoErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return AlertUserInfoErrorMessage;
}());
exports.AlertUserInfoErrorMessage = AlertUserInfoErrorMessage;
var AlertRequest = /** @class */ (function () {
    function AlertRequest(loginuserid) {
        this.loginuserid = loginuserid;
    }
    AlertRequest.prototype.getLoginUserId = function () {
        return (this.loginuserid);
    };
    return AlertRequest;
}());
exports.AlertRequest = AlertRequest;
var AlertRequestErrorMessage = /** @class */ (function () {
    function AlertRequestErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return AlertRequestErrorMessage;
}());
exports.AlertRequestErrorMessage = AlertRequestErrorMessage;
