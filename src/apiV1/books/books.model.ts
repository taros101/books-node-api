import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    cover: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("Book", BookSchema);
