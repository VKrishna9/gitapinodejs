import { model } from "mongoose";
import { Document } from "mongoose";
import SearchSchema from "./search.schema";
export const SearchModel = model<Document>("search", SearchSchema);