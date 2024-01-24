import { ParsedQs } from "qs";
import { paginationResponse } from ".";

export interface ISubscriber {
    email: string;
}

export interface ISubscriberCreate {
    email: string;
}
export interface IParamsQueryGetSubscribers extends ParsedQs {
  email?: string;
  page?: string;
  quantity?: string;
  field?: string;
  order?: string;
}

export interface IPaginationResponseSubscriber extends paginationResponse {
  data: ISubscriber[];
}

export interface ISubscribersDeleted {
  isDeleted: boolean;
}
