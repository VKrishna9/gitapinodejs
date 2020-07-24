import { Service } from "typedi";
import { Login, LoginResponse } from "../utils/Login";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import * as CryptoJS from "crypto-js";
import * as shortid from "shortid";
import { createParamDecorator, HttpError } from "routing-controllers";
const dateTime = require("node-datetime");
// const jwt  = require ("express-jwt");

import * as JWT from "jsonwebtoken";
import { SearchModel } from "../model/search.model";
import { CustomeError } from "../utils/TokenChecker";

@Service()
export class LoginRepository {

    constructor(private Login: Login) {

    }

    async checkUserlogin<T>(login: Login) {
    //    return SearchModel.find()
    //         .then((user: any[]) => {
              
             logger.info(login.getUsername());
               // if(user.length >0){
                if(login.getUsername() == 'admin' || login.getUsername() == 'agent1' || login.getUsername() == 'agent2'){
                   // if (user[0].UserPassword === "") {
                    if (1 === 1) {
                        //  logger.info("Passwords ==>", passwordEncrypt, user[0].UserPassword);
                      const token =  JWT.sign({ id: login.getUsername(), username: login.getUsername, userrole: login.getRole() }, "ProcessEnvAuth.__secret", {
                          expiresIn: 86400 // expires in 24 hours
                        });
                        const dt = dateTime.create();
            const logindatetime = dt.format("m-d-Y H:M:S");
                      const resp: LoginResponse = new LoginResponse(login.getUsername(), login.getUsername(), token, logindatetime );
                     // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                      return resp;
                  } else {
                      logger.info("checkUserlogin: failed.");
                      throw new CustomeError(401, "User not found");
                     
                      }
                }else{
                    logger.info("checkUserlogin: failed. ");
                    throw new CustomeError(401, "User not found");
                   
                }
                
            // }).catch((err: any) => {
            //     logger.error("checkUserlogin: failed:==>", err);
            //     return (false);
            // });
            logger.info("Login request End.");
     
    }

   

     encrypt(plainText: any, key: any) {
        const C = CryptoJS;
        plainText = C.enc.Utf8.parse(plainText);
        const oKey = C.enc.Utf8.parse(key);
        key = C.enc.Utf8.parse("0000000000000000");
        key.words = oKey.words.slice(0, key.words.length);
        const aes = C.algo.AES.createEncryptor(key, {
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7,
            iv: key
        });
        const aesProcessor = aes.process(plainText);
        const enctypted = aes.finalize();
        return C.enc.Base64.stringify(enctypted);
    }

    decrypt(encryptedText: any, key: any) {
        const C = CryptoJS;
        encryptedText = C.enc.Base64.parse(encryptedText);
        const oKey = C.enc.Utf8.parse(key);
         key = C.enc.Utf8.parse("0000000000000000");
        key.words = oKey.words.slice(0, key.words.length);
        const aes = C.algo.AES.createDecryptor(key, {
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7,
            iv: key
        });
        const aesProcessor = aes.process(encryptedText);
        const decrypted = aes.finalize(); // );
        return C.enc.Utf8.stringify(decrypted);
    }

    async tokenValidate(token: any){
        return true;
      
    }



}
