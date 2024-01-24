import { Request, Response } from "express";
import { catchError } from "./../utils"
import { createCategoryService, deleteCategoryService, getCategoryByIdService, getCategoryService, updateCategoryService } from "../services/category.services";
import { IParamsQueryGetCategory } from "../interfaces";


export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body
    const category = await createCategoryService({ name, description });
    return res.json({ status: true, data: category });
  } catch (error: any) {
    return catchError(res, error.message);
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = await getCategoryByIdService(id);
    return res.json({ status: true, data: category });
  } catch (error: any) {
    return catchError(res, error.message);
  }
}

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const params: IParamsQueryGetCategory = req.query
    const { page, quantity, name, description, field, order } = params;
    const category = await getCategoryService(name, description, page, quantity,  field, order);
    return res.json({ status: true, data: category });
  } catch (error: any) {
    return catchError(res, error.message);
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await updateCategoryService(req.params.id, req.body);
    return res.json({ status: true, data: category });
  } catch (error: any) {
    return catchError(res, error.message);
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await deleteCategoryService(req.body.id);
    return res.json({ status: true, data: deletedCategory });
  } catch (error: any) {
    return catchError(res, error.message);
  }
}
