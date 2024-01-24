import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  getPaymentService,
  getPaymentByIdService,
  createPaymentService,
  updatePaymentByIdService,
  deletePaymentByIdService,
  deleteMultiplePaymentsByIdService,
} from "../services/payment.services";
import { catchError } from "../utils";
import { IQueryParamsGetPayments } from "../interfaces";

export const getPayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: IQueryParamsGetPayments = req.query;
    const { page, quantity, client, paymentMethod, date, field, order } =
      params;
    const response = await getPaymentService(
      client,
      paymentMethod,
      date,
      page,
      quantity,
      field,
      order
    );
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const getPaymentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Types.ObjectId.createFromHexString(req.params.id);
    const response = await getPaymentByIdService(id);
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const createPayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId, date, total, paymentMethod } = req.body;

  try {
    const response = await createPaymentService({
      clientId,
      date,
      total,
      paymentMethod,
    });
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const updatePayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, clientId, date, total, paymentMethod } = req.body;
    const updatedClient = await updatePaymentByIdService(id, {
      clientId,
      date,
      total,
      paymentMethod,
    });
    return res.json({ success: true, data: updatedClient });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const deletePayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.body;
    await deletePaymentByIdService(id);
    return res.json({
      success: true,
      message: "Payment deleted successfully.",
    });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const deleteMultiplePayments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    await deleteMultiplePaymentsByIdService(ids);
    return res.json({
      success: true,
      message: "Payment deleted successfully.",
    });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};
