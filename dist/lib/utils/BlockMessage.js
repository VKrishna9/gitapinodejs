"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockMessage = /** @class */ (function () {
    function BlockMessage(
    // private class1: string,
    userName, senderId, loginUserId, blockedCount, message, expireTime) {
        this.userName = userName;
        this.senderId = senderId;
        this.loginUserId = loginUserId;
        this.blockedCount = blockedCount;
        this.message = message;
        this.expireTime = expireTime;
    }
    // setClass(cla:string){
    //     this.class1=cla;
    // }
    BlockMessage.prototype.getKey = function () {
        return (this.userName + ":" + this.senderId).toUpperCase();
    };
    BlockMessage.prototype.getLoginuserid = function () {
        return this.loginUserId;
    };
    BlockMessage.prototype.getUsername = function () {
        return this.userName.toUpperCase();
    };
    BlockMessage.prototype.getSenderid = function () {
        return this.senderId.toUpperCase();
    };
    BlockMessage.prototype.getExpiredtime = function () {
        return this.expireTime;
    };
    BlockMessage.prototype.isValid = function () {
        if (this.userName === undefined || this.userName.length < 0) {
            return false;
        }
        return true;
    };
    return BlockMessage;
}());
exports.BlockMessage = BlockMessage;
var BlockErrorMessage = /** @class */ (function () {
    function BlockErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return BlockErrorMessage;
}());
exports.BlockErrorMessage = BlockErrorMessage;
var UnBlockMessage = /** @class */ (function () {
    function UnBlockMessage(userName, senderId, loginUserId, expireTime) {
        this.userName = userName;
        this.senderId = senderId;
        this.loginUserId = loginUserId;
        this.expireTime = expireTime;
    }
    UnBlockMessage.prototype.getExpiredtime = function () {
        return this.expireTime;
    };
    UnBlockMessage.prototype.getKey = function () {
        return (this.userName + ":" + this.senderId).toUpperCase();
    };
    UnBlockMessage.prototype.getUsername = function () {
        return (this.userName).toUpperCase();
    };
    UnBlockMessage.prototype.getSenderid = function () {
        return (this.senderId).toUpperCase();
    };
    UnBlockMessage.prototype.getLoginuserid = function () {
        return (this.loginUserId);
    };
    UnBlockMessage.prototype.isValid = function () {
        if (this.userName.length < 0) {
            return false;
        }
        return true;
    };
    return UnBlockMessage;
}());
exports.UnBlockMessage = UnBlockMessage;
var UnBlockErrorMessage = /** @class */ (function () {
    function UnBlockErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return UnBlockErrorMessage;
}());
exports.UnBlockErrorMessage = UnBlockErrorMessage;
var BlockedData = /** @class */ (function () {
    function BlockedData(loginUserId) {
        this.loginUserId = loginUserId;
    }
    BlockedData.prototype.isValid = function () {
        if (this.loginUserId < 0) {
            return false;
        }
        return true;
    };
    return BlockedData;
}());
exports.BlockedData = BlockedData;
var BlockedDataErrorMessage = /** @class */ (function () {
    function BlockedDataErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return BlockedDataErrorMessage;
}());
exports.BlockedDataErrorMessage = BlockedDataErrorMessage;
var QueryUserSenderData = /** @class */ (function () {
    function QueryUserSenderData(userName, senderId, searchKey) {
        this.userName = userName;
        this.senderId = senderId;
        this.searchKey = searchKey;
    }
    QueryUserSenderData.prototype.getsearchKey = function () {
        return (this.searchKey).toUpperCase();
    };
    QueryUserSenderData.prototype.getUsername = function () {
        if (this.userName.length > 0) {
            return (this.userName).toUpperCase();
        }
        return "";
    };
    QueryUserSenderData.prototype.getSenderid = function () {
        return (this.senderId).toUpperCase();
    };
    QueryUserSenderData.prototype.isValid = function () {
        if (this.userName.length < 0) {
            return false;
        }
        return true;
    };
    return QueryUserSenderData;
}());
exports.QueryUserSenderData = QueryUserSenderData;
