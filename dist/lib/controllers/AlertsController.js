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
var AlertsRepository_1 = require("../repositorys/AlertsRepository");
var LogUtils_1 = require("../utils/LogUtils");
var TokenChecker_1 = require("../utils/TokenChecker");
var AlertsController = /** @class */ (function () {
    function AlertsController(alertsrepository) {
        this.alertsrepository = alertsrepository;
    }
    AlertsController.prototype.getSmscData = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getSmscData =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, this.alertsrepository.smscAlertsInformation()];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    AlertsController.prototype.getEsmeData = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("getEsmeData =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, this.alertsrepository.esmeAlertsInformation()];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    AlertsController.prototype.updateSmsc = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("updateSmsc =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, { Status: "Success", Message: "Processed" }];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    AlertsController.prototype.updateEsme = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("updateEsme =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, { Status: "Success", Message: "Processed" }];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    AlertsController.prototype.esmeHistory = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("esmeHistory =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, this.alertsrepository.altersHistory("SERVER")];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    AlertsController.prototype.smscHistory = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("smscHistory =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, this.alertsrepository.altersHistory("CLIENT")];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    AlertsController.prototype.throttleCount = function (user, source) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LogUtils_1.logger.info("throttleCount =>");
                switch (user.error) {
                    case 0:
                        return [2 /*return*/, this.alertsrepository.getThrottleCount(source)];
                    case 401:
                        throw new TokenChecker_1.CustomeError(401, "User not found");
                    case 599:
                        throw new TokenChecker_1.CustomeError(599, "Session Timed out");
                }
                return [2 /*return*/];
            });
        });
    };
    AlertsController.prototype.getSmscId = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.alertsrepository.getSMSCId()];
            });
        });
    };
    AlertsController.prototype.throttleHistoryt = function (user, shortcode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        routing_controllers_1.Post("/smsc/all"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _a || Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "getSmscData", null);
    __decorate([
        routing_controllers_1.Post("/esme/all"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _b || Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "getEsmeData", null);
    __decorate([
        routing_controllers_1.Post("/smsc/bind"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_c = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _c || Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "updateSmsc", null);
    __decorate([
        routing_controllers_1.Post("/esme/bind"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_d = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _d || Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "updateEsme", null);
    __decorate([
        routing_controllers_1.Post("/esme/history"),
        routing_controllers_1.ContentType("application/json")
        // @OnUndefined(UserNotFoundError)
        ,
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_e = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _e || Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "esmeHistory", null);
    __decorate([
        routing_controllers_1.Post("/smsc/history"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_f = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _f || Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "smscHistory", null);
    __decorate([
        routing_controllers_1.Post("/esme/throttle/count"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_g = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _g || Object, Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "throttleCount", null);
    __decorate([
        routing_controllers_1.Post("/esme/throttle/smscid"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_h = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _h || Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "getSmscId", null);
    __decorate([
        routing_controllers_1.Post("/esme/throttle/history"),
        routing_controllers_1.ContentType("application/json"),
        __param(0, TokenChecker_1.TokenChecker({ required: true })), __param(1, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_j = typeof TokenChecker_1.LogInUser !== "undefined" && TokenChecker_1.LogInUser) === "function" && _j || Object, Object]),
        __metadata("design:returntype", Promise)
    ], AlertsController.prototype, "throttleHistoryt", null);
    AlertsController = __decorate([
        routing_controllers_1.JsonController(),
        typedi_1.Service(),
        __metadata("design:paramtypes", [AlertsRepository_1.AlertsRepository])
    ], AlertsController);
    return AlertsController;
}());
exports.AlertsController = AlertsController;
