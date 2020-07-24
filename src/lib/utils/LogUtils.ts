import { configure, getLogger } from "log4js";
import * as log4js from "log4js";
import * as ProcessEnv from "../config/config";
export const path = require("path");


const index = (__dirname.length) - 10;

export  const logConfigPath  =  __dirname.substring(0, index)  +  path.sep  +  "config"  +  path.sep  +  "log4js.json";
console.log("logConfigPath :" + logConfigPath);

configure(logConfigPath);

export const logger = getLogger();

export const httpLogger = getLogger("http");

export const cors = require("cors");