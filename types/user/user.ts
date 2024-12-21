import { Document } from "mongoose";
import { TStatic } from "../statics/static";

type TUser = Document & {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
};

type TUserChangePassword = {
  email: string;
  currentPassword: string;
  newPassword: string;
};

type TSeparateUser = {
  user: Exclude<TUser, "password">;
  password: string;
};

type TUserModel = TStatic<TUser, TSeparateUser>;

export { TUser, TUserChangePassword, TUserModel };
