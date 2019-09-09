import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserRolesSchema = new Schema(
  {
    role: {
      type: String,
      unique: true,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("Users-Roles", UserRolesSchema);
