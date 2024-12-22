import { Response, NextFunction } from "express";
import { IUserAuthRequest } from "../types/express/express.type";
import { verifyToken } from "./jwt";
import { TUser } from "../types/user/user";

function authMiddleware(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["cookie"];
  const token = authHeader?.split("=")[1];

  if (token) {
    verifyToken(token, (error, tokenResponse) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          throw new Error("Unauthorized - Token has expired");
        } else {
          throw new Error("Unauthorized - " + error.message);
        }
      } else {
        tokenResponse = tokenResponse as TUser;
        req.user = {
          _id: tokenResponse._id,
          firstName: tokenResponse.firstName,
          email: tokenResponse.email,
        };
      }
    });
  } else {
    throw new Error("Unauthorized - Session has expired please login again");
  }
  return next();
}

export { authMiddleware };
