import { Schema, model } from 'mongoose';
import { IRetail } from '../interfaces';

const RetailSchema = new Schema<IRetail>({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
},
  { timestamps: true, versionKey: false });
const Retail = model<IRetail>("retail", RetailSchema);

export { Retail, RetailSchema };
