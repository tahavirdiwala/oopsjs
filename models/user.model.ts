import mongoose, { Schema } from "mongoose";
import { TUser, TUserModel } from "../types/user";

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
      async findBy(field = {}) {
        try {
          const getUser = await this.findOne(field);

          const { password, ...user } = getUser?.toJSON() as TUser;

          return { password, user };
        } catch (error) {
          throw error;
        }
      },
    },
  }
);

const User = mongoose.model<TUser, TUserModel>("User", UserSchema);
export default User;
