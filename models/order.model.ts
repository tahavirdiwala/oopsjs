import mongoose, { Schema } from "mongoose";
import { TOrder } from "../types/order/order";

const OrderSchema = new Schema<TOrder>(
  {
    id: {
      type: Number,
      index: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "checkout", "canceled", "failed"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<TOrder>("Order", OrderSchema);
export default Order;
