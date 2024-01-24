import { Types } from "mongoose";
import { IClient } from "./client.interface";
import { IProduct } from "./products.interface";
import { IRetail } from "./retail.interface";
import { IUser } from "./user.interface";
import { ParsedQs } from "qs";
import { paginationResponse } from './default.interface'

export interface IOrders {
    _id: Types.ObjectId;
    client: IUser | IClient | IRetail;
    products: IOrdersProducts[];
    priceLefTax: number;
    tax: number;
    finalPrice: number;
    status: string;
    code: string;
    partialPayment: number;
    createdAt: number;
    isWholesaler:boolean;
    shipping:string;
}

export interface IOrdersProducts {
    quantity: number;
    product: IProduct;
    discount: number;
}

export interface IOrdersParams {
    client: string | IRetail;
    products: IOrdersProductsParams[];
    status?: string;
    shipping?:string;
}

export interface IOrdersProductsParams {
    quantity: number;
    discount: number;
    id: Types.ObjectId;
}

export interface IError {
    productId: Types.ObjectId;
    error: string;
}

export interface IOrdersUpdate {
    client?: IUser | IClient | IRetail;
    products?: IOrdersProducts[];
    priceLefTax?: number;
    tax?: number;
    finalPrice?: number;
    status?: string;
    partialPayment?: number;
    isWholesaler?:boolean;
    shipping?:string
}

export interface IQueryParamsGetOrders extends ParsedQs {
    page?: string;
    quantity?: string;
    client?: string;
    code?: string;
    email?:string;
    isWholesaler?:string;
    status?:string;
    shipping?:string;
    name?:string;
}

export interface paginationResponseOrders extends paginationResponse {
    data: IOrders[];
}