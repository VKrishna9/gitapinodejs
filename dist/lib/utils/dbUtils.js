"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var ProcessEnv = require("../config/config");
exports.connect = new sequelize_typescript_1.Sequelize({
    host: ProcessEnv.ProcessEnvDatabase._host,
    port: ProcessEnv.ProcessEnvDatabase._db_port,
    dialect: ProcessEnv.ProcessEnvDatabase._dialect,
    database: ProcessEnv.ProcessEnvDatabase._gatewaydatabase,
    username: ProcessEnv.ProcessEnvDatabase._username,
    password: ProcessEnv.ProcessEnvDatabase._password,
    dialectOptions: {
        connectionTimeout: 9999,
        requestTimeout: 0
    },
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 40000,
        evict: 20000
    },
    modelPaths: [__dirname + "../models/db"]
});
exports.synapseDBconnect = new sequelize_typescript_1.Sequelize({
    host: ProcessEnv.ProcessEnvDatabase._host,
    port: ProcessEnv.ProcessEnvDatabase._db_port,
    dialect: ProcessEnv.ProcessEnvDatabase._dialect,
    database: ProcessEnv.ProcessEnvDatabase._synapsedatabase,
    username: ProcessEnv.ProcessEnvDatabase._username,
    password: ProcessEnv.ProcessEnvDatabase._password,
    dialectOptions: {
        connectionTimeout: 9999,
        requestTimeout: 0
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 20000
    },
});
