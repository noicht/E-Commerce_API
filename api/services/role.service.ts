import { roleRepo } from "../repositories";
import { IRole, IRoleCreate, IRoleUpload } from "../interfaces"
import { Types } from "mongoose";

export const getRoleService = async (): Promise<IRole | IRole[]> => {
    const roles = await roleRepo.find({ isDeleted: false });
    return roles;
}

export const createRoleService = async (data: IRoleCreate): Promise<IRole> => {
    const role = await roleRepo.create(data);
    return role;
}

export const uploadRoleService = async (data: IRoleUpload): Promise<IRole | null> => {
    const { id, name, code } = data
    const roleUpdate = await roleRepo.updateById(id, { name, code });
    return roleUpdate
}

export const deleteRoleService = async (id: Types.ObjectId) => {
    const roleUpdate = await roleRepo.updateById(id, { isDeleted: true });
    return roleUpdate
}