"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('blockeduser', {
        // id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   primaryKey: true,
        //   autoIncrement: true,
        //   field: 'Id'
        // },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'username'
        },
        senderid: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'senderid'
        },
        luser: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'luser'
        },
        expiredTime: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'expiredTime'
        },
        datetime: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'datetime'
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'action'
        },
        campaignId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'campaignId'
        }
    }, {
        tableName: 'blockeduser'
    });
};
