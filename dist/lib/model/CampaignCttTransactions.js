"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('campaignCttTransactions', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'Id',
            primaryKey: true,
            autoIncrement: true
        },
        campaignId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'CampaignID'
        },
        submittedTime: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'SubmittedTime'
        },
        messagesCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'MessagesCount'
        },
        processedCount: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'ProcessedCount'
        },
        status: {
            type: "NCHAR",
            allowNull: true,
            field: 'Status'
        }
    }, {
        tableName: 'CampaignCttTransactions'
    });
};
