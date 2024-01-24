import { IRole } from "./role.interface";
import { Types } from "mongoose";


export interface IUserAccess {
    _id: Types.ObjectId,
    rol: IRole;
    module: string[];
  }
  
