import { Payment } from "../models";
import {
    IPayment,
    IPaymentCreate,
    IPaymentParamsUpdate,
    paginationQueryParams
}
    from "../interfaces";
import { _FilterQuery, Types } from "mongoose";

export const paymentRepo = {
    //cambiamos la funcion para que tenga el filtrado y la paginacion
    async find(filter: _FilterQuery<IPayment> = {},
        pagination: paginationQueryParams = { skip: 0, limit: 0 }): Promise<IPayment[]> {
        return await Payment.find(filter)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .sort({createAt:-1})
            .exec();
    },
    //funcion para contar los documentos
    async countDocuments(filter: _FilterQuery<IPayment> = {}): Promise<number> {
        return await Payment.countDocuments(filter).exec();
    },
    //funcion que busca code en orders
    async getPaymentByOrderCode(code: string): Promise<any> {
        try {
            const result = await Payment.aggregate([
                { $unwind: "$orders" },
                {
                    $lookup: {
                        from: "orders",
                        let: { orderId: "$orders.idOrder" },
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$_id", { $toObjectId: "$$orderId" }] },
                                        { $eq: ["$code", code] }
                                    ]
                                }
                            }
                        }],
                        as: "orderInfo"
                    }
                },
                { $unwind: "$orderInfo" },
                { $match: { "orderInfo.code": code } }
            ]);

            return result;
        } catch (error) {
            console.error("Error en la funcion", error);
            throw error;
        }
    },

    async findById(id: Types.ObjectId | string): Promise<IPayment | null> {
        return Payment.findOne({ _id: id });
    },

    async create(obj: IPaymentCreate): Promise<IPayment> {
        return new Payment(obj).save();
    },

    async findPaymentById(id: Types.ObjectId): Promise<IPayment | null> {
        const objId = new Types.ObjectId(id);
        const result = await Payment.findById(objId).exec();
        return result;
    },

    async updateById(id: Types.ObjectId | string, obj: IPaymentParamsUpdate): Promise<IPayment | null> {
        return await Payment.findOneAndUpdate(
            { _id: id },
            { $set: obj },
            { returnOriginal: false }
        );
    },


    async updateMultipleById(ids: string[], obj: IPaymentParamsUpdate): Promise<any> {
        return await Payment.updateMany(
            { _id: { $in: ids } },
            { $set: obj },
            { returnOriginal: false }
        );
    },


};