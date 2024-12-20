import { Document, Model } from "mongoose";

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

type TUserModel = Model<TUser> & {
  findBy(field: Partial<TUser>): Promise<{
    user: Exclude<TUser, "password">;
    password: string;
  }>;
};

export { TUser, TUserChangePassword, TUserModel };
