import { ISearchModel } from "./search.types";
import { Document } from "mongoose";
export async function findOneOrCreate(
  this: ISearchModel,
  key: string
): Promise<Document> {
  const record = await this.create({ key });
  return record;
}
export async function findByHits(
  this: ISearchModel,
  min?: number,
  max?: number
): Promise<Document[]> {
  return this.find({ hits: { $gte: min || 0, $lte: max || Infinity } });
}

export async function find(
    this: ISearchModel,
    key: string
  ): Promise<Document> {
    const record = await this.create({ key });
    return record;
  }