"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOutError = exports.SessionTimeOutError = exports.UserNotFoundError = exports.CustomeError = exports.LogInUser = exports.TokenChecker = void 0;
var routing_controllers_1 = require("routing-controllers");
var LoginRepository_1 = require("../repositorys/LoginRepository");
var LogUtils_1 = require("../utils/LogUtils");
function TokenChecker(options) {
    return routing_controllers_1.createParamDecorator({
        required: options && options.required ? true : false,
        value: function (action) {
            // perform queries based on token from request headers
            var token = action.request.headers["authorization"];
            if (token) {
                return LoginRepository_1.LoginRepository.prototype.tokenValidate(token)
                    .then(function (result) {
                    if (result != false) {
                        var resultObj = JSON.parse(result);
                        LogUtils_1.logger.info("Result object:==>", resultObj);
                        return new LogInUser(resultObj.userId, resultObj.userName, resultObj.token, 0);
                    }
                    else {
                        return new LogInUser(result.userId, result.userName, result.token, 599);
                        ;
                    }
                }).catch(function (error) {
                    LogUtils_1.logger.error("TokenChecker: Failed===>", error);
                    return new LogInUser(0, "", "", 404);
                });
            }
            else {
                return new LogInUser(0, "", "", 401);
            }
        }
    });
}
exports.TokenChecker = TokenChecker;
var LogInUser = /** @class */ (function () {
    function LogInUser(_userId, _userName, _role, _error) {
        this.userId = _userId;
        this.userName = _userName;
        this.role = _role;
        this.error = _error;
    }
    return LogInUser;
}());
exports.LogInUser = LogInUser;
var CustomeError = /** @class */ (function (_super) {
    __extends(CustomeError, _super);
    function CustomeError(code, operationName, args) {
        if (args === void 0) { args = []; }
        var _this = _super.call(this, code) || this;
        Object.setPrototypeOf(_this, CustomeError.prototype);
        _this.operationName = operationName;
        _this.args = args; // can be used for internal logging
        return _this;
    }
    CustomeError.prototype.toJSON = function () {
        return {
            status: this.httpCode,
            message: this.operationName
        };
    };
    return CustomeError;
}(routing_controllers_1.HttpError));
exports.CustomeError = CustomeError;
var UserNotFoundError = /** @class */ (function (_super) {
    __extends(UserNotFoundError, _super);
    function UserNotFoundError() {
        return _super.call(this, 401, "User not found") || this;
    }
    return UserNotFoundError;
}(routing_controllers_1.HttpError));
exports.UserNotFoundError = UserNotFoundError;
var SessionTimeOutError = /** @class */ (function (_super) {
    __extends(SessionTimeOutError, _super);
    function SessionTimeOutError() {
        return _super.call(this, 599, "Session Timed Out") || this;
    }
    return SessionTimeOutError;
}(routing_controllers_1.HttpError));
exports.SessionTimeOutError = SessionTimeOutError;
var TimeOutError = /** @class */ (function (_super) {
    __extends(TimeOutError, _super);
    function TimeOutError() {
        return _super.call(this, 404, "Session Timed Out") || this;
    }
    return TimeOutError;
}(routing_controllers_1.HttpError));
exports.TimeOutError = TimeOutError;
