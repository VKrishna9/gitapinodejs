"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('campaignCtoStatus', {
        campaignId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'campaignId'
        },
        campaignType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'campaignType'
        },
        messagesCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'messagesCount'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'status'
        },
        insertTime: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'insertTime'
        },
        processedCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'processedCount'
        },
        resumedTime: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'resumedTime'
        }
    }, {
        tableName: 'campaign_cto_status'
    });
};
