"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('alertsHistory', {
        source: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Source'
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'userId'
        },
        systemId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'SystemId'
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'port'
        },
        host: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'host'
        },
        bindtype: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'bindtype'
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Time'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Status'
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'sessionId'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Name'
        },
        insertedTime: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'insertedTime'
        }
    }, {
        tableName: 'AlertsHistory'
    });
};
