import { ISortOptions } from "./../interfaces/default.interface";
import { User } from "../models";
import { IUser, IUserCreate } from "../interfaces";
import { _FilterQuery, Types } from "mongoose";
import { paginationQueryParams } from "../interfaces";

export const userRepo = {
  async find(
    filter: _FilterQuery<IUser> = {},
    sort: ISortOptions,
    pagination: paginationQueryParams = { skip: 0, limit: 0 }
  ): Promise<IUser[]> {
    return await User.find(filter)
      .sort(sort || { name: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit);
  },

  async findById(id: string): Promise<IUser | null> {
    return User.findOne({ _id: id });
  },
  async findByMail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email });
  },

  async updateById(
    id: Types.ObjectId,
    obj: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { _id: id },
      { $set: obj },
      { returnOriginal: false }
    );
  },

  async deleteById(id: Types.ObjectId): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  },

  async create(obj: IUserCreate): Promise<IUser> {
    return new User(obj).save();
  },
  async validateTokenRecovery(token: string): Promise<IUser | null> {
    return await User.findOne({ passwordResetToken: token, });
  },

  async countDocuments(filter: _FilterQuery<IUser> = {}): Promise<number> {
    return await User.countDocuments(filter).exec();
  },


  async updateMultipleById(ids: string[]): Promise<any> {
    return await User.deleteMany({ _id: { $in: ids } });
  },
};
