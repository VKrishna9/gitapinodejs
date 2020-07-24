import "reflect-metadata";
import { createExpressServer, useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import * as bodyParser from "body-parser";
import * as ProcessEnv from "./lib/config/config";
const path = require("path");
import *  as log4js from "log4js";
import { logger, httpLogger, cors } from "./lib/utils/LogUtils";
import { GitSearchController } from "./lib/controllers/GitSearchController";

var cron = require('node-cron');


useContainer(Container);

const expressApp = createExpressServer({
    /**
     * We can add options about how routing-controllers should configure itself.
     * Here we specify what controllers should be registered in our express server.
     */
    cors: true,
    routePrefix: ProcessEnv.ProcessEnvService._basecontext,
    // controllers: [__dirname + "./lib/controllers/*.js"]
    controllers: [GitSearchController]

});

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Start the express app.
 */

expressApp.use(log4js.connectLogger(httpLogger, { level: "auto" }));

expressApp.listen(ProcessEnv.ProcessEnvService._port, "0.0.0.0");

logger.info(`Server is up and running at port ${ProcessEnv.ProcessEnvService._port}`);



