import { clientRepo } from "../repositories";
import {
  IClient,
  IClientDeleted,
  IClientParamsCreate,
  IPaginationResponseClient,
} from "../interfaces";
import { Types, _FilterQuery } from "mongoose";

export const getClientService = async (
  name: string | undefined,
  businessName: string | undefined,
  code: string | undefined,
  page: string | undefined | number = 0,
  quantity: string | undefined | number = 0,
  order: string | undefined | number = 0,
  field: string | undefined | number = 0
): Promise<IPaginationResponseClient> => {
  let filter: _FilterQuery<IClient> = {};
  const defaultFilter = { isDeleted: { $in: [false, null] } };
  const pageFormatter = Number(page);
  const cantFormatter = Number(quantity);
  const skip = (pageFormatter - 1) * cantFormatter;
  let orderQuery: any = {};

  if (name) {
    filter["name"] = { $regex: name, $options: "i" };
  }

  if (businessName) {
    filter["businessName"] = businessName;
  }

  if (code) {
    filter["code"] = code;
  }

  filter["isDeleted"] = false;

  if (order !== undefined) {
    orderQuery[field] = order;
  }

  const clients: IClient[] = await clientRepo.find(filter, orderQuery, {
    skip,
    limit: cantFormatter,
  });
  const totalClients = await clientRepo.countDocuments(filter);
  const totalPages =
    cantFormatter !== 0 ? Math.ceil(totalClients / cantFormatter) : 1;
  const response: IPaginationResponseClient = {
    page: cantFormatter !== 0 ? pageFormatter : 1,
    quantity: cantFormatter !== 0 ? cantFormatter : totalClients,
    cantTotal: totalClients,
    totalPages,
    data: clients,
  };
  return response;
};

export const createClientService = async (
  data: IClientParamsCreate
): Promise<IClient> => {
  const { name, businessName, cuit, phone, address, debt, code } = data;
  const newData = {
    name,
    businessName,
    cuit,
    phone,
    address,
    debt,
    code,
    isDeleted: false,
  };
  const products: IClient = await clientRepo.create(newData);
  return products;
};

export const updateClientByIdService = async (
  id: Types.ObjectId,
  productData: IClientParamsCreate
): Promise<IClient> => {
  const client: IClient | null = await clientRepo.findById(id);
  if (!client) {
    throw new Error("Cliente no encontrado.");
  }
  if (client.isDeleted) {
    throw new Error("No se puede actualizar un cliente eliminado.");
  }

  const updatedClient: IClient | null = await clientRepo.updateById(
    id,
    productData
  );
  if (!updatedClient) {
    throw new Error("Error al actualizar el cliente.");
  }
  return updatedClient;
};

export const deleteClientByIdService = async (
  id: Types.ObjectId
): Promise<IClientDeleted> => {
  const client: IClient | null = await clientRepo.findById(id);
  if (!client) {
    throw new Error("Cliente no encontrado.");
  }
  const updatedClientDeleted: IClient | null = await clientRepo.updateById(id, {
    isDeleted: true,
  });
  if (!updatedClientDeleted) {
    throw new Error("Error al eliminar el cliente.");
  }
  return {
    isDeleted: true,
    client: updatedClientDeleted,
  };
};

export const getClientsByIdService = async (
  id: Types.ObjectId
): Promise<IClient> => {
  const client: IClient | null = await clientRepo.findById(id);
  if (!client) {
    throw new Error("Cliente no encontrado.");
  }
  return client;
};
