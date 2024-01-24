import { Types } from "mongoose";
import { IRole } from "./role.interface";
import { paginationResponse } from "./default.interface";
import { ParsedQs } from "qs";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  role: IRole;
  isDeleted: boolean;
  isSubscription: boolean;
  passwordResetToken: string;
}

export interface IUserCreateParams {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  role?: string | IRole;
}

export interface IUserCreate {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  role: IRole;
}
export interface IUserUpdateParams {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  password?: string;
  passwordCompare?:string;
  role?: IRole;
}
export interface IUserUpdate {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: IRole;
}

export interface IParamsQueryGetUser extends ParsedQs {
  name?: string;
  surname?: string;
  email?: string;
  page?: string;
  quantity?: string;
  field?: string;
  order?: string;
}

export interface IPaginationResponseUser extends paginationResponse {
  data: IUser[];
}

export interface IUsersDeleted {
  isDeleted: boolean;
}
