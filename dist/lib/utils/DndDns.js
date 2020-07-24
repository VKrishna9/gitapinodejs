"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchParams = /** @class */ (function () {
    function SearchParams(sch) {
        this.sch = sch;
    }
    SearchParams.prototype.getSch = function () {
        return (this.sch);
    };
    SearchParams.prototype.isValid = function () {
        return this.sch ? false : this.sch.length < 0 ? false : true;
    };
    return SearchParams;
}());
exports.SearchParams = SearchParams;
