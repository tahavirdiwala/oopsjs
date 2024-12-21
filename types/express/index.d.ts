import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      id: string;
      user: {
        _id: string;
        firstName: string;
        email: string;
      };
    }
  }
}
