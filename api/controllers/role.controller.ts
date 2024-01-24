import { Request, Response } from "express";
import { catchError } from '../utils'
import {
    getRoleService,
    createRoleService,
    uploadRoleService,
    deleteRoleService
} from "../services/role.service";

export const getRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await getRoleService();
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const createRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, code } = req.body;
        const response = await createRoleService({ name, code });
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const uploadRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id, name, code } = req.body;
        const response = await uploadRoleService({ id, name, code });
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.body;
        const response = await deleteRoleService(id);
        return res.json({ status: true, data: response });
    } catch (error: any) {
        return catchError(res, error.message);
    }
};