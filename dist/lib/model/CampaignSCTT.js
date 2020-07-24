"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('campaignSctt', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'Id',
            primaryKey: true,
            autoIncrement: true
        },
        smscId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'SMSCId'
        },
        incomingUserid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'IncomingUserid'
        },
        incomingUserName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'IncomingUserName'
        },
        outboundSender: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'OutboundSender'
        },
        mobileNo: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'MobileNo'
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Message'
        },
        credits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'Credits'
        },
        dataCoding: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'DataCoding'
        },
        countryCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'CountryCode'
        },
        operatorId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'OperatorId'
        },
        sentdate: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Sentdate'
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'Priority'
        },
        charSet: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'CharSet'
        },
        charCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'CharCount'
        },
        dlrRequired: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'DlrRequired'
        },
        moduleName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'ModuleName'
        },
        clientPrId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ClientPrId'
        },
        esmClass: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'EsmClass'
        },
        udh: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Udh'
        },
        tlv: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Tlv'
        },
        validity: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Validity'
        },
        prStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'PrStatus'
        },
        campaignId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'CampaignId'
        },
        camapaingType: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'CamapaingType'
        }
    }, {
        tableName: 'CampaignSCTT'
    });
};
