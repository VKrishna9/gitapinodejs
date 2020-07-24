"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = exports.LoginErrorMessage = exports.Login = void 0;
var Login = /** @class */ (function () {
    function Login(username, password, userrole) {
        this.username = username;
        this.password = password;
        this.userrole = userrole;
    }
    Login.prototype.getUsername = function () {
        return (this.username);
    };
    Login.prototype.getPassword = function () {
        return (this.password);
    };
    Login.prototype.getRole = function () {
        return (this.userrole);
    };
    Login.prototype.isValid = function () {
        if (this.username.length < 0 && this.password.length < 0) {
            return false;
        }
        return true;
    };
    return Login;
}());
exports.Login = Login;
var LoginErrorMessage = /** @class */ (function () {
    function LoginErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return LoginErrorMessage;
}());
exports.LoginErrorMessage = LoginErrorMessage;
var LoginResponse = /** @class */ (function () {
    function LoginResponse(_userName, _userId, _token, _date) {
        this.userName = _userName;
        this.userId = _userId;
        this.token = _token;
        this.date = _date;
    }
    LoginResponse.prototype.getUsername = function () {
        return (this.userName);
    };
    LoginResponse.prototype.getUserId = function () {
        return (this.userId);
    };
    LoginResponse.prototype.getToken = function () {
        return (this.token);
    };
    LoginResponse.prototype.getDate = function () {
        return (this.date);
    };
    return LoginResponse;
}());
exports.LoginResponse = LoginResponse;
// export interface LoginResponses {
//     UserName: string;
//     UserId: number;
//     token: string;
//     // constructor(_userName: string, _userId: number, _token: string) {
//     //    this.userName = _userName;
//     //    this.userId = _userId;
//     //    this.token = _token;
//     }
