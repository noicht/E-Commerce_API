import { Upload } from "../models";
import { IUpload } from "../interfaces";
import { _FilterQuery, Types } from "mongoose";

export const uploadRepo = {
    async find(filter?: _FilterQuery<IUpload>) {
        const filters = filter ?? {};
        return await Upload.find(filters);
    },

    async findById(id: string): Promise<IUpload | null> {
        return Upload.findOne({ _id: id });
    },

    async updateById(id: Types.ObjectId, obj: Partial<IUpload>): Promise<IUpload | null> {
        return await Upload.findOneAndUpdate(
            { _id: id },
            { $set: obj },
            { returnOriginal: false }
        );
    },

    async deleteById(id: Types.ObjectId): Promise<IUpload | null> {
        return await Upload.findByIdAndRemove(id,{ lean: true });
    },

    async create(obj: IUpload): Promise<IUpload> {
        return new Upload(obj).save();
    },
};