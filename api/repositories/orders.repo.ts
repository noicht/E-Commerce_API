import { Orders } from "../models";
import {
  IOrders,
  paginationQueryParams,
  IBestSellingProduct,
} from "../interfaces";
import { _FilterQuery, Types } from "mongoose";

export const ordersRepo = {
    //cambiamos la funcion para que tenga el filtrado y la paginacion
    async find(
        filter: any = {},
        pagination: paginationQueryParams = { skip: 0, limit: 0 },
        sortOrder:any  = { 'createdAt': 1 }
    ): Promise<IOrders[]> {
        return await Orders.find(filter)
            .sort(sortOrder)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .exec();
    },
    //funcion para contar los documentos
    async countDocuments(filter: _FilterQuery<IOrders> = {}): Promise<number> {
        return await Orders.countDocuments(filter).exec();
    },

  async findById(id: Types.ObjectId): Promise<IOrders | null> {
    return Orders.findOne({ _id: id });
  },

  async updateById(
    id: Types.ObjectId,
    obj: Partial<IOrders>
  ): Promise<IOrders | null> {
    return await Orders.findOneAndUpdate(
      { _id: id },
      { $set: obj },
      { returnOriginal: false }
    );
  },

  async create(obj: IOrders): Promise<IOrders> {
    return new Orders(obj).save();
  },

  async findOneOrder(filter: any, options?: any): Promise<IOrders | null> {
    return Orders.findOne(filter).sort(options.sort).exec();
  },

  //funcion de dashboard que devuelve total de ventas minoristas y mayoristas:
  async findOrdersWeek(isWholesaler?:boolean | null ): Promise<IOrders[] | null> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 15); //aca manejamos los ultimos 15 dias
    let filter:any = {
      createdAt: { $gte: oneWeekAgo },
    }
    if (isWholesaler) filter["isWholesaler"] = isWholesaler;

    let orders = await Orders.find(filter);
    if (orders.length === 0) {
      let newFilter:any = {}
      if (isWholesaler) newFilter["isWholesaler"] = isWholesaler;
      orders = await Orders.find(newFilter).sort({ createdAt: -1 }).limit(7);
    }
    return orders;
  },

  // funcion para tomar los productos mas vendidos:
  async bestSellingProducts(): Promise<IBestSellingProduct[]> {
    const result = await Orders.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product._id",
          totalSold: { $sum: "$products.quantity" },
          productName: { $first: "$products.product.name" },
        },
      },
      { $match: { totalSold: { $gte: 50 } } }, //seteamos el minimo vendido para tener un margen de "mas" vendido.
      { $sort: { totalSold: -1 } },
    ]);
    return result.map((item) => ({
      productId: item._id.toString(),
      name: item.productName,
      sold: item.totalSold,
    }));
  }
};