import { Schema, model } from "mongoose";
import { ISubscriber } from "../interfaces";

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Subscriber = model<ISubscriber>("subscribers", SubscriberSchema);

export { Subscriber, SubscriberSchema };
