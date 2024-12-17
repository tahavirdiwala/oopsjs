import { Request } from "express";

export interface IUserAuthRequest extends Request {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
