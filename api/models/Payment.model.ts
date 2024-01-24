import { Schema, model } from "mongoose";
import { IPayment } from "../interfaces";
import { ClientSchema } from "./Client.model";

const PaymentSchema = new Schema<IPayment>({
    client: {
        type: ClientSchema,
        ref: "clients",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true, versionKey: false });

const Payment = model<IPayment>("payments", PaymentSchema);

export { Payment, PaymentSchema };