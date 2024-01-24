import { userRepo, roleRepo } from "../repositories";
import {
  IPaginationResponseUser,
  IUser,
  IUserCreateParams,
  IUserUpdateParams,
  IUsersDeleted,
} from "../interfaces";
import { Types, _FilterQuery } from "mongoose";
import { passworBcrypt } from "../utils";

export const getUserService = async (
  name: string | undefined,
  surname: string | undefined,
  email: string | undefined,
  page: string | undefined | number = 0,
  quantity: string | undefined | number = 0,
  order: string | undefined | number = 0,
  field: string | undefined | number = 0
): Promise<IPaginationResponseUser> => {
  let filter: _FilterQuery<IUser> = {};
  const defaultFilter = { isDeleted: { $in: [false, null] } };
  const pageFormatter = Number(page);
  const cantFormatter = Number(quantity);
  const skip = (pageFormatter - 1) * cantFormatter;
  let orderQuery: any = {};

  if (name) {
    filter["name"] = { $regex: name, $options: "i" };
  }

  if (surname) {
    filter["surname"] = surname;
  }

  if (email) {
    filter["email"] = { $regex: email, $options: "i" };
  }

  if (order !== undefined) {
    orderQuery[field] = order;
  }

  const users: IUser[] = await userRepo.find(filter, orderQuery, {
    skip,
    limit: cantFormatter,
  });

  const totalUsers = await userRepo.countDocuments(filter);

  const totalPages =
    cantFormatter !== 0 ? Math.ceil(totalUsers / cantFormatter) : 1;
  const response: IPaginationResponseUser = {
    page: cantFormatter !== 0 ? pageFormatter : 1,
    quantity: cantFormatter !== 0 ? cantFormatter : totalUsers,
    cantTotal: totalUsers,
    totalPages,
    data: users,
  };
  return response;
};

export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  const user: IUser | null = await userRepo.findById(id);
  if (!user) {
    throw "User no encontrado";
  }
  return user;
};

export const createUserService = async (
  data: IUserCreateParams
): Promise<IUser> => {
  const existingUser = await userRepo.findByMail(data.email);

  if (existingUser) {
    if (existingUser.isDeleted) {
      throw new Error("User esta eliminado");
    } else {
      throw new Error("User ya existe");
    }
  }
  let newData: any = {
    name: data.name,
    surname: data.surname,
    email: data.email,
    phone: data.phone,
    password: await passworBcrypt(data.password),
  };

  if (typeof data.role !== "object" && data.role) {
    const role = await roleRepo.findById(data.role);
    if (role !== null) {
      newData["role"] = role;
    } else {
      throw new Error("Rol no existe");
    }
  } else if (data.role) {
    newData["role"] = data.role;
  } else {
    throw new Error("Rol no existe");
  }

  const User: IUser = await userRepo.create(newData);
  return User;
};

export const updateUserService = async (
  id: Types.ObjectId,
  datatoupdate: IUserUpdateParams
): Promise<IUser | null> => {
  if(datatoupdate.password){
    if(datatoupdate.password !== datatoupdate.passwordCompare){
      throw "Password no coincide";
    }
  }else{
    delete datatoupdate.passwordCompare
  }
  

  const updatedUser = await userRepo.updateById(id, datatoupdate);
  if (!updatedUser) {
    throw "User no encontrado";
  }
  return updatedUser;
};

export const deleteUserService = async (
  id: Types.ObjectId
): Promise<IUser | null> => {
  const deletedUser = await userRepo.deleteById(id);
  if (!deletedUser) {
    throw "User no encontrado";
  }
  return deletedUser;
};

export const deleteMultipleUsersByIdService = async (
  ids: string[]
): Promise<IUsersDeleted> => {
  const updatedProductDeleted: IUser | null =
    await userRepo.updateMultipleById(ids);
    
  if (!updatedProductDeleted) {
    throw new Error("Error al eliminar el producto.");
  }
  return {
    isDeleted: true,
  };
};
