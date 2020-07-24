"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SearchSchema = new mongoose_1.Schema({
    sch: String,
    sch2: String,
    userId: String,
    hits: Number,
    link: String,
    status: Number,
    dateOfEntry: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});
exports.default = SearchSchema;
