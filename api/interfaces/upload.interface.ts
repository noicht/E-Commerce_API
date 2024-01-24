import { Types } from "mongoose";

export interface IUploadFiles {
    files:Express.Multer.File[] | Express.Multer.File|boolean|undefined|any
}

export interface IUpload {
    id?:Types.ObjectId;
    name: string;
    url: string;
    type: string;
    size: number
}