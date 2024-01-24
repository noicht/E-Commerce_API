import { Request, Response } from "express";
import {
    getUploadService,
    createUploadService
} from "../services/upload.services";
import { catchError } from '../utils'

export const getUpload = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await getUploadService();
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};
export const createUpload = async (req: Request, res: Response): Promise<Response> => {
    const { files } = req;
    try {
        const response = await createUploadService({ files });
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};
