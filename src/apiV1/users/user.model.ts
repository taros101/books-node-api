import * as mongoose from "mongoose";
import { ObjectID } from "bson";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    img: {
      type: String,
      trim: true
    },
    userBooks: {
      type: []
    },
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("User", UserSchema);
