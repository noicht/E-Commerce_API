import { Types } from 'mongoose';
import { ParsedQs } from 'qs';
import { paginationResponse } from '.';

export interface IRetail {
    _id: Types.ObjectId; 
    name: string;
    surname: string;
    email: string;
    phone: string;
    address: string;
    isDeleted: boolean;
}

export interface IRetailResponse {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
}

export interface IRetailCreate {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
}

export interface IRetailUpdate {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IParamsQueryGetRetail extends ParsedQs {
  page?: string;
  quantity?: string;
  field?: string;
  order?: string;
}

export interface IPaginationResponseRetail extends paginationResponse {
  data: IRetail[];
}
