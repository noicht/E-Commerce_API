import { Request, Response } from "express";
import {
    getAllSubscriberService,
    createSubscriberService,
    deleteMultipleSubscribersByIdService
} from "../services/subscriber.services";
import { catchError } from '../utils';
import { IParamsQueryGetSubscribers } from "../interfaces";

export const getAllSubscriber = async (req: Request, res: Response) => {
    try {
        const params: IParamsQueryGetSubscribers = req.query
        const { page, quantity,  email, field, order } = params;
        const subscriber = await getAllSubscriberService(email, page, quantity, order, field);
        return res.json({ status: true, data: subscriber });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const createSubscriber = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
    try {
        const response = await createSubscriberService({ email });
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};


export const deleteMultipleSubscribers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { ids } = req.body;
      const result = await deleteMultipleSubscribersByIdService(ids);
      return res.json({
        success: true,
        message: "Subscripciones eliminadas correctamente.",
        ids,
      });
    } catch (error: any) {
      return catchError(res, error.message);
    }
  };