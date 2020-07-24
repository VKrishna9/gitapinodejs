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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.LoginRepository = void 0;
var typedi_1 = require("typedi");
var Login_1 = require("../utils/Login");
var LogUtils_1 = require("../utils/LogUtils");
var CryptoJS = require("crypto-js");
var shortid = require("shortid");
var dateTime = require("node-datetime");
// const jwt  = require ("express-jwt");
var JWT = require("jsonwebtoken");
var TokenChecker_1 = require("../utils/TokenChecker");
var LoginRepository = /** @class */ (function () {
    function LoginRepository(Login) {
        this.Login = Login;
    }
    LoginRepository.prototype.checkUserlogin = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var token, dt, logindatetime, resp;
            return __generator(this, function (_a) {
                //    return SearchModel.find()
                //         .then((user: any[]) => {
                LogUtils_1.logger.info(login.getUsername());
                // if(user.length >0){
                if (login.getUsername() == 'admin' || login.getUsername() == 'agent1' || login.getUsername() == 'agent2') {
                    // if (user[0].UserPassword === "") {
                    if (1 === 1) {
                        token = JWT.sign({ id: login.getUsername(), username: login.getUsername, userrole: login.getRole() }, "ProcessEnvAuth.__secret", {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        dt = dateTime.create();
                        logindatetime = dt.format("m-d-Y H:M:S");
                        resp = new Login_1.LoginResponse(login.getUsername(), shortid.generate(), token, logindatetime);
                        // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                        return [2 /*return*/, resp];
                    }
                    else {
                        LogUtils_1.logger.info("checkUserlogin: failed.");
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    }
                }
                else {
                    LogUtils_1.logger.info("checkUserlogin: failed. ");
                    throw new TokenChecker_1.CustomeError(401, "User not found");
                }
                // }).catch((err: any) => {
                //     logger.error("checkUserlogin: failed:==>", err);
                //     return (false);
                // });
                LogUtils_1.logger.info("Login request End.");
                return [2 /*return*/];
            });
        });
    };
    LoginRepository.prototype.encrypt = function (plainText, key) {
        var C = CryptoJS;
        plainText = C.enc.Utf8.parse(plainText);
        var oKey = C.enc.Utf8.parse(key);
        key = C.enc.Utf8.parse("0000000000000000");
        key.words = oKey.words.slice(0, key.words.length);
        var aes = C.algo.AES.createEncryptor(key, {
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7,
            iv: key
        });
        var aesProcessor = aes.process(plainText);
        var enctypted = aes.finalize();
        return C.enc.Base64.stringify(enctypted);
    };
    LoginRepository.prototype.decrypt = function (encryptedText, key) {
        var C = CryptoJS;
        encryptedText = C.enc.Base64.parse(encryptedText);
        var oKey = C.enc.Utf8.parse(key);
        key = C.enc.Utf8.parse("0000000000000000");
        key.words = oKey.words.slice(0, key.words.length);
        var aes = C.algo.AES.createDecryptor(key, {
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7,
            iv: key
        });
        var aesProcessor = aes.process(encryptedText);
        var decrypted = aes.finalize(); // );
        return C.enc.Utf8.stringify(decrypted);
    };
    LoginRepository.prototype.tokenValidate = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    LoginRepository = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [Login_1.Login])
    ], LoginRepository);
    return LoginRepository;
}());
exports.LoginRepository = LoginRepository;
