import { IUser } from "../interfaces/user.interface";
import { Schema, model } from "mongoose";
import { RoleSchema } from "./Role.model";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: RoleSchema,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isSubscription: {
      type: Boolean,
      default: true
    },
    passwordResetToken: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
);

const User = model<IUser>("users", UserSchema);

export { User, UserSchema };