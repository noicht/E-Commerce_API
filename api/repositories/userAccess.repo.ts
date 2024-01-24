import { UserAccess } from '../models/';
import { IUserAccess } from '../interfaces';

export const userAccessRepo = {
  async find() {
    return await UserAccess.find();
  },

  async findById(id: string): Promise<IUserAccess | null> {
    return UserAccess.findById(id);
  },
};