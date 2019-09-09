import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const usersInRolesSchema = new Schema(
  {
    admin: {
      type: [],
    },
    user: {
      type: [],
    },
  }
);

export default mongoose.model("users-in-roles", usersInRolesSchema);
