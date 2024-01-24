import { Request, Response } from "express";
import {
    getOrdersService,
    getOrdersByIdService,
    createOrdersService,
    updateOrderByIdService,
    deleteOrderService
} from "../services/orders.services";
import { _FilterQuery, Types } from "mongoose";
import { catchError } from "../utils";
import { IQueryParamsGetOrders } from "../interfaces";

export const getOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: IQueryParamsGetOrders = req.query;
    const { page, quantity, client,isWholesaler,status,shipping, code,email,name } = params;
    const response = await getOrdersService(client, code,email,isWholesaler,status,shipping,name, page, quantity);
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const getOrdersById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Types.ObjectId.createFromHexString(req.params.id);
    const response = await getOrdersByIdService(id);
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const createOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { client, products } = req.body;
  try {
    const response = await createOrdersService({ client, products });
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
    const { id, client, products, status,shipping } = req.body;
    try {
        const updatedOrder = await updateOrderByIdService(id, { client, products, status,shipping });
        return res.json({ status: true, data: updatedOrder });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.body;
    try {
        const updatedOrder = await deleteOrderService(id);
        return res.json({ status: true, data: updatedOrder });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};