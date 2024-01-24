import { Types } from "mongoose";
import { IClient } from "./client.interface";
import { ParsedQs } from "qs";
import {paginationResponse} from './default.interface'
import { IOrders } from "./orders.interface";

export interface IPayment {
    _id: Types.ObjectId;
    client: IClient;
    date: string;
    total: number;
    paymentMethod: string;
    isDeleted: boolean;
}
export interface IPaymentReturn {
    _id: Types.ObjectId;
    client: IClient;
    date: string;
    total: number;
    paymentMethod: string;
 
    isDeleted: boolean;
}



export interface IOrderRetailPopulate {
    orderId: IOrders;
    amount: number;
}

export interface IPaymentCreate {
    client: IClient;
    date: string;
    total: number;
    paymentMethod: string;
    isDeleted: boolean;
}

export interface IPaymentParamsCreate {
    clientId: string;
    date: string;
    total: number;
    paymentMethod: string;
}

export interface IPaymentParamsUpdate {
    clientId?:  string;
    date?: string;
    total?: number;
    paymentMethod?: string;
    isDeleted?: boolean;
}

export interface IPaymentDeleted {
    isDeleted: boolean;
    payment?: IPayment
}
export interface IQueryParamsGetPayments extends ParsedQs {
    page?: string;
    quantity?: string;
    client?: string;
    paymentMethod?: string;
    date?: string;
    field?: string;
    order?: string;
}
export interface paginationResponsePayment  extends paginationResponse {
    data: IPayment[];
}