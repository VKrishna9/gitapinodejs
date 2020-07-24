"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchParams = void 0;
var SearchParams = /** @class */ (function () {
    function SearchParams(sch, link, userId, sch2) {
        this.sch = sch;
        this.link = link;
        this.userId = userId;
        this.sch2 = sch2;
    }
    SearchParams.prototype.getSch = function () {
        return (this.sch);
    };
    SearchParams.prototype.getSch2 = function () {
        return (this.sch2);
    };
    SearchParams.prototype.getLink = function () {
        return (this.link);
    };
    SearchParams.prototype.getUserId = function () {
        return (this.userId);
    };
    SearchParams.prototype.isValid = function () {
        return this.sch ? false : this.sch.length < 0 ? false : true;
    };
    return SearchParams;
}());
exports.SearchParams = SearchParams;
