import {
  ISortOptions,
  paginationQueryParams,
} from "./../interfaces/default.interface";
import { _FilterQuery } from "mongoose";
import { Subscriber } from "../models";
import { ISubscriber } from "../interfaces/subscriber.interface";

export const subscriberRepo = {
  async getAllSubscriber(
    filter: _FilterQuery<ISubscriber> = {},
    sort: ISortOptions,
    pagination: paginationQueryParams = { skip: 0, limit: 0 }
  ) {
    return await Subscriber.find(filter)
      .sort(sort || { name: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit);
  },

  async createSubscriber(data: ISubscriber): Promise<ISubscriber> {
    return Subscriber.create(data);
  },

  async countDocuments(
    filter: _FilterQuery<ISubscriber> = {}
  ): Promise<number> {
    return await Subscriber.countDocuments(filter).exec();
  },

  async updateMultipleById(ids: string[]): Promise<any> {
    return await Subscriber.deleteMany({ _id: { $in: ids } });
  },
};
