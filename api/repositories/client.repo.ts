import { ISortOptions } from './../interfaces/default.interface';
import { Client } from "../models";
import {
  IClient,
  IClientCreate,
  IClientUpload,
  paginationQueryParams,
} from "../interfaces";
import { _FilterQuery, Types } from "mongoose";

export const clientRepo = {
  async find(
    filter: _FilterQuery<IClient> = {},
    sort: ISortOptions,
    pagination: paginationQueryParams = { skip: 0, limit: 0 }
  ): Promise<IClient[]> {
    return await Client.find(filter)
      .sort(sort || { name: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .exec();
  },

  async findById(id: Types.ObjectId | string): Promise<IClient | null> {
    return Client.findOne({ _id: id });
  },
  
  async updateById(
    id: Types.ObjectId | string,
    obj: IClientUpload
  ): Promise<IClient | null> {
    return await Client.findOneAndUpdate(
      { _id: id },
      { $set: obj },
      { returnOriginal: false }
    );
  },

  async create(obj: IClientCreate): Promise<IClient> {
    return new Client(obj).save();
  },

  async modifDebt(id: Types.ObjectId | string, quantity: number): Promise<IClient | null> {
    const roundedQuantity = parseFloat(quantity.toFixed(2));
    return await Client.findOneAndUpdate(
      { _id: id },
      { $inc: { debt: roundedQuantity } },
      { returnOriginal: false }
    );
  },

  async countDocuments(filter: _FilterQuery<IClient> = {}): Promise<number> {
    return await Client.countDocuments(filter).exec();
  },

  // funcion que nos devuelve los clientes con mas deuda:
  async debtorClient(limit: number = 10): Promise<IClient[]> {
    return await Client.find().sort({ debt: 1 }).limit(limit).exec();
  }

};
