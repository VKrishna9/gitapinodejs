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
var GroupsRepository_1 = require("../repositorys/GroupsRepository");
var LogUtils_1 = require("../utils/LogUtils");
var TokenChecker_1 = require("../utils/TokenChecker");
var MemDb_1 = require("../utils/MemDb");
var GroupController = /** @class */ (function () {
    function GroupController() {
    }
    GroupController.prototype.getAllGroupaData = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupresp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        LogUtils_1.logger.info("getAllGroupaData:");
                        _a = user.error;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 3];
                            case 599: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        groupresp = new GroupsRepository_1.GroupsRespository();
                        return [4 /*yield*/, groupresp.processGroupsList()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 4: throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GroupController.prototype.addSmsc = function (user, groupaddremove) {
        return __awaiter(this, void 0, void 0, function () {
            var groupresp;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("addSmsc: ==========>", groupaddremove);
                switch (user.error) {
                    case 0:
                        groupaddremove.type = "add";
                        groupresp = new GroupsRepository_1.GroupsRespository();
                        return [2 /*return*/, groupresp.addremoveGroup(groupaddremove, user.userName)];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    GroupController.prototype.removeSmsc = function (user, groupaddremove) {
        return __awaiter(this, void 0, void 0, function () {
            var groupresp;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("removeSmsc: ==========>", groupaddremove);
                switch (user.error) {
                    case 0:
                        groupaddremove.type = "remove";
                        groupresp = new GroupsRepository_1.GroupsRespository();
                        return [2 /*return*/, groupresp.addremoveGroup(groupaddremove, user.userName)];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    GroupController.prototype.getGroupsHistory = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var groupresp;
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("processSmsc:");
                switch (user.error) {
                    case 0:
                        groupresp = new GroupsRepository_1.GroupsRespository();
                        return [2 /*return*/, groupresp.groupsHistory(user.userName)];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    var _a, _b, _c, _d, _e, _f;
    __decorate([
        routing_controllers_1.Post("/all"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _a || Object]),
        __metadata("design:returntype", Promise)
    ], GroupController.prototype, "getAllGroupaData", null);
    __decorate([
        routing_controllers_1.Post("/smsc/add"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _b || Object, typeof (_c = typeof MemDb_1.Groupaddremove !== "undefined" && MemDb_1.Groupaddremove) === "function" && _c || Object]),
        __metadata("design:returntype", Promise)
    ], GroupController.prototype, "addSmsc", null);
    __decorate([
        routing_controllers_1.Post("/smsc/remove"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_d = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _d || Object, typeof (_e = typeof MemDb_1.Groupaddremove !== "undefined" && MemDb_1.Groupaddremove) === "function" && _e || Object]),
        __metadata("design:returntype", Promise)
    ], GroupController.prototype, "removeSmsc", null);
    __decorate([
        routing_controllers_1.Post("/history"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_f = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _f || Object]),
        __metadata("design:returntype", Promise)
    ], GroupController.prototype, "getGroupsHistory", null);
    GroupController = __decorate([
        routing_controllers_1.JsonController("/groups"),
        typedi_1.Service()
    ], GroupController);
    return GroupController;
}());
exports.GroupController = GroupController;
