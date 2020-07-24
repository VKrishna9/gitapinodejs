"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
var path = require("path");
exports.getModels = function (seq) {
    var tables = {
        campaignCtoStatus: seq.import(path.join(__dirname, './campaign_cto_status')),
        esmeMaster: seq.import(path.join(__dirname, './EsmeMaster')),
        smscMaster: seq.import(path.join(__dirname, './SmscMaster')),
        alertsHistory: seq.import(path.join(__dirname, './AlertsHistory')),
        campaignSctt: seq.import(path.join(__dirname, './CampaignSCTT')),
        blockeduser: seq.import(path.join(__dirname, './blockeduser')),
        campaignCttTransactions: seq.import(path.join(__dirname, './CampaignCttTransactions')),
    };
    return tables;
};
