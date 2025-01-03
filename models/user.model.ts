import mongoose, { Schema } from "mongoose";
import { TUser, TUserModel } from "../types/user/user";
import { statics as userStaticMethods } from "../utils/statics/user/user.static";

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: Number,
      index: true,
      unique: true,
    },
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
    statics: {
      ...userStaticMethods,
    },
  }
);

const User = mongoose.model<TUser, TUserModel>("User", UserSchema);
export default User;
