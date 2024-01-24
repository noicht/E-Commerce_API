import { Types } from "mongoose";
import { ParsedQs } from "qs";
import { paginationResponse } from "./default.interface";

export interface IClient {
  _id: Types.ObjectId;
  name: string;
  businessName: string;
  cuit: string;
  phone: string;
  address: string;
  debt: number;
  code: string;
  isDeleted: boolean;
}

export interface IClientCreate {
  name: string;
  businessName: string;
  cuit: string;
  phone: string;
  address: string;
  debt: number;
  code: string;
  isDeleted: boolean;
}

export interface IClientParamsCreate {
  name: string;
  businessName: string;
  cuit: string;
  phone: string;
  address: string;
  debt: number;
  code: string;
}

export interface IClientUpload {
  name?: string;
  businessName?: string;
  cuit?: string;
  phone?: string;
  address?: string;
  debt?: number;
  code?: string;
  isDeleted?: boolean;
}

export interface IClientDeleted {
  isDeleted: boolean;
  client: IClient;
}

export interface IParamsQueryGetClient extends ParsedQs {
  name?: string;
  businessName?: string;
  code?: string;
  page?: string;
  quantity?: string;
  field?: string;
  order?: string;
}

export interface IPaginationResponseClient extends paginationResponse {
  data: IClient[];
}
