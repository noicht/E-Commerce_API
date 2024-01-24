import { paymentRepo, clientRepo, ordersRepo } from "../repositories";
import {
  IPayment,
  IPaymentParamsCreate,
  IPaymentCreate,
  IPaymentParamsUpdate,
  IPaymentDeleted,
  paginationResponsePayment,
} from "../interfaces";
import { _FilterQuery, Types } from "mongoose";
import mongoose from "mongoose";
import { processPayment, processPaymentDelete } from "./orders.services";

const ObjectId = mongoose.Types.ObjectId;

export const getPaymentService = async (
  clientId: string | undefined,
  paymentMethod: string | undefined,
  date: string | undefined,
  page: string | number | undefined = 0,
  quantity: string | number | undefined = 0,
  field: string | undefined | number = 0,
  order: string | undefined | number = 0
): Promise<paginationResponsePayment> => {
  let filter: _FilterQuery<IPayment> = {};

  filter["isDeleted"] = false;
  if (clientId) filter["client._id"] = new Types.ObjectId(clientId);
  if (paymentMethod) filter["paymentMethod"] = new RegExp(paymentMethod, "i");
  if (date) filter["date"] = new RegExp(date, "i");

  const pageFormated = Number(page);
  const cantFormated = Number(quantity);
  const skip = (pageFormated - 1) * cantFormated;

  const payment: IPayment[] = await paymentRepo.find(filter, {
    skip,
    limit: cantFormated,
  });
  const total = await paymentRepo.countDocuments(filter);
  const totalPages = cantFormated !== 0 ? Math.ceil(total / cantFormated) : 1;


  return {
    page: pageFormated !== 0 ? pageFormated : 1,
    quantity: cantFormated !== 0 ? cantFormated : total,
    cantTotal: total,
    totalPages,
    data: payment,
  };
};

export const getPaymentByIdService = async (
  id: Types.ObjectId
): Promise<IPayment> => {
  const client: IPayment | null = await paymentRepo.findById(id);
  if (!client) {
    throw new Error("Payment no encontrada.");
  }
  return client;
};

export const createPaymentService = async (
  data: IPaymentParamsCreate
): Promise<IPayment> => {
  const { clientId, date, total, paymentMethod } = data;
  const clientData = await clientRepo.findById(clientId);
  if (!clientData) {
    throw new Error("Cliente no encontrado.");
  }
  if (clientData.isDeleted) {
    throw new Error("El cliente a sido eliminado.");
  }
  const newData: IPaymentCreate = {
    client: clientData,
    date,
    total,
    paymentMethod,
    isDeleted: false,
  };
  const payment: IPayment = await paymentRepo.create(newData);

  await clientRepo.modifDebt(clientId, - total);

  processPayment(payment, clientData);

  return payment;
};

export const updatePaymentByIdService = async (
  id: Types.ObjectId,
  productData: IPaymentParamsUpdate
): Promise<IPayment> => {
  const payment: IPayment | null = await paymentRepo.findById(id);
  let clientData;

  if (!payment) {
    throw new Error("Payment no encontrada.");
  }

  if (productData.clientId) {
    clientData = await clientRepo.findById(productData.clientId);
    if (!clientData) {
      throw new Error("El cliente no existe.");
    }
  }

  if (payment.isDeleted) {
    throw new Error("No se puede actualizar un payment eliminado.");
  }

  let dataUpdate = clientData
    ? { clientData: clientData, ...productData }
    : productData;
  const updatedPayment: IPayment | null = await paymentRepo.updateById(
    id,
    dataUpdate
  );

  if (!updatedPayment) {
    throw new Error("Error al actualizar el payment.");
  }

  if (productData.clientId) {
    await clientRepo.modifDebt(payment.client._id, payment.total);

    await clientRepo.modifDebt(
      updatedPayment.client._id,
      -updatedPayment.total
    );
  }

  return updatedPayment;
};

export const deletePaymentByIdService = async (
  id: Types.ObjectId | string
): Promise<IPaymentDeleted> => {
  const payment: IPayment | null = await paymentRepo.findById(id);
  if (!payment) {
    throw new Error("Payment no encontrada.");
  }
  const updatedPaymentDeleted: IPayment | null = await paymentRepo.updateById(id, { isDeleted: true });

  if (!updatedPaymentDeleted) {
    throw new Error("Error al eliminar el payment.");
  }
  await clientRepo.modifDebt(payment.client._id, payment.total);
  await processPaymentDelete(payment, payment.client);
  return {
    isDeleted: true,
    payment: updatedPaymentDeleted,
  };
};


export const deleteMultiplePaymentsByIdService = async (
  ids: string[]
): Promise<IPaymentDeleted> => {
  
  for (let id of ids) {
    await deletePaymentByIdService(id)
  }

  return {
    isDeleted: true,
  };
};
