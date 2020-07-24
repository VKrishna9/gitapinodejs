const dateTime = require("node-datetime");
import { connect, disconnect } from "../repositorys/mongoDBUtils";
var request = require('request');

import * as JWT from "jsonwebtoken";
import { SearchModel } from "../model/search.model";
import { SearchParams } from "../utils/SearchParams";
import { logger } from "../utils/LogUtils";

export class ReportRepository {

    async getSearchReports<T>() {
        connect();
        const cursor = SearchModel.find().select('sch link userId dateOfEntry -_id').cursor();
        var data = "[";
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            //  logger.info(JSON.stringify(doc)); // Prints documents one at a time
            data += ' { "sch": "' + (doc.sch) + '"  ,  "link": "' + doc.link + '" ,  "userId": "' + doc.userId + '" ,  "dateOfEntry": "' + doc.dateOfEntry.toLocaleString('en-US') + '" } ,';
        }
        data = data.slice(0, -1)
        data += " ]";
        logger.info(data);
        return await JSON.parse(data);


    }

    async saveRecord(sch: SearchParams) {
        (async () => {
            connect();
            
            const searches = [
                { keyword: sch.getSch(), userId: sch.getUserId(), link: sch.getLink(), hits: 1,  keyword2: sch.getSch2() }
            ];
            try {

                await SearchModel.create(sch);
                logger.info(`Created search ${sch.getSch()} `);
            } catch (e) {
                console.error(e);
            }
        })();
    }







}
