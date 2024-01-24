import { Request, Response } from "express";
import { catchError } from "./../utils";
import {
  createUserService,
  deleteMultipleUsersByIdService,
  deleteUserService,
  getUserByIdService,
  getUserService,
  updateUserService,
} from "../services/user.services";
import { IParamsQueryGetUser } from "../interfaces";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, phone, password, role } = req.body;
    const user = await createUserService({ name, surname, email, phone, password, role });
    return res.json({ status: true, data: user });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const createUserFront = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, phone, password } = req.body;
    const role = { name: "user", code: 1 };
    const user = await createUserService({ name, surname, email, phone, password, role });
    return res.json({ status: true, data: user });
  } catch (error: any) {
    return catchError(res, error.message);
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    return res.json({ status: true, data: user });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const params: IParamsQueryGetUser = req.query
    const { page, quantity, name, surname, email, field, order } = params;
    const users = await getUserService(name, surname, email, page, quantity, order, field);
    return res.json({ status: true, data: users });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id, name, surname, email, phone, password,passwordCompare, role } = req.body
    const user = await updateUserService(id, { name, surname, email, phone, password,passwordCompare, role });
    return res.json({ status: true, data: user });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const deletedUser = await deleteUserService(id);
    return res.json({ status: true, data: deletedUser });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};


export const deleteMultipleUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    const result = await deleteMultipleUsersByIdService(ids);
    return res.json({
      success: true,
      message: "Subscripciones eliminadas correctamente.",
      ids,
    });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};