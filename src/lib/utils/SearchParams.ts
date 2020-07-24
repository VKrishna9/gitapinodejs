
export class SearchParams {


    constructor(
        private sch: string,
        private link: string,
        private userId: string,
        private sch2: string,
    ) {


    }

    getSch() {
        return (this.sch);
    }

     getSch2() {
        return (this.sch2);
    }

    getLink() {
        return (this.link);
    }

    getUserId(){
        return (this.userId);
    }

    getUrlString() {
       
        return this.sch != "" && this.sch != "" ?  this.getSch() + "+language:" + this.getSch2() : this.sch+this.sch2;
    }
}
