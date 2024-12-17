import { Service } from "typedi";
import { ResponseHandlers } from "../responser/response-handlers";
import { TUser } from "../../types/user";
import User from "../../models/user.model";
import bcrypt, { compare } from "bcryptjs";
import { PassWordConfig, StatusCodes } from "../../lib/constant";
import { env } from "../../lib/env";
import { createTokenFor } from "../../auth/jwt";
import { Response } from "express";

@Service()
export class AuthService extends ResponseHandlers {
  async registerUser(payload: TUser) {
    try {
      const userExist = await User.findOne({ email: payload.email });

      if (userExist) return this.catchHandler("User already exist try login");
      else {
        const salt = await bcrypt.genSalt(PassWordConfig.Range);

        const registerPayload = {
          ...payload,
          password: await bcrypt.hash(payload.password, salt),
        };

        const user = await User.create(registerPayload);
        return this.sendResponse(
          "User created successfully",
          StatusCodes.CREATED,
          user
        );
      }
    } catch (error) {
      return this.catchHandler(error as Error);
    }
  }

  async loginUser(res: Response, payload: Pick<TUser, "email" | "password">) {
    try {
      const user = await User.findOne({ email: payload.email });

      if (user) {
        const validPassword = await compare(payload.password, user.password);

        if (validPassword) {
          const { password, ...currentUser } = user.toJSON();

          const withExpiry = env.JwtExpiry;
          const token = createTokenFor(currentUser, withExpiry);

          res.cookie("jwt", token, {
            maxAge: 12 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
          });

          return this.sendResponse(
            "User login successfully",
            StatusCodes.OK,
            currentUser
          );
        } else {
          return this.catchHandler("Password is incorrect");
        }
      } else {
        return this.catchHandler("User does not exist please register");
      }
    } catch (error) {
      return this.catchHandler(error as Error);
    }
  }

  async logOut(res: Response) {
    try {
      res.clearCookie("jwt");
      return this.sendResponse("User logout successfully");
    } catch (error) {
      return this.catchHandler(error as Error);
    }
  }
}
