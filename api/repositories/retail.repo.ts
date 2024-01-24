import { ISortOptions, paginationQueryParams } from './../interfaces/default.interface';
import { _FilterQuery } from 'mongoose';
import { Retail } from "../models";
import {
  IRetail,
  IRetailCreate,
  IRetailUpdate,
} from "../interfaces/retail.interface";

export const retailRepo = {
  async getAllRetail(
    filter: _FilterQuery<IRetail> = {},
    sort: ISortOptions,
    pagination: paginationQueryParams = { skip: 0, limit: 0 }
  ) {
    return await Retail.find();
  },

  async getRetailById(id: string): Promise<IRetail | null> {
    return Retail.findById(id);
  },

  async createRetail(data: IRetailCreate): Promise<IRetail> {
    return Retail.create(data);
  },

  async updateRetail(id: string, data: IRetailUpdate): Promise<IRetail | null> {
    return await Retail.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { returnOriginal: false }
    );
  },
  async deleteRetail(id: string): Promise<IRetail | null> {
    return await Retail.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { returnOriginal: false }
    );
  },

  async countDocuments(filter: _FilterQuery<IRetail> = {}): Promise<number> {
    return await Retail.countDocuments(filter).exec();
  },
};
