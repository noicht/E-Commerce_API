import { Role } from "../models";
import { IRole, IRoleCreate } from "../interfaces";
import { _FilterQuery, Types } from "mongoose";

export const roleRepo = {
    async find(filter?: _FilterQuery<IRole>) {
        const filters = filter ?? {};
        return await Role.find(filters);
    },

    async findById(id: string): Promise<IRole | null> {
        return Role.findOne({ _id: id });
    },

    async updateById(id: Types.ObjectId, obj: Partial<IRole>): Promise<IRole | null> {
        return await Role.findOneAndUpdate(
            { _id: id },
            { $set: obj },
            { returnOriginal: false }
        );
    },

    async deleteById(id: Types.ObjectId): Promise<IRole | null> {
        return await Role.findByIdAndRemove(id,{ lean: true });
    },

    async create(obj: IRoleCreate): Promise<IRole> {
        return new Role(obj).save();
    },
};