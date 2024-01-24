import { Request, Response } from 'express';
import { catchError } from "./../utils"
import {
  createRetailService,
  deleteRetailService,
  getAllRetailService,
  getRetailByIdService,
  updateRetailService
} from '../services/retail.services';
import { IParamsQueryGetRetail } from '../interfaces';

export const getAllRetailController = async (req: Request, res: Response) => {
  try {
    const params: IParamsQueryGetRetail = req.query
    const { page, quantity, field, order } = params;
    const retail = await getAllRetailService(page, quantity, field, order);
    return res.json({ status: true, data: retail });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const getRetailByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const retail = await getRetailByIdService(id);
    return res.json({ status: true, data: retail });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const createRetailController = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, phone, address } = req.body;
    const retail = await createRetailService({ name, surname, email, phone, address });
    return res.json({ status: true, data: retail });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const updateRetailController = async (req: Request, res: Response) => {
  try {
    const { id, name, surname, email, phone, address } = req.body;
    const retail = await updateRetailService(id, { name, surname, email, phone, address });
    return res.json({ status: true, data: retail });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const deleteRetailController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deletedRetail = await deleteRetailService(id);
    return res.json({ status: true, data: deletedRetail });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};
