import { Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import { env } from "../lib/env";

function authMiddleware() {
  return (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers["cookie"];
    const token = authHeader?.split("=")[1];

    if (token) {
      jwt.verify(token, env.JwtSecret, (error: any, tokenResponse: any) => {
        if (error) {
          if (error.name === "TokenExpiredError") {
            throw new Error("Unauthorized - Token has expired");
          } else {
            throw new Error("Unauthorized - " + error.message);
          }
        } else {
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
  };
}

export { authMiddleware };
