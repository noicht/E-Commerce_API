
import { Size } from "../models";
import { ISize } from "../interfaces";
import { _FilterQuery } from "mongoose";

export const sizeRepo = {
    async find(filter: _FilterQuery<ISize> = {}) {
        const filters = filter ?? {};
        return await Size.find(filters).exec();
    },

};
