import mongoose from "mongoose";

type TOrder = {
  _id: mongoose.Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  status: string;
};

export { TOrder };
