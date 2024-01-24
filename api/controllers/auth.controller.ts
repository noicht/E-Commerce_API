import { Request, Response } from "express";
import { catchError } from "./../utils"
import { loginUser, forgotPasswordService, changePasswordService } from "../services/auth.services";

export const authController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const auth = await loginUser(email, password);
    return res.json({ status: true, data: auth });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const data = await forgotPasswordService(email);
    return res.json({ status: true, data });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await changePasswordService(email, password);
    return res.json({ status: true, data });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};