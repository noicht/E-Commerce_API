import { Schema, model } from "mongoose";
import { IUserAccess } from "../interfaces";
import { RoleSchema } from "./Role.model";

const UserAccessSchema = new Schema<IUserAccess>({
  rol: {
    type: RoleSchema,
    required: true
  },
  module: {
    type: [String],
    required: true
  },
});

const UserAccess = model<IUserAccess>("userAccess", UserAccessSchema);
export { UserAccess, UserAccessSchema };
