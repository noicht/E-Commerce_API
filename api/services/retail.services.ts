import { _FilterQuery } from "mongoose";
import {
  IRetail,
  IRetailCreate,
  IRetailUpdate,
  IRetailResponse,
  IPaginationResponseRetail,
} from "../interfaces";
import { retailRepo } from "../repositories/retail.repo";

export const getAllRetailService = async (
  page: string | undefined | number = 0,
  quantity: string | undefined | number = 0,
  field: string | undefined | number = 0,
  order: string | undefined | number = 0
): Promise<IPaginationResponseRetail> => {
  let filter: _FilterQuery<IRetail> = {};
  const pageFormatter = Number(page);
  const cantFormatter = Number(quantity);
  const skip = (pageFormatter - 1) * cantFormatter;
  let orderQuery: any = {};

  if (order !== undefined) {
    orderQuery[field] = order;
  }

  const retails: IRetail[] = await retailRepo.getAllRetail(filter, orderQuery, {
    skip,
    limit: cantFormatter,
  });

  const totalCategories = await retailRepo.countDocuments(filter);

  const totalPages =
    cantFormatter !== 0 ? Math.ceil(totalCategories / cantFormatter) : 1;

  if (!retails) {
    throw "No se encontraron retails";
  }
  const response: IPaginationResponseRetail = {
    page: cantFormatter !== 0 ? pageFormatter : 1,
    quantity: cantFormatter !== 0 ? cantFormatter : totalCategories,
    cantTotal: totalCategories,
    totalPages,
    data: retails,
  };
  return response;
};

export const getRetailByIdService = async (
  id: string
): Promise<IRetail | null> => {
  const Retail: IRetail | null = await retailRepo.getRetailById(id);
  if (!Retail) {
    throw "Retail no encontrado";
  }
  return Retail;
};

export const createRetailService = async (
  data: IRetailCreate
): Promise<IRetail> => {
  const Retail: IRetail = await retailRepo.createRetail(data);
  return Retail;
};

export const updateRetailService = async (
  id: string,
  data: IRetailUpdate
): Promise<IRetail | null> => {
  const validateData = await retailRepo.getRetailById(id);
  if (!validateData) {
    throw "Retail no encontrado";
  }
  const updatedRetail = await retailRepo.updateRetail(id, data);
  return updatedRetail;
};

export const deleteRetailService = async (
  id: string
): Promise<IRetail | null> => {
  const validateData = await retailRepo.getRetailById(id);
  if (!validateData) {
    throw "Retail no encontrado";
  }
  const retail = await retailRepo.deleteRetail(id);
  return retail;
};
