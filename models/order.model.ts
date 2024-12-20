import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
