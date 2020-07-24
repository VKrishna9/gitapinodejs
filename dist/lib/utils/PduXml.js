"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PduXML = /** @class */ (function () {
    function PduXML(row) {
        var record = row;
        var dateTime = require("node-datetime");
        var dt = dateTime.create();
        var resumedtime = dt.format("Y-m-d H:M:S:N");
        this.CHARCOUNT = record.charCount;
        this.COUNTRYCODE = record.countryCode;
        this.DATACODING = record.dataCoding;
        this.DELIVERY = "";
        this.ESMCLASS = record.esmClass;
        this.ID = record.incomingUserid;
        this.MESSAGE = record.message;
        this.MSGID = "";
        this.MOBILENO = record.mobileNo;
        this.OPERATORID = record.operatorId;
        this.PRSTATUS = record.prStatus;
        this.PRIORITY = record.priority;
        this.DATE = resumedtime;
        this.SCHEDULEDELIVERYTIME = "";
        this.SENDERID = record.outboundSender;
        this.SOURCE = "SMPP";
        this.USERID = record.incomingUserName;
        this.TLV = record.tlv;
        this.UDH = record.udh;
        this.VALIDITYPERIOD = "";
    }
    PduXML.prototype.getcharcount = function () {
        return this.CHARCOUNT;
    };
    PduXML.prototype.getcountrycode = function () {
        return this.COUNTRYCODE;
    };
    PduXML.prototype.getdatacoding = function () {
        return this.DATACODING;
    };
    PduXML.prototype.getdelivery = function () {
        return this.DELIVERY;
    };
    PduXML.prototype.getesmclass = function () {
        return this.ESMCLASS;
    };
    PduXML.prototype.getid = function () {
        return this.ID;
    };
    PduXML.prototype.getmessage = function () {
        return this.MESSAGE;
    };
    PduXML.prototype.getmobileno = function () {
        return this.MOBILENO;
    };
    PduXML.prototype.getoperatorid = function () {
        return this.OPERATORID;
    };
    PduXML.prototype.getstatus = function () {
        return this.OPERATORID;
    };
    PduXML.prototype.getpriority = function () {
        return this.PRIORITY;
    };
    PduXML.prototype.getdate = function () {
        return this.DATE;
    };
    PduXML.prototype.getscheduledtime = function () {
        return this.SCHEDULEDELIVERYTIME;
    };
    PduXML.prototype.getsenderid = function () {
        return this.SENDERID;
    };
    PduXML.prototype.getsource = function () {
        return this.SOURCE;
    };
    PduXML.prototype.getuserId = function () {
        return this.USERID;
    };
    PduXML.prototype.gettlv = function () {
        return this.TLV;
    };
    PduXML.prototype.getudh = function () {
        return this.UDH;
    };
    PduXML.prototype.getvalidityperiod = function () {
        return this.VALIDITYPERIOD;
    };
    return PduXML;
}());
exports.PduXML = PduXML;
