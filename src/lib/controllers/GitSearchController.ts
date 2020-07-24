import { Service } from "typedi";
import {
    Body, BodyParam, Get, HeaderParam, ContentType, JsonController, Param, Post as HttpPost, Req, Res, Header, OnUndefined
} from "routing-controllers";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { SearchParams } from "../utils/SearchParams";
var request = require('request');
import { SearchModel } from "../model/search.model";
import { SearchRepository } from "../repositorys/SearchRepository";
import { LogInUser, TokenChecker, CustomeError } from "../utils/TokenChecker";
import { LoginRepository } from "../repositorys/LoginRepository";
import { Login } from "../utils/Login";
import { ReportRepository } from "../repositorys/ReportRepository";
import { connectLogger } from "log4js";
import { connect, disconnect } from "../repositorys/mongoDBUtils";

@JsonController("/gitapi")
@Service()
export class GitSearchController {
    constructor(private SearchRepository: SearchRepository) {
    }


    @HttpPost("/searchrepo")
    @ContentType("application/json")
    async getUsers(@TokenChecker({ required: true }) user: LogInUser, @Body() sch: SearchParams) {
        logger.info("searchParam@@" + sch.getSch() + "@@end");
        logger.info("searchParam2@@" + sch.getLink() + "@@end");
        switch (user.error) {
            case 0:
                return await this.SearchRepository.getSearchData(sch);
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }

    }
    @HttpPost("/validateuser")
    @ContentType("application/json")
    async validateUser(@Body() login: Login) {
        logger.info("validateUser =>", login);
        logger.info(login);
        return await LoginRepository.prototype.checkUserlogin(login);
    }


    @HttpPost("/reports")
    @ContentType("application/json")
    async getRports(@TokenChecker({ required: true }) user: LogInUser) {

        switch (user.error) {
            case 0:
                return await ReportRepository.prototype.getSearchReports();
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }

    }

}

