import { categoryRepo, productsRepo } from "../repositories";
import {
  IOrders,
  IProduct,
  IProductsDeleted,
  IProductsParamsCreate,
  paginationResponseProduct,
} from "../interfaces";
import { _FilterQuery, Types } from "mongoose";


const orderGetProducts: any = {
  'a-z': { name: 1 },
  'z-a': { name: -1 },
  'menor-a-mayor': { price: 1 },
  'mayor-a-menor': { price: -1 }
}

export const getProductsService = async (
  name: string | undefined,
  category: string | undefined,
  isPublished: string | undefined,
  stockAvailable: string | undefined,
  size: string | undefined,
  page: string | number | undefined = 0,
  quantity: string | number | undefined = 0,
  order: string | undefined = ''

): Promise<paginationResponseProduct> => {
  let filter: _FilterQuery<IProduct> = {};
  let sort = {}
  if (name) filter["name"] = new RegExp(name, "i");
  if (category) filter["category"] = category;
  if (isPublished !== undefined) filter["isPublished"] = isPublished;
  if (stockAvailable !== undefined) filter["stockAvailable"] = stockAvailable;
  if (size !== undefined) filter["size"] = size;

  const pageFormated = Number(page);
  const cantFormated = Number(quantity);
  const skip = (pageFormated - 1) * cantFormated;

  if (order !== undefined) sort = orderGetProducts[order] !== undefined ? orderGetProducts[order] : {};

  const total = await productsRepo.countDocuments(filter);
  const products: IProduct[] = await productsRepo.find(filter, {
    skip,
    limit: cantFormated,
    sort
  });
  const totalPages = cantFormated !== 0 ? Math.ceil(total / cantFormated) : 1;

  return {
    page: pageFormated !== 0 ? pageFormated : 1,
    quantity: cantFormated !== 0 ? cantFormated : total,
    cantTotal: total,
    totalPages,
    data: products,
  };
};

export const createProductsService = async (
  data: IProductsParamsCreate
): Promise<IProduct> => {
  const { name, description, category, price, images, stock, bar_code, bulk, size } =
    data;
  const dataCategory = await categoryRepo.findById(category);
  if (!dataCategory) {
    throw new Error("La categoría no existe.");
  }
  const newData = {
    name,
    description,
    price,
    images,
    stock,
    category: category,
    isDeleted: false,
    bar_code,
    bulk,
    stockAvailable: true,
    isPublished: true,
    size
  };

  const products: IProduct = await productsRepo.create(newData);
  return products;
};

export const getProductsByIdService = async (
  id: Types.ObjectId
): Promise<IProduct> => {
  const products: IProduct | null = await productsRepo.findById(id);
  if (!products) {
    throw new Error("Producto no encontrado.");
  }
  return products;
};

export const updateProductByIdService = async (
  id: Types.ObjectId,
  productData: IProductsParamsCreate
): Promise<IProduct> => {
  const product: IProduct | null = await productsRepo.findById(id);
  if (!product) {
    throw new Error("Producto no encontrado.");
  }
  if (product.isDeleted) {
    throw new Error("No se puede actualizar un producto eliminado.");
  }

  const updatedProduct: IProduct | null = await productsRepo.updateById(
    id,
    productData
  );
  if (!updatedProduct) {
    throw new Error("Error al actualizar el producto.");
  }
  return updatedProduct;
};

export const deleteProductsByIdService = async (
  id: Types.ObjectId
): Promise<IProductsDeleted> => {
  const product: IProduct | null = await productsRepo.findById(id);
  if (!product) {
    throw new Error("Producto no encontrado.");
  }
  const updatedProductDeleted: IProduct | null = await productsRepo.updateById(
    id,
    { isDeleted: true }
  );
  if (!updatedProductDeleted) {
    throw new Error("Error al eliminar el producto.");
  }
  return {
    isDeleted: true,
    product: updatedProductDeleted,
  };
};

export const deleteMultipleProductsByIdService = async (
  ids: string[]
): Promise<IProductsDeleted> => {
  const updatedProductDeleted: IProduct | null =
    await productsRepo.updateMultipleById(ids, { isDeleted: true });

  if (!updatedProductDeleted) {
    throw new Error("Error al eliminar el producto.");
  }
  return {
    isDeleted: true,
    product: updatedProductDeleted,
  };
};

export const getSalesService = async (): Promise<IOrders | IOrders[]> => {
  try {
    const topProducts = await productsRepo.topProducts()

    return topProducts;
  } catch (error) {
    console.error('Error al obtener los productos más vendidos:', error);
    throw error;
  }
}