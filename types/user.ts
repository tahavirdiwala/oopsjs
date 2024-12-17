import { Document } from "mongoose";

type TUser = Document & {
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

export { TUser, TUserChangePassword };
