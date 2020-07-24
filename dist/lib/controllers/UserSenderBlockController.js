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
var typedi_1 = require("typedi");
var routing_controllers_1 = require("routing-controllers");
var LiveMonitRepository_1 = require("../repositorys/LiveMonitRepository");
var BlockMessage_1 = require("../utils/BlockMessage");
var LogUtils_1 = require("../utils/LogUtils");
var TokenChecker_1 = require("../utils/TokenChecker");
var MemDb_1 = require("../utils/MemDb");
var UserSenderBlockUnblockController = /** @class */ (function () {
    function UserSenderBlockUnblockController(liveMonitRepository) {
        this.liveMonitRepository = liveMonitRepository;
    }
    UserSenderBlockUnblockController.prototype.blockMessageByMessage = function (user, blockMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("blockMessageByMessage: =>", blockMessage);
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 5];
                            case 599: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        if (!blockMessage.isValid()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.liveMonitRepository.blockUser(blockMessage, user.userName)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, new BlockMessage_1.BlockErrorMessage(false, "Invalid Data")];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 6: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserSenderBlockUnblockController.prototype.getAllBlockedMessage = function (user, blockData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("getAllBlockedMessage: =>", blockData);
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 5];
                            case 599: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        if (!blockData.isValid()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.liveMonitRepository.getAllBlockedMessage()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, new BlockMessage_1.BlockErrorMessage(false, "Invalid Data")];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 6: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserSenderBlockUnblockController.prototype.deleteBlockedMessageByKey = function (user, unblockMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("deleteBlockedMessageByKey: =>", unblockMessage);
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 5];
                            case 599: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        if (!unblockMessage.isValid()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.liveMonitRepository.unblockUser(unblockMessage, user.userName)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, new BlockMessage_1.BlockErrorMessage(false, "Invalid Data")];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 6: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserSenderBlockUnblockController.prototype.liveUserendertraffic = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("liveUserendertraffic: =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, this.liveMonitRepository.liveUserData()];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    UserSenderBlockUnblockController.prototype.getBlockUblockHistory = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getBlockUblockHistory: =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, this.liveMonitRepository.getUserSenderHistory()];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    UserSenderBlockUnblockController.prototype.getAllUsersFromUserSenderData = function (user, queryusersenderdata) {
        return __awaiter(this, void 0, void 0, function () {
            var memdb, searchResult;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("searchAllUsers: ===>");
                memdb = new MemDb_1.MemDb();
                searchResult = memdb.getAlluserSenderList();
                LogUtils_1.logger.info("searchAllUsers: == >", searchResult);
                return [2 /*return*/, searchResult];
            });
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    __decorate([
        routing_controllers_1.Post("/block"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _a || Object, typeof (_b = typeof BlockMessage_1.BlockMessage !== "undefined" && BlockMessage_1.BlockMessage) === "function" && _b || Object]),
        __metadata("design:returntype", Promise)
    ], UserSenderBlockUnblockController.prototype, "blockMessageByMessage", null);
    __decorate([
        routing_controllers_1.Post("/unblock/all"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_c = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _c || Object, typeof (_d = typeof BlockMessage_1.BlockedData !== "undefined" && BlockMessage_1.BlockedData) === "function" && _d || Object]),
        __metadata("design:returntype", Promise)
    ], UserSenderBlockUnblockController.prototype, "getAllBlockedMessage", null);
    __decorate([
        routing_controllers_1.Post("/unblock"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_e = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _e || Object, typeof (_f = typeof BlockMessage_1.UnBlockMessage !== "undefined" && BlockMessage_1.UnBlockMessage) === "function" && _f || Object]),
        __metadata("design:returntype", Promise)
    ], UserSenderBlockUnblockController.prototype, "deleteBlockedMessageByKey", null);
    __decorate([
        routing_controllers_1.Post("/block/all"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_g = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _g || Object]),
        __metadata("design:returntype", Promise)
    ], UserSenderBlockUnblockController.prototype, "liveUserendertraffic", null);
    __decorate([
        routing_controllers_1.Post("/all/history"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_h = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _h || Object]),
        __metadata("design:returntype", Promise)
    ], UserSenderBlockUnblockController.prototype, "getBlockUblockHistory", null);
    __decorate([
        routing_controllers_1.Post("/users/search"),
        routing_controllers_1.ContentType("application/json")
        // async searchByKey(@TokenChecker({ required: true }) user: LogInUser,  @Body() queryusersenderdata: QueryUserSenderData) {
        //     logger.info("searchByKey: ===>");
        //     const memdb = new MemDb();
        //     const searchResult = memdb.getAllUsersFromUserSenderData(queryusersenderdata.getsearchKey());
        //     logger.info("searchByKey: == >",searchResult);
        //     return searchResult;
        // }
        // @HttpPost("/senders/search")
        // @ContentType("application/json")
        // async searchSenderId(@TokenChecker({ required: true }) user: LogInUser, @Body() queryusersenderdata: QueryUserSenderData) {
        //     logger.info("searchSenderId: ===>");
        //     const memdb = new MemDb();
        //     const searchResult = memdb.getSender(queryusersenderdata.getUsername());
        //     logger.info("searchSenderId: == >",searchResult);
        //     return searchResult;
        // }
        ,
        routing_controllers_1.Post("/all/users"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_j = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _j || Object, typeof (_k = typeof BlockMessage_1.QueryUserSenderData !== "undefined" && BlockMessage_1.QueryUserSenderData) === "function" && _k || Object]),
        __metadata("design:returntype", Promise)
    ], UserSenderBlockUnblockController.prototype, "getAllUsersFromUserSenderData", null);
    UserSenderBlockUnblockController = __decorate([
        routing_controllers_1.JsonController("/usersender"),
        typedi_1.Service(),
        __metadata("design:paramtypes", [LiveMonitRepository_1.LiveMonitRepository])
    ], UserSenderBlockUnblockController);
    return UserSenderBlockUnblockController;
}());
exports.UserSenderBlockUnblockController = UserSenderBlockUnblockController;
