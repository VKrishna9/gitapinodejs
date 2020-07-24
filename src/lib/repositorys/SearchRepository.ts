const dateTime = require("node-datetime");
import { connect, disconnect } from "../repositorys/mongoDBUtils";
var request = require('request');

import * as JWT from "jsonwebtoken";
import { SearchModel } from "../model/search.model";
import { SearchParams } from "../utils/SearchParams";
import { ReportRepository } from "./ReportRepository";
import { logger } from "../utils/LogUtils";
import { CustomeError } from "../utils/TokenChecker";

export class SearchRepository {
    
    async getSearchData<T>(sch: SearchParams) {
        var searchUrl = "https://api.github.com/search/repositories?q=" + sch.getUrlString() + "&sort=stars&order=desc&page=1&per_page=30";
        searchUrl = sch.getLink() === "" ? searchUrl : sch.getLink();
        var options = {
            url: searchUrl,
            headers: {
                "User-Agent": "tabula"  // Your Github ID or application name
            }
        };
        
       try {
        return request.get(options)
            .on('response', function (error: any, response: any) { 
                if (error) {
                    //throw new Error();
                }               
                logger.info(JSON.stringify(response));
                ReportRepository.prototype.saveRecord(sch);
                return JSON.stringify(response);
            });
        } catch(exception){
            throw new CustomeError(404, "");
        }
    }







}
