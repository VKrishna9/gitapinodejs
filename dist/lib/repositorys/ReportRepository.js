"use strict";
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
exports.ReportRepository = void 0;
var dateTime = require("node-datetime");
var mongoDBUtils_1 = require("../repositorys/mongoDBUtils");
var request = require('request');
var search_model_1 = require("../model/search.model");
var LogUtils_1 = require("../utils/LogUtils");
var ReportRepository = /** @class */ (function () {
    function ReportRepository() {
    }
    ReportRepository.prototype.getSearchReports = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cursor, data, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoDBUtils_1.connect();
                        cursor = search_model_1.SearchModel.find().select('sch link userId dateOfEntry -_id').cursor();
                        data = "[";
                        return [4 /*yield*/, cursor.next()];
                    case 1:
                        doc = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(doc != null)) return [3 /*break*/, 5];
                        //  logger.info(JSON.stringify(doc)); // Prints documents one at a time
                        data += ' { "sch": "' + (doc.sch) + '"  ,  "link": "' + doc.link + '" ,  "userId": "' + doc.userId + '" ,  "dateOfEntry": "' + doc.dateOfEntry.toLocaleString('en-US') + '" } ,';
                        _a.label = 3;
                    case 3: return [4 /*yield*/, cursor.next()];
                    case 4:
                        doc = _a.sent();
                        return [3 /*break*/, 2];
                    case 5:
                        data = data.slice(0, -1);
                        data += " ]";
                        LogUtils_1.logger.info(data);
                        return [4 /*yield*/, JSON.parse(data)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReportRepository.prototype.saveRecord = function (sch, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var searches, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                mongoDBUtils_1.connect();
                                searches = [
                                    { keyword: sch.getSch(), userId: sch.getUserId(), link: sch.getLink(), hits: 1, status: response.status, keyword2: sch.getSch2() }
                                ];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, search_model_1.SearchModel.create(sch)];
                            case 2:
                                _a.sent();
                                LogUtils_1.logger.info("Created search " + sch.getSch() + " ");
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                console.error(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
                return [2 /*return*/];
            });
        });
    };
    return ReportRepository;
}());
exports.ReportRepository = ReportRepository;
