import { Request, Response } from 'express';
import {
  getAllUserAccess,
  getUserAccessById
} from '../services/userAccess.services';
import { catchError } from '../utils';

export const getAllUserAccessController = async (req: Request, res: Response) => {
  try {
    const userAccess = await getAllUserAccess();
    return res.json({ status: true, data: userAccess });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const getUserAccessByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userAccess = await getUserAccessById(id);
    return res.json({ status: true, data: userAccess });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};


