"use strict";
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
var mailer = require('nodemailer');
var datetime = require("node-datetime");
var config_1 = require("../config/config");
var LogUtils_1 = require("../utils/LogUtils");
var dbUtils_1 = require("../utils/dbUtils");
var sequelizer = require("sequelize");
var emailhtml = config_1.ProcessEnvEmails._salutation + ' </br></br><style type="text/css">.tg  {border-collapse:collapse;border-spacing:0;border-color:#aaa;}.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#aaa;color:#333;background-color:#fff;}.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#aaa;color:#fff;background-color:#f38630;}.tg .tg-j2zy{background-color:#FCFBE3;vertical-align:top}.tg .tg-yw4l{vertical-align:top}</style><table class="tg"><tr>    <th class="tg-yw4l">Action</th>    <th class="tg-yw4l">Details</th>  </tr>    <tr>    <td class="tg-yw4l"><hparam2></td>    <td class="tg-yw4l"><bodyparam2></td>  </tr>  <tr>    <td class="tg-j2zy"><hparam3></td>    <td class="tg-j2zy"><bodyparam3></td>  </tr>  <tr>    <td class="tg-yw4l"><hparam4></td>    <td class="tg-yw4l"><bodyparam4></td>  </tr>  <tr>    <td class="tg-j2zy"><hparam5></td>    <td class="tg-j2zy"><bodyparam5></td>  </tr>  <tr>    <td class="tg-yw4l"><hparam6></td>    <td class="tg-yw4l"><bodyparam6></td>  </tr></table></br></br>' + config_1.ProcessEnvEmails._signature;
var EmailAlerts = /** @class */ (function () {
    function EmailAlerts() {
    }
    EmailAlerts.prototype.emailAlerts = function (emailparams) {
        return __awaiter(this, void 0, void 0, function () {
            var body, to, type, subject, processedcount, dt, d;
            return __generator(this, function (_a) {
                body = emailhtml;
                to = "";
                type = "";
                subject = "";
                dt = datetime.create();
                d = dt.format("Y-m-d H:M:S");
                // const blockbody = "Campaign blocked, UserName: <param1> and Senderid: <param2>, with expire time as: <param3>";
                // const unblockbody = "Campaign unblocked, UserName: <param1> and Senderid <param2>, actual expire time: <param3>";
                // const resumeblockcampaign = "Campaign Resumed, campaignId: <param1> with count: <param2> and type: <param3>";
                // const resumectocampaign = "Campaign Resumed, campaignId: <param1> with count: <param2> and type <param3>";
                // const restartapp = "Application restarted at:  " + d;
                // const dnddnsfile = "DND/DND file uploaded for action: <param3>, type: <param2> and count: <param1>";
                // const dnddnsnumber = "DND/DNS number request processed for action: <param3>, type: <param2> and count: <param1>"
                switch (Number(emailparams.type)) {
                    case 1:
                        body = body.replace('<hparam2>', "Blocked User Id");
                        body = body.replace('<hparam3>', "Blocked SenderId");
                        body = body.replace('<hparam4>', "Expire Time");
                        body = body.replace('<hparam5>', "Blocked by");
                        body = body.replace('<hparam6>', "Blocked Time");
                        subject = config_1.ProcessEnvSEmailSubject._blockbody;
                        type = "Block Campaign";
                        break;
                    case 2:
                        body = body.replace('<hparam2>', "Unblock User Id");
                        body = body.replace('<hparam3>', "Unblock SenderId");
                        body = body.replace('<hparam4>', "Expire Time");
                        body = body.replace('<hparam5>', "Unblock by");
                        body = body.replace('<hparam6>', "Unblock Time");
                        subject = config_1.ProcessEnvSEmailSubject._unblockbody;
                        type = "Unblock Campaign";
                        break;
                    case 3:
                        body = body.replace('<hparam2>', "Type");
                        body = body.replace('<hparam3>', "Action");
                        body = body.replace('<hparam4>', "Count Uploaded");
                        body = body.replace('<hparam5>', "Uploaded by");
                        body = body.replace('<hparam6>', "Time");
                        subject = config_1.ProcessEnvSEmailSubject._dnddnsfile;
                        type = "Dnd/Dnd file upload";
                        break;
                    case 4:
                        body = body.replace('<hparam2>', "Type");
                        body = body.replace('<hparam3>', "Action");
                        body = body.replace('<hparam4>', "Msisdn Uploaded");
                        body = body.replace('<hparam5>', "Uploaded by");
                        body = body.replace('<hparam6>', "Time");
                        subject = config_1.ProcessEnvSEmailSubject._dnddnsnumber;
                        type = "Dnd/Dns single number request";
                        break;
                    case 5:
                        body = body.replace('<hparam2>', "CampaignId");
                        body = body.replace('<hparam3>', "Count");
                        body = body.replace('<hparam4>', "Processed count");
                        body = body.replace('<hparam5>', "Resumed by");
                        body = body.replace('<hparam6>', "Time");
                        subject = config_1.ProcessEnvSEmailSubject._resumectocampaign;
                        type = "Resume Cto campaign";
                        break;
                    case 6:
                        body = body.replace('<hparam2>', "CampaignId");
                        body = body.replace('<hparam3>', "Count");
                        body = body.replace('<hparam4>', "Processed count");
                        body = body.replace('<hparam5>', "Resumed by");
                        body = body.replace('<hparam6>', "Time");
                        subject = config_1.ProcessEnvSEmailSubject._resumeblockcampaign;
                        type = "Resume Block campaign";
                        break;
                    case 7:
                        body = config_1.ProcessEnvSEmailBody._restartapp;
                        subject = config_1.ProcessEnvSEmailSubject._restartapp;
                        type = "App restart";
                        break;
                    case 8:
                        body = body.replace('<hparam2>', "Group Name");
                        body = body.replace('<hparam3>', "Smsc Id");
                        body = body.replace('<hparam4>', "Action");
                        body = body.replace('<hparam5>', "User");
                        body = body.replace('<hparam6>', "Time");
                        subject = config_1.ProcessEnvSEmailSubject._cgroupadd;
                        type = "Resume Block campaign";
                        break;
                    case 9:
                        body = body.replace('<hparam2>', "Group Name");
                        body = body.replace('<hparam3>', "Smsc Id");
                        body = body.replace('<hparam4>', "Action");
                        body = body.replace('<hparam5>', "User");
                        body = body.replace('<hparam6>', "Time");
                        subject = config_1.ProcessEnvSEmailSubject._cgroupremove;
                        type = "Resume Block campaign";
                        break;
                }
                body = body.replace('<bodyparam2>', emailparams.param1);
                body = body.replace('<bodyparam3>', emailparams.param2);
                body = body.replace('<bodyparam4>', emailparams.param3);
                body = body.replace('<bodyparam5>', emailparams.username);
                body = body.replace('<bodyparam6>', emailparams.time);
                if (emailparams.type === 3) {
                    body = body.replace("</tr></table>", "</tr> <tr>    <td class=\"tg-yw4l\">File Name</td>    <td class=\"tg-yw4l\">" + emailparams.filename + "</td>  </tr> <tr>    <td class=\"tg-yw4l\">Count Updated</td>    <td class=\"tg-yw4l\">" + emailparams.id + "</td>  </tr></table>");
                    LogUtils_1.logger.info("body:", body);
                }
                dbUtils_1.connect.query("INSERT INTO SmtEmailAlerts (emailsubject, emailtype ,emailbody, status) VALUES (:emailsub, :emailtype, :emailbody, 0)", {
                    replacements: { emailsub: subject, emailtype: emailparams.type, emailbody: body },
                    type: dbUtils_1.connect.QueryTypes.INSERT,
                    raw: true
                })
                    .then(function (result) {
                    LogUtils_1.logger.info("Email Alert inserted to DB: success");
                })
                    .catch(function (err) {
                    LogUtils_1.logger.info("Email Alert inserted to DB: failed", err);
                });
                return [2 /*return*/];
            });
        });
    };
    EmailAlerts.prototype.processEmails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var to, cc, transporter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = "";
                        cc = "";
                        transporter = mailer.createTransport({
                            host: config_1.ProcessEnvSmtpConfig._host,
                            port: config_1.ProcessEnvSmtpConfig._port,
                            requireTLS: config_1.ProcessEnvSmtpConfig._requireTLS,
                            auth: {
                                user: config_1.ProcessEnvSmtpConfig._fromemailid,
                                pass: config_1.ProcessEnvSmtpConfig._password
                            }
                        });
                        return [4 /*yield*/, dbUtils_1.connect.query("Select * from SmtEmailAlerts where status = 0 order by id desc", {
                                type: dbUtils_1.connect.QueryTypes.SELECT,
                                raw: true
                            })
                                .then(function (rows) {
                                LogUtils_1.logger.info("EMAIL Mail records found in db mail records size:[%s] ", rows.length);
                                rows.forEach(function (row) {
                                    //  logger.info("------------------>email type", row.emailtype);
                                    if (row.emailtype == 3 || row.emailtype == 4) {
                                        to = config_1.ProcessEnvEmails._dnddns;
                                        cc = config_1.ProcessEnvEmails._tocc_dns;
                                        // logger.info("----------------------> DND",ProcessEnvEmails._dnddns);
                                    }
                                    else {
                                        //  logger.info("----------------------> Normal",ProcessEnvEmails._toemails);
                                        to = config_1.ProcessEnvEmails._toemails;
                                        cc = config_1.ProcessEnvEmails._tocc;
                                    }
                                    var mailOptions = {
                                        from: config_1.ProcessEnvSmtpConfig._fromemailid,
                                        to: to,
                                        cc: cc,
                                        subject: row.emailsubject,
                                        html: row.emailbody
                                    };
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            LogUtils_1.logger.error("EMAIL Send eamil failed RowId:[%s], Error:[%s]:", row.id, JSON.stringify(error));
                                        }
                                        else {
                                            LogUtils_1.logger.info("EMAIL Send eamil Success RowId:[%s], Result:[%s]:", row.id, JSON.stringify(info));
                                            var dt = datetime.create();
                                            var d = dt.format("Y-m-d H:M:S");
                                            dbUtils_1.connect.query("UPDATE SmtEmailAlerts  SET status = 1, senttime = CURRENT_TIMESTAMP  WHERE id = :id", {
                                                replacements: { id: row.id },
                                                type: dbUtils_1.connect.QueryTypes.INSERT,
                                                raw: true
                                            })
                                                .then(function (result) {
                                                LogUtils_1.logger.info("EMAIL Email status updated into rowId:[%s]", row.id);
                                            })
                                                .catch(function (err) {
                                                LogUtils_1.logger.error("EMAIL Email status updated failed Error:[%s]", err);
                                            });
                                            // logger.info('Message sent: ' + info.response);
                                        }
                                        ;
                                    });
                                });
                            })
                                .catch(function (error) {
                                LogUtils_1.logger.error("Emails to be sent: ", error);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return EmailAlerts;
}());
exports.EmailAlerts = EmailAlerts;
