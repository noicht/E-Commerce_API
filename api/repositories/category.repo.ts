import {
  ISortOptions,
  paginationQueryParams,
} from "./../interfaces/default.interface";
import { Category } from "../models";
import { ICategory } from "../interfaces";
import { _FilterQuery } from "mongoose";

export const categoryRepo = {
  async find(
    filter: _FilterQuery<ICategory> = {},
    sort: ISortOptions,
    pagination: paginationQueryParams = { skip: 0, limit: 0 }
  ) {
    const filters = filter ?? {}; // ver esto
    return await Category.find(filters)
      .sort(sort || { name: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .exec();
  },

  async findById(id: string): Promise<ICategory | null> {
    return Category.findOne({ _id: id });
  },

  async updateById(
    id: string,
    obj: Partial<ICategory>
  ): Promise<ICategory | null> {
    return await Category.findOneAndUpdate(
      { _id: id },
      { $set: obj },
      { returnOriginal: false }
    );
  },

  async deleteById(id: string): Promise<ICategory | null> {
    return await Category.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { returnOriginal: false }
    );
  },

  async create(obj: ICategory): Promise<ICategory> {
    return new Category(obj).save();
  },

  async countDocuments(filter: _FilterQuery<ICategory> = {}): Promise<number> {
    return await Category.countDocuments(filter).exec();
  },
};
