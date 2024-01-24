import { IClient } from "./client.interface";
import { IOrders } from "./orders.interface";
import { IPayment } from "./payment.interface";
import { IProduct } from "./products.interface";

export interface IDailySell {
    wholesale: IOrders[] | null;
    retail: IOrders[] | null;
}

export interface IStockProduct {
    productId: string;
    name: string;
    stock: number;
}

export interface IBestSellingProduct {
    productId: string;
    name: string;
    sold: number;
}

export interface IDashboard {
    payments: IPayment[];
    debtorsClients: IClient[];
    stockProducts: IProduct[];
    ordersPending: IOrdersPendigShippin;
}

export interface IOrdersPendigShippin{
    wholesalers:IOrders[];
    retails:IOrders[]
}