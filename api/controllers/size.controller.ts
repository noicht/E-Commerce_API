import { Request, Response } from "express";
import { catchError } from "./../utils"
import { getSizesServices} from "../services/size.services";


export const getSizes = async (req: Request, res: Response) => {
  try {
   
    const sizes = await getSizesServices();
    return res.json({ status: true, data: sizes });
  } catch (error: any) {
    return catchError(res, error.message);
  }
}

