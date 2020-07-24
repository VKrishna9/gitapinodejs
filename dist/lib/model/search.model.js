"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModel = void 0;
var mongoose_1 = require("mongoose");
var search_schema_1 = require("./search.schema");
exports.SearchModel = mongoose_1.model("search", search_schema_1.default);
