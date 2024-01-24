import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  getProductsService,
  createProductsService,
  getProductsByIdService,
  updateProductByIdService,
  deleteProductsByIdService,
  deleteMultipleProductsByIdService,
  getSalesService
} from "../services/products.services";
import { catchError } from "../utils";
import { IQueryParamsGetProducts } from "../interfaces";


export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params: IQueryParamsGetProducts = req.query;
    const { page, quantity, name, category, isPublished, stockAvailable,size,order } =
      params;
    const response = await getProductsService(
      name,
      category,
      isPublished,
      stockAvailable, 
      size,
      page,
      quantity,
      order
    );
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const createProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description, category, price, images, stock, bar_code, bulk,size } =
    req.body;
  try {
    const response = await createProductsService({
      name,
      description,
      category,
      price,
      images,
      stock,
      bar_code,
      bulk,
      size
    });
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const getProductsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Types.ObjectId.createFromHexString(req.params.id);
    const response = await getProductsByIdService(id);
    return res.json({ status: true, data: response });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const updateProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      id,
      name,
      description,
      category,
      price,
      images,
      stock,
      isPublished,
      bar_code,
      bulk,
      size
    } = req.body;
    const updatedProduct = await updateProductByIdService(id, {
      name,
      description,
      category,
      price,
      images,
      stock,
      isPublished,
      bar_code,
      bulk,
      size
    });
    return res.json({ success: true, data: updatedProduct });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.body;
    const result = await deleteProductsByIdService(id);
    return res.json({
      success: true,
      message: "Producto eliminado correctamente.",
    });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const deleteMultipleProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ids } = req.body;
    const result = await deleteMultipleProductsByIdService(ids);
    return res.json({
      success: true,
      message: "Producto eliminado correctamente.",
      ids,
    });
  } catch (error: any) {
    return catchError(res, error.message);
  }
};

export const getSales = async (req: Request, res: Response): Promise<Response> => {
  try {
      const response = await getSalesService();
      return res.json({ status: true, data: response });
  } catch (error: any) {
      return catchError(res, error.message);
  }
};
