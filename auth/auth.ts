import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";

function checkUserAuthentication(req: any, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, env.JwtSecret, (error: any, tokenResponse: any) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          throw new Error("Unauthorized - Token has expired");
        } else {
          throw new Error("Unauthorized - " + error.message);
        }
      } else {
        console.log("tokenResponse", tokenResponse);

        req.user = {
          _id: tokenResponse._id,
          name: tokenResponse.name,
          email: tokenResponse.email,
        };
      }
    });
  } else {
    throw new Error("Unauthorized - Session has expired please login again");
  }
  next();
}

export { checkUserAuthentication };
