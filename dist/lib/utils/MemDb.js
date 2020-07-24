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
var loadash = require("lodash");
var Loki = require("lokijs");
var LogUtils_1 = require("../utils/LogUtils");
var lokiInst = new Loki("mydb", { autosave: false });
var MemDb = /** @class */ (function () {
    function MemDb() {
        this.esmeQueues = lokiInst.addCollection("esme_queues", { disableMeta: true });
        this.esmeQueuesnew = lokiInst.addCollection("esme_queues_new", { disableMeta: true });
        this.smscQueues = lokiInst.addCollection("smsc_queues", { disableMeta: true });
        this.manageQueues = lokiInst.addCollection("manage_queues", { disableMeta: true });
        this.usersTable = lokiInst.addCollection("users_table", { disableMeta: true });
        this.smscTable = lokiInst.addCollection("smsc_table", { disableMeta: true });
        this.usersenderTable = lokiInst.addCollection("usersender_table", { disableMeta: true });
        this.userSendersList = lokiInst.addCollection("usersender_list", { disableMeta: true });
        // this.groupsList = lokiInst.addCollection<GroupsList>("groups_list", { disableMeta: true });
        this.cGroupList = lokiInst.addCollection("groups_list", { disableMeta: true });
    }
    MemDb.prototype.addEsmeQueue = function (queue) {
        this.esmeQueues.add(queue);
    };
    MemDb.prototype.addEsmeQueueNew = function (queue) {
        console.log("addEsmeQueueNew =>", this.esmeQueuesnew.data);
        this.esmeQueuesnew.add(queue);
        return 1;
    };
    MemDb.prototype.clearAllEsmesQueues = function () {
        this.esmeQueues.clear();
    };
    MemDb.prototype.getAllEsmeDetails = function () {
        return this.esmeQueues.chain().simplesort("size", true).data();
    };
    MemDb.prototype.addSmscQueue = function (queue) {
        this.smscQueues.add(queue);
    };
    MemDb.prototype.clearAllSmscsQueues = function () {
        this.smscQueues.clear();
    };
    MemDb.prototype.getAllSmscDetails = function () {
        return this.smscQueues.chain().simplesort("size", true).data();
    };
    MemDb.prototype.addManageQueue = function (queue) {
        this.manageQueues.add(queue);
    };
    MemDb.prototype.clearAllManageQueues = function () {
        this.manageQueues.clear();
    };
    MemDb.prototype.getAllManageQueueDetails = function () {
        return this.manageQueues.chain().simplesort("size", true).data();
    };
    // getAllSortedEsmeQueues(): MyQueue[] {
    //     return this.esmeQueues.chain().simplesort("size", true).data();
    // }
    MemDb.prototype.addUser = function (user) {
        this.usersTable.add(user);
        // console.log("addUser ==>", user);
    };
    MemDb.prototype.clearAllUsersData = function () {
        this.usersTable.clear();
    };
    MemDb.prototype.getUserNameByUserId = function (userId) {
        //  logger.info("getUserNameByUserId length ==>:[%s]", this.usersTable.chain().simplesort("userId").data());
        var id = Number(userId);
        var find = { "userId": id };
        // console.log("Find =>",find);
        var user = this.usersTable.chain().find(find).data();
        //  logger.info("====>",this.usersTable.chain().simplesort("userId").data());
        //     logger.info("getUserNameByUserId==>", user)
        if (user.length < 1) {
            return "0";
        }
        else {
            return user[0].name;
        }
    };
    MemDb.prototype.getAllUsers = function () {
        return this.usersTable.chain().simplesort("userId", true).data();
    };
    MemDb.prototype.getAllLoadedUserIds = function () {
        // this.usersTable.chain().simplesort("userId",true).data()
    };
    MemDb.prototype.addSmsc = function (smsc) {
        this.smscTable.add(smsc);
        // console.log("addSMSC ==>", smsc);
    };
    MemDb.prototype.clearAllSmscsData = function () {
        this.smscTable.clear();
    };
    MemDb.prototype.getAllSMSCs = function () {
        var vals = this.smscTable.chain().simplesort("smscId", true).data();
        ;
        return loadash.map(vals, function (o) { return loadash.omit(o, '$loki'); });
        // return this.smscTable.chain().simplesort("smscId", true).data();
    };
    MemDb.prototype.getAllSMSCThrottle = function () {
        var vals = this.smscTable.chain().simplesort("smscId", true).data();
        return loadash.map(vals, function (o) { return loadash.omit(o, '$loki'); });
    };
    MemDb.prototype.getSystemIdBySmscId = function (smscId) {
        var id = Number(smscId);
        var find = { "smscId": id };
        var smsc = this.smscTable.chain().find(find).data();
        //  logger.info("===========================================>",smscId, smsc, smsc.length);
        if (smsc.length < 1) {
            return "Not Found";
        }
        else {
            return smsc[0].name;
        }
    };
    MemDb.prototype.getAllEsmeDetailsNew = function () {
        var queue = this.esmeQueues.chain().simplesort("queueName", true).data();
        return loadash.chain(queue).groupBy("userId")
            .map(function (currentItem) {
            //  console.log("currentItem :", currentItem.length);
            if (currentItem.length === 2) {
                var myQueue = currentItem[0];
                currentItem[1].drConsumerCount = myQueue.consumerCount;
                currentItem[1].drCount = myQueue.size;
                return currentItem[1];
            }
            else {
                return currentItem[0];
            }
        }).value();
    };
    MemDb.prototype.mergeQueues = function (arr) {
        return __awaiter(this, void 0, void 0, function () {
            var sortarray;
            return __generator(this, function (_a) {
                sortarray = Object.keys(arr).map(function (key) {
                    return [Number(key), arr[key]];
                });
                console.log(sortarray);
                return [2 /*return*/, loadash.chain(sortarray).groupBy("userId").mapValues(function (v) {
                        return loadash.chain(v).map("size").flattenDeep();
                    }).value()];
            });
        });
    };
    MemDb.prototype.addUserSender = function (usersender) {
        this.usersenderTable.add(usersender);
    };
    MemDb.prototype.clearUserSender = function () {
        this.usersenderTable.clear();
    };
    // getAllUsersFromUserSenderData(sKey: any) {
    //     logger.info("getUserReg ==>");
    //      const re = new RegExp(sKey,"g")
    //     const getusersenderdata = this.usersenderTable.find({'userName': { '$regex' : re }}).map(function (key){
    //     return key.userName;
    //     });
    //     return new Set(getusersenderdata);
    //     // this.usersenderTable.chain().data("userName")
    // }
    //     getUserReg(sKey: any){
    //         logger.info("getUserReg ==>");
    //          const re = new RegExp(sKey,"g");
    //         const getuserbykey = this.usersenderTable.find({'userName': { '$regex' : re }}).map(function (key){
    //             return key.userName;
    //     });
    //     return new Set(getuserbykey);
    // }
    // getSender(exp: any){
    //     logger.info("getSender ==>", exp);
    //    // const re = new RegExp(exp,"g");
    //     const getsenderdata = this.usersenderTable.find({'userName':  { '$eq' : exp }  }).map(function (key){
    //         return key.senderId;
    // });
    // return new Set(getsenderdata);
    // }
    MemDb.prototype.saveUserSendersList = function (userSenderList) {
        this.userSendersList.add(userSenderList);
    };
    MemDb.prototype.getAlluserSenderList = function () {
        var vals = this.userSendersList.chain().simplesort("userName").data();
        return loadash.map(vals, function (o) { return loadash.omit(o, '$loki'); });
    };
    // getAlluserSenderList() {
    //     return this.userSendersList.chain().simplesort("userName").data();
    // }
    MemDb.prototype.clearAllSaveUserSendersList = function () {
        this.userSendersList.clear();
    };
    // saveGroupList(groupList: GroupsList) {
    //     this.groupsList.add(groupList);
    // }
    // getAllGroupList(){
    //     return this.groupsList.chain().simplesort("groupName").data();
    // }
    // clearAllGroupsList() {
    //     this.groupsList.clear();
    // }
    MemDb.prototype.addGroup = function (cgroups) {
        this.cGroupList.add(cgroups);
        // console.log("addUser ==>", user);
    };
    MemDb.prototype.clearAllGroupData = function () {
        this.cGroupList.clear();
    };
    MemDb.prototype.getGroupNames = function () {
        var names = this.cGroupList.chain().find().data();
        return loadash.map(names, function (o) { return loadash.omit(o, ['$loki', "systemId", "smscName", "smscId", "tps", "txSessions", "trxSessions", "rxSessions", "bindIp", "bindPort", "password", "enqueryTime", "bindTimeOut", "protocolVersion", "charSet", "systemType", "destTon", "destNpi", "srcTon", "srcNpi", "srcAddress", "dcs", "connectionType"]); });
    };
    MemDb.prototype.getAllGroupsLength = function () {
        return this.cGroupList.chain().find().data().length;
    };
    MemDb.prototype.getSmscIdbyGroupName = function (groupname) {
        var smsclist = this.cGroupList.chain().find({ 'groupName': groupname }).data();
        if (smsclist.length < 1) {
            return [];
        }
        else {
            return loadash.map(smsclist, function (o) { return loadash.omit(o, ['$loki', "groupName", "systemId", "tps", "txSessions", "trxSessions", "rxSessions", "bindIp", "bindPort", "password", "enqueryTime", "bindTimeOut", "protocolVersion", "charSet", "systemType", "destTon", "destNpi", "srcTon", "srcNpi", "srcAddress", "dcs", "connectionType"]); });
        }
    };
    MemDb.prototype.getSystemDetailsbySmscId = function (smscid) {
        var find = { "smscId": smscid };
        var smsclist = this.cGroupList.chain().find(find).data();
        if (smsclist.length < 1) {
            return [];
        }
        else {
            return loadash.map(smsclist, function (o) { return loadash.omit(o, ['$loki', "groupName", "smscId"]); });
        }
    };
    MemDb.prototype.getAllGroupDetails = function (groupaddremove) {
        LogUtils_1.logger.info("getAllGroupDetails:", groupaddremove);
        var find = { "smscId": groupaddremove.smscId };
        var smsclist = this.cGroupList.chain().find(find).data();
        LogUtils_1.logger.info("getAllGroupDetails:list", find, "------", smsclist);
        if (smsclist.length < 1) {
            return [];
        }
        else {
            return loadash.map(smsclist, function (o) { return loadash.omit(o, '$loki'); });
        }
    };
    MemDb = __decorate([
        typedi_1.Service("memDb"),
        __metadata("design:paramtypes", [])
    ], MemDb);
    return MemDb;
}());
exports.MemDb = MemDb;
