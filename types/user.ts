import { Document } from "mongoose";

type TUser = Document & {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
};

export { TUser };
