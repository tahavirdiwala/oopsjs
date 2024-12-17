import mongoose, { Schema } from "mongoose";
import { TUser } from "../types/user";

const UserSchema = new Schema<TUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<TUser>("User", UserSchema);

export default User;
