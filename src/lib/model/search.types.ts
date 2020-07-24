import { Document, Model } from "mongoose";
export interface ISearch {
  keyword: string;
  hits: Number;
  dateOfEntry?: Date;
  lastUpdated?: Date;
  userId: string;
  status: Number;
  sch2: string;
}
export interface ISearchModel extends Model<Document> {
    findOneOrCreate: (
      this: ISearchModel,
      {
        sch,
        userId,
        hits,
        link,
        status,
        sch2,
      }: { sch: string; link: string; hits: number, userId: string, status: Number, sch2: string }
    ) => Promise<Document>;
    findByAge: (
      this: ISearchModel,
      min?: number,
      max?: number
    ) => Promise<Document[]>;
  }