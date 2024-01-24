import { Request, Response } from "express";
import { Types } from "mongoose";
import {
    getClientService,
    createClientService,
    deleteClientByIdService,
    updateClientByIdService,
    getClientsByIdService
} from "../services/client.services";
import { catchError } from '../utils'
import { IParamsQueryGetClient } from '../interfaces'

export const getClient = async (req: Request, res: Response): Promise<Response> => {
    try {
        const params: IParamsQueryGetClient = req.query
        const { page, quantity, name, businessName, code, field, order } = params;
        const response = await getClientService(name, businessName, code, page, quantity, order, field);
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const createClient = async (req: Request, res: Response): Promise<Response> => {
    const { name, businessName, cuit, phone, address, debt, code } = req.body;
    try {
        const response = await createClientService({ name, businessName, cuit, phone, address, debt, code });
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const getClientById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Types.ObjectId.createFromHexString(req.params.id);
        const response = await getClientsByIdService(id);
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const updateClient = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id, name, businessName, cuit, phone, address, debt, code } = req.body;
        const updatedClient = await updateClientByIdService(id, { name, businessName, cuit, phone, address, debt, code });
        return res.json({ success: true, data: updatedClient });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const deleteClient = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.body;
        const result = await deleteClientByIdService(id);
        return res.json({ success: true, message: 'Successfully deleted client.' });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};