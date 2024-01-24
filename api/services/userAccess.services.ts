import { IUserAccess } from '../interfaces';
import { userAccessRepo } from '../repositories';

export const getAllUserAccess = async (): Promise<IUserAccess[]> => {
  const userAccess = await userAccessRepo.find();
  if (!userAccess) {
    throw new Error('No se encontraron users')
  }
  return userAccess;
};

export const getUserAccessById = async (id: string): Promise<IUserAccess | null> => {
  const userAccess: IUserAccess | null = await userAccessRepo.findById(id);
  console.log(userAccess)
  if (!userAccess) {
    throw new Error('User no encontrado')
  }
  return userAccess;
};