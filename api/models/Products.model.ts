import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces";
import { CategorySchema } from "./Category.model";

const ProductsSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size:{
      type: String,
      required: true,
    },
    images: {
        type: [String],
        required: true
    },
    stock: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    stockAvailable: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
    },
    bar_code: {
      type: String,
    },
    bulk: {
      type: new Schema({
        quantity_prod: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      }),
    },
  },
  { timestamps: true, versionKey: false }
);

const Products = model<IProduct>("products", ProductsSchema);

export { Products, ProductsSchema };
