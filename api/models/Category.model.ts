import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

const Category = model<ICategory>("categories", CategorySchema);

export { Category, CategorySchema };