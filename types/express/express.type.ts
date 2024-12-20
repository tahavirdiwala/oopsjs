import { Request } from "express";

interface IUserAuthRequest extends Request {
  user: {
    _id: string;
    firstName: string;
    email: string;
  };
}

export { IUserAuthRequest };
