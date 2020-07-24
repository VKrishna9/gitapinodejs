"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var bodyParser = require("body-parser");
var ProcessEnv = require("./lib/config/config");
var path = require("path");
var log4js = require("log4js");
var LogUtils_1 = require("./lib/utils/LogUtils");
var GitSearchController_1 = require("./lib/controllers/GitSearchController");
var cron = require('node-cron');
routing_controllers_1.useContainer(typedi_1.Container);
var expressApp = routing_controllers_1.createExpressServer({
    /**
     * We can add options about how routing-controllers should configure itself.
     * Here we specify what controllers should be registered in our express server.
     */
    cors: true,
    routePrefix: ProcessEnv.ProcessEnvService._basecontext,
    // controllers: [__dirname + "./lib/controllers/*.js"]
    controllers: [GitSearchController_1.GitSearchController]
});
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({
    extended: true
}));
/**
 * Start the express app.
 */
expressApp.use(log4js.connectLogger(LogUtils_1.httpLogger, { level: "auto" }));
expressApp.listen(ProcessEnv.ProcessEnvService._port, "0.0.0.0");
LogUtils_1.logger.info("Server is up and running at port " + ProcessEnv.ProcessEnvService._port);
