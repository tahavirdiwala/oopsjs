import mongoose, { Schema } from "mongoose";
import { TUser, TUserModel } from "../types/user";
import { statics as userStaticMethods } from "../utils/statics/user.static";

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
    statics: {
      ...userStaticMethods,
    },
  }
);

const User = mongoose.model<TUser, TUserModel>("User", UserSchema);
export default User;
