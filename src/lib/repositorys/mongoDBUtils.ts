import * as Mongoose from "mongoose";
import { logger } from "../utils/LogUtils";
import * as ProcessEnv from "../config/config";

let database: Mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const uri = ProcessEnv.ProcessEnvMongoDB._url;
  if (database) {
    return;
  }
  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;
  database.once("open", async () => {
    logger.info("Connected to database");
  });
  database.on("error", () => {
    logger.info("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};