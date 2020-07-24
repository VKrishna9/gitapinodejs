"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CampaignResume = /** @class */ (function () {
    function CampaignResume(campaignId, loginUserId) {
        this.campaignId = campaignId;
        this.loginUserId = loginUserId;
    }
    CampaignResume.prototype.getCampaignId = function () {
        return (this.campaignId);
    };
    CampaignResume.prototype.isValid = function () {
        if (this.campaignId.length < 0) {
            return false;
        }
        return true;
    };
    return CampaignResume;
}());
exports.CampaignResume = CampaignResume;
var CampaignResumeErrorMessage = /** @class */ (function () {
    function CampaignResumeErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return CampaignResumeErrorMessage;
}());
exports.CampaignResumeErrorMessage = CampaignResumeErrorMessage;
var CampaignsData = /** @class */ (function () {
    function CampaignsData(campaignId, loginUserId, count) {
        this.campaignId = campaignId;
        this.loginUserId = loginUserId;
        this.count = count;
    }
    // isValid() {
    //     if (this.loginUserId < 0) {
    //         return false;
    //     }
    //     return true;
    // }
    CampaignsData.prototype.getCampaignId = function () {
        return (this.campaignId);
    };
    CampaignsData.prototype.getUserId = function () {
        return (this.loginUserId);
    };
    CampaignsData.prototype.getCount = function () {
        return (this.count);
    };
    return CampaignsData;
}());
exports.CampaignsData = CampaignsData;
var ResumeBlockedCampaigns = /** @class */ (function () {
    function ResumeBlockedCampaigns(incomingUser, outBoundSender, rowsCount, campaignId) {
        this.incomingUser = incomingUser;
        this.outBoundSender = outBoundSender;
        this.rowsCount = rowsCount;
        this.campaignId = campaignId;
    }
    ResumeBlockedCampaigns.prototype.getKey = function () {
        return (this.incomingUser + ":" + this.outBoundSender).toUpperCase();
    };
    ResumeBlockedCampaigns.prototype.isValid = function () {
        if (this.incomingUser.length < 0) {
            return false;
        }
        return true;
    };
    ResumeBlockedCampaigns.prototype.getIncomingUser = function () {
        return (this.incomingUser);
    };
    ResumeBlockedCampaigns.prototype.getOutBoundSender = function () {
        return (this.outBoundSender);
    };
    ResumeBlockedCampaigns.prototype.getCount = function () {
        return (this.rowsCount);
    };
    ResumeBlockedCampaigns.prototype.getCampaignId = function () {
        return (this.campaignId);
    };
    return ResumeBlockedCampaigns;
}());
exports.ResumeBlockedCampaigns = ResumeBlockedCampaigns;
var CampaignsDataErrorMessage = /** @class */ (function () {
    function CampaignsDataErrorMessage(Status, Message) {
        this.Status = Status;
        this.Message = Message;
    }
    return CampaignsDataErrorMessage;
}());
exports.CampaignsDataErrorMessage = CampaignsDataErrorMessage;
