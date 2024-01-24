import { Schema, model } from "mongoose";
import {  IUpload } from "../interfaces";

const UploadSchema = new Schema<IUpload>({
    name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
},
    { timestamps: true, versionKey: false });

const Upload = model<IUpload>("uploads", UploadSchema);

export { Upload, UploadSchema };