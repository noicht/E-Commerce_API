import { Schema, model } from "mongoose";
import { IRole } from "../interfaces";
import { boolean } from "zod";

const RoleSchema = new Schema<IRole>({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true, versionKey: false });

const Role = model<IRole>("role", RoleSchema);

export { Role, RoleSchema };
