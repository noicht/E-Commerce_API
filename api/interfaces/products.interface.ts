import { Types } from "mongoose";
import { ICategory } from "./category.interface";
import { ParsedQs } from "qs";
import { paginationResponse } from "./default.interface";

export interface IProduct {
  _id: Types.ObjectId;
  id?: string;
  name: string;
  description: string;
  category: ICategory;
  price: number;
  images:  string[];
  stock: number;
  isDeleted: boolean;
  isPublished: boolean;
  stockAvailable: boolean;
  discount: number;
  bar_code: string;
  bulk: IProductBulk;
  size:string;
}

export interface IProductBulk {
  quantity_prod: number;
  price: number;
}

export interface IProductsParamsCreate {
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  stock: number;
  isPublished?: boolean;
  bar_code: string;
  bulk: IProductBulk;
  size:string;
}

export interface IProductsCreate {
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  stock: number;
  bar_code: string;
  bulk: IProductBulk;
  isDeleted: boolean;
  size:string;
}

export interface IProductsUpload {
  name?: string;
  description?: string;
  category?: string | Types.ObjectId;
  price?: number;
  images?: string[];
  stock?: number;
  isDeleted?: boolean;
  isPublished?: boolean;
  stockAvailable?: boolean;
  discount?: number;
  bar_code?: string;
  bulk?: IProductBulk;
  size?:string;
}

export interface IProductsUpdateParams {
  id: Types.ObjectId;
}

export interface IProductsDeleted {
  isDeleted: boolean;
  product: IProduct;
}

export interface IQueryParamsGetProducts extends ParsedQs {
  page?: string;
  quantity?: string;
  name?: string;
  category?: string;
  isPublished?: string;
  stockAvailable?: string;
  size?:string;
  order?: string | undefined;

}
export interface paginationResponseProduct extends paginationResponse {
  data: IProduct[];
}
