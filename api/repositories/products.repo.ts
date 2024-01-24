import { Orders, Products } from "../models";
import {
    IProduct,
    IProductsCreate,
    IProductsUpload,
    paginationQueryParams,
    IOrders
} from "../interfaces";
import { _FilterQuery, Types } from "mongoose";



export const productsRepo = {
    //cambiamos la funcion para que tenga el filtrado y la paginacion
    async find(filter: _FilterQuery<IProduct> = {},
        pagination: paginationQueryParams = { skip: 0, limit: 0 }): Promise<IProduct[]> {
        const defaultFilter = { isDeleted: { $in: [false, null] } };
        const filters = { ...defaultFilter, ...filter };
        return await Products.find(filters)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .populate('category')
            .exec();
    },
    //funcion para contar los documentos
    async countDocuments(filter: _FilterQuery<IProduct> = {}): Promise<number> {
        const defaultFilter = { isDeleted: { $in: [false, null] } };
        const filters = { ...defaultFilter, ...filter };
        return await Products.countDocuments(filters).populate('category').exec();
    },

    async findById(id: Types.ObjectId | string): Promise<IProduct | null> {
        return Products.findOne({ _id: id }).populate('category');
    },

    async updateById(id: Types.ObjectId | string, obj: IProductsUpload): Promise<IProduct | null> {
        return await Products.findOneAndUpdate(
            { _id: id },
            { $set: obj },
            { returnOriginal: false }
        );
    },

    async updateMultipleById(ids: string[], obj: IProductsUpload): Promise<any> {
        return await Products.updateMany(
            { _id: { $in: ids } },
            { $set: obj },
            { returnOriginal: false }
        );
    },

    async create(obj: IProductsCreate): Promise<IProduct> {
        return new Products(obj).save();
    },

    async modifStock(id: Types.ObjectId | string, quantity: number): Promise<IProduct | null> {
        return await Products.findOneAndUpdate(
            { _id: id },
            { $inc: { stock: quantity } },
            { returnOriginal: false }
        );
    },
    // funcion para obtener los productos con bajo stock
    async lowStock(): Promise<IProduct[]> {
   
        return await Products.find({ })
            .sort({ stock: -1 })
            .limit(10)
            .exec();
    },

    async topProducts(): Promise<IOrders[]> {

        return await Orders.aggregate([
            {
              $unwind: "$products",
            },
            {
              $group: {
                _id: "$products.product._id",
                totalQuantitySold: { $sum: "$products.quantity" },
              },
            },
            {
              $sort: { totalQuantitySold: -1 },
            },
            {
              $limit: 10,
            },
          ]);


    }


};