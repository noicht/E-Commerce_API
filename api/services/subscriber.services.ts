import { _FilterQuery } from "mongoose";
import { IPaginationResponseSubscriber, ISubscriber, ISubscriberCreate, ISubscribersDeleted } from "../interfaces";
import { subscriberRepo } from "../repositories/subscriber.repo";

export const getAllSubscriberService = async (
  email: string | undefined,
  page: string | undefined | number = 0,
  quantity: string | undefined | number = 0,
  order: string | undefined | number = 0,
  field: string | undefined | number = 0
): Promise<IPaginationResponseSubscriber> => {
  let filter: _FilterQuery<ISubscriber> = {};
  const defaultFilter = { isDeleted: { $in: [false, null] } };
  const pageFormatter = Number(page);
  const cantFormatter = Number(quantity);
  const skip = (pageFormatter - 1) * cantFormatter;
  let orderQuery: any = {};

  if (email) {
    filter["email"] = { $regex: email, $options: "i" };
  }

  if (order !== undefined) {
    orderQuery[field] = order;
  }

  const subscribers: ISubscriber[] = await subscriberRepo.getAllSubscriber(
    filter,
    orderQuery,
    {
      skip,
      limit: cantFormatter,
    }
  );


  const totalSubscriber = await subscriberRepo.countDocuments(filter);

  const totalPages =
    cantFormatter !== 0 ? Math.ceil(totalSubscriber / cantFormatter) : 1;
  const response: IPaginationResponseSubscriber = {
    page: cantFormatter !== 0 ? pageFormatter : 1,
    quantity: cantFormatter !== 0 ? cantFormatter : totalSubscriber,
    cantTotal: totalSubscriber,
    totalPages,
    data: subscribers,
  };
  return response;
};

export const createSubscriberService = async (
  data: ISubscriberCreate
): Promise<ISubscriber> => {
  const subscriberAdd: ISubscriber = await subscriberRepo.createSubscriber(
    data
  );
  return subscriberAdd;
};

export const deleteMultipleSubscribersByIdService = async (
  ids: string[]
): Promise<ISubscribersDeleted> => {
  const updatedProductDeleted: ISubscriber | null =
    await subscriberRepo.updateMultipleById(ids);
    
  if (!updatedProductDeleted) {
    throw new Error("Error al eliminar el producto.");
  }
  return {
    isDeleted: true,
  };
};
