import { Types } from "mongoose";
import { ParsedQs } from "qs";
import { paginationResponse } from ".";

export interface ICategory {
  _id?:Types.ObjectId
  name: string;
  description: string;
  isDeleted?: boolean
}


export interface IParamsQueryGetCategory extends ParsedQs {
  name?: string;
  description?: string;
  page?: string;
  quantity?: string;
  field?: string;
  order?: string;
}

export interface IPaginationResponseCategory extends paginationResponse {
  data: ICategory[];
}
