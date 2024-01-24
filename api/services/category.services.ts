import { categoryRepo, productsRepo } from "../repositories";
import { ICategory, IPaginationResponseCategory } from "../interfaces";
import { _FilterQuery } from "mongoose";

export const getCategoryService = async (
  name: string | undefined,
  description: string | undefined,
  page: string | undefined | number = 0,
  quantity: string | undefined | number = 0,
  field: string | undefined | number = 0,
  order: string | undefined | number = 0
): Promise<IPaginationResponseCategory> => {
  let filter: _FilterQuery<ICategory> = {};
  const pageFormatter = Number(page);
  const cantFormatter = Number(quantity);
  const skip = (pageFormatter - 1) * cantFormatter;
  let orderQuery: any = {};

  if (name) {
    filter["name"] = { $regex: name, $options: "i" };
  }

  if (description) {
    filter["description"] = description;
  }

  if (order !== undefined) {
    orderQuery[field] = order;
  }

  const categories: ICategory[] = await categoryRepo.find(filter, orderQuery, {
    skip,
    limit: cantFormatter,
  });

  const totalCategories = await categoryRepo.countDocuments(filter);

  const totalPages =
    cantFormatter !== 0 ? Math.ceil(totalCategories / cantFormatter) : 1;

  if (!categories) {
    throw "No se encontro ninguna category";
  }
  const response: IPaginationResponseCategory = {
    page: cantFormatter !== 0 ? pageFormatter : 1,
    quantity: cantFormatter !== 0 ? cantFormatter : totalCategories,
    cantTotal: totalCategories,
    totalPages,
    data: categories,
  };
  return response;
};

export const getCategoryByIdService = async (
  id: string
): Promise<ICategory | null> => {
  const category: ICategory | null = await categoryRepo.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const createCategoryService = async (
  data: ICategory
): Promise<ICategory> => {
  try {
    const category: ICategory = await categoryRepo.create(data);
    return category;
  } catch (error: any) {
    throw new Error("Error al crear category");
  }
};

export const updateCategoryService = async (
  id: string,
  datatoupdate: Partial<ICategory>
): Promise<ICategory | null> => {
  const updatedCategory = await categoryRepo.updateById(id, datatoupdate);
  if (!updatedCategory) {
    throw new Error("Category not found");
  }
  return updatedCategory;
};

// export const deleteCategoryService = async (
//   id: string
// ): Promise<ICategory | null> => {
//   const deletedCategory = await categoryRepo.deleteById(id);
//   if (!deletedCategory) {
//     throw new Error("Category not found");
//   }
//   return deletedCategory;
// };

export const deleteCategoryService = async (
  id: string
): Promise<ICategory | null> => {
  const products = await productsRepo.find({category:id});


  if (products.length > 0) {
    throw new Error("No se puede eliminar la categoría porque tiene productos activos.");
  }

  const deletedCategory = await categoryRepo.deleteById(id);
  if (!deletedCategory) {
    throw new Error("Categoría no encontrada");
  }
  
  return deletedCategory;
};