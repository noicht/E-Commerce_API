import { Schema, model } from "mongoose";
import { ISize } from "../interfaces";

const SizeSchema = new Schema<ISize>(
  {
    name: {
      type: String,
      required: true
    },

  },
  { timestamps: true, versionKey: false }
);

const Size = model<ISize>("size", SizeSchema);

export { Size, SizeSchema };