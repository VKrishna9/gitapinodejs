import { Schema } from "mongoose";
const SearchSchema = new Schema({
  sch: String,
  sch2: String,
  userId: String,
  hits: Number,
  link: String,
  status: Number,
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});



export default SearchSchema;