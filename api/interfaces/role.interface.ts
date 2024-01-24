import { Types } from "mongoose";

export enum ERoles{
    User = 1,
    Admin = 2,
    SuperAdmin = 3,
}

export interface IRole {
    id?:Types.ObjectId;
    name: string;
    code:number;
    isDeleted?:Boolean;
}

export interface IRoleCreate {
    name: string;
    code: number;
}

export interface IRoleUpload {
    id:Types.ObjectId;
    name: string;
    code: number;
}
