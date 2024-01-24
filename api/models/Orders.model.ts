import { Schema, model } from "mongoose";
import { IOrders } from "../interfaces";
import { ProductsSchema } from "./Products.model";

const OrdersSchema = new Schema<IOrders>({
    client: Schema.Types.Mixed,
    products: {
        type: [new Schema({
            product: {
                type: ProductsSchema
            },
            quantity: {
                type: Number
            },
            discount: {
                type: Number,
                default: 0,
                required: false
            }
        })],
    },
    isWholesaler:{
        type: Boolean,
        required: true
    },
    priceLefTax: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    finalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending paid', 'partial paid', 'paid', 'cancelled']
    },
    code: {
        type: String,
        required: true
    },
    partialPayment: {
        type: Number,
        default: 0
    },
    shipping:{
        type: String,
        enum: ['pending delivery', 'delivered'],
        required: true
    }
},
    { timestamps: true, versionKey: false });

const Orders = model<IOrders>('orders', OrdersSchema);

export { Orders, OrdersSchema };