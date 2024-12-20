import mongoose from "mongoose";

type TOrder = Document & {
  _id: mongoose.Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  status: string;
  ordersId: number;
};

export { TOrder };
