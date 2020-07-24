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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var multer = require("multer");
var routing_controllers_1 = require("routing-controllers");
var DndDnsRepository_1 = require("../repositorys/DndDnsRepository");
//const upload = multer({ dest: "uploads/" });
var fs = require("fs");
var DndDns_1 = require("../utils/DndDns");
var LogUtils_1 = require("../utils/LogUtils");
var config_1 = require("../config/config");
var TokenChecker_1 = require("../utils/TokenChecker");
var dest = config_1.ProcessEnvDnd._fileFolder;
exports.fileUploadOptions = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            LogUtils_1.logger.info("destination ==>", file);
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            LogUtils_1.logger.info("filename ==>", file.originalname);
            cb(null, file.originalname);
        }
    }),
    fileFilter: function (req, file, cb) {
        LogUtils_1.logger.info("fileFilter ==>", file);
        cb(null, true);
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 50
    }
};
var UploadController = /** @class */ (function () {
    function UploadController(dnddnsRepository) {
        this.dnddnsRepository = dnddnsRepository;
    }
    UploadController.prototype.upload = function (user, file, action, type, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var fileUploadResp_1, count_1, promise;
            var _this = this;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("upload => ", action, type, userId);
                //  const dnddnsRepository: DnddnsRepository =  new DnddnsRepository();
                switch (user.error) {
                    case 0:
                        fileUploadResp_1 = {};
                        count_1 = 0;
                        promise = new Promise(function (resolve, reject) {
                            fs.readFile(file.path, 'utf8', function (err, data) {
                                var arr = data.toString().trim().split('\n'), names = [];
                                for (var i in arr) {
                                    var trimmsisdn = arr[i].trim();
                                    if (arr[i].length > 1 && !isNaN(Number(trimmsisdn))) {
                                        names.push(arr[i].trim());
                                    }
                                }
                                LogUtils_1.logger.info("=====>", names.length);
                                count_1 = names.length;
                                resolve(count_1);
                            });
                        });
                        return [2 /*return*/, promise.then(function (count) {
                                LogUtils_1.logger.info("upload: Uploded file count =>", count);
                                if (type === "GLOBALDND") {
                                    type = "VIP";
                                }
                                ;
                                LogUtils_1.logger.info("upload: count =>", count);
                                return _this.dnddnsRepository.saveFilePath(file.filename, count, userId, action, type).then(function (result) {
                                    LogUtils_1.logger.info("upload: =>", result);
                                    return result;
                                }).catch(function (error) {
                                    LogUtils_1.logger.info("upload: =>", error);
                                    return "error";
                                });
                            }).then(function (dbId) {
                                fileUploadResp_1.dbId = dbId;
                                fileUploadResp_1.fileName = file.filename;
                                fileUploadResp_1.numberOfLines = count_1;
                                return fileUploadResp_1;
                            })];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    UploadController.prototype.checkDndDnsStatus = function (user, checkStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("checkDndDnsStatus: =>", checkStatus);
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 3];
                            case 599: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.dnddnsRepository.checkStatus(checkStatus, user.userName)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 4: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UploadController.prototype.updateNumber = function (updatenumber, user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("updatenumber: =>", updatenumber);
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 3];
                            case 599: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.dnddnsRepository.processSingleNumber(updatenumber, user.userName)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 4: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UploadController.prototype.dnddnsHistory = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("dnddnsHistory: =>");
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 3];
                            case 599: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.dnddnsRepository.getAllFileHistory()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 4: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UploadController.prototype.getAllDnsFIles = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("getAllDnsFIles: =>");
                        LogUtils_1.logger.info("------------------->", user);
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 3];
                            case 599: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.dnddnsRepository.getAllDnsFileData()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 4: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UploadController.prototype.readDndDnsData = function (user, dnsProcess) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("readDndDnsData: =>", dnsProcess);
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 3];
                            case 599: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.dnddnsRepository.dnddnsProcess(dnsProcess, user.userName)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 4: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h;
    __decorate([
        routing_controllers_1.Post("/upload"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.UploadedFile("saveFile", { options: exports.fileUploadOptions })),
        __param(2, routing_controllers_1.QueryParam("action")), __param(3, routing_controllers_1.QueryParam("type")), __param(4, routing_controllers_1.QueryParam("userid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _a || Object, Object, String, String, String]),
        __metadata("design:returntype", Promise)
    ], UploadController.prototype, "upload", null);
    __decorate([
        routing_controllers_1.Post("/checkstatus"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _b || Object, DndDns_1.DndDnsCheck]),
        __metadata("design:returntype", Promise)
    ], UploadController.prototype, "checkDndDnsStatus", null);
    __decorate([
        routing_controllers_1.Post("/updatenumber"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, routing_controllers_1.Body()), __param(1, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_c = typeof DndDns_1.UpdateNumber !== "undefined" && DndDns_1.UpdateNumber) === "function" && _c || Object, typeof (_d = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _d || Object]),
        __metadata("design:returntype", Promise)
    ], UploadController.prototype, "updateNumber", null);
    __decorate([
        routing_controllers_1.Post("/dnddns/history"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_e = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _e || Object]),
        __metadata("design:returntype", Promise)
    ], UploadController.prototype, "dnddnsHistory", null);
    __decorate([
        routing_controllers_1.Post("/dnddns/all"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_f = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _f || Object]),
        __metadata("design:returntype", Promise)
    ], UploadController.prototype, "getAllDnsFIles", null);
    __decorate([
        routing_controllers_1.Post("/file/process"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_g = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _g || Object, typeof (_h = typeof DndDns_1.DnsProcess !== "undefined" && DndDns_1.DnsProcess) === "function" && _h || Object]),
        __metadata("design:returntype", Promise)
    ], UploadController.prototype, "readDndDnsData", null);
    UploadController = __decorate([
        routing_controllers_1.JsonController("/ops"),
        __metadata("design:paramtypes", [DndDnsRepository_1.DnddnsRepository])
    ], UploadController);
    return UploadController;
}());
exports.UploadController = UploadController;
