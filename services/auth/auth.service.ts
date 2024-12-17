import { Service } from "typedi";
import { TUser, TUserChangePassword } from "../../types/user";
import User from "../../models/user.model";
import bcrypt, { compare } from "bcryptjs";
import { PassWordConfig, StatusCodes } from "../../lib/constant";
import { env } from "../../lib/env";
import { createTokenFor, hashField } from "../../auth/jwt";
import { Response } from "express";
import { ResponseHandlers } from "../responser/response-handlers";
import { ResponseMessages } from "../../lib/constant/messages";
import { validate } from "class-validator";
import { UserChangePasswordValidation } from "../../utils/validators/auth/auth.validator";

@Service()
export class AuthService {
  constructor(private handler: ResponseHandlers) { }
  private messages = ResponseMessages.auth;

  async registerUser(payload: TUser) {
    try {
      const userExist = await User.findOne({ email: payload.email });

      if (userExist)
        return this.handler.catchHandler("User already exist try login");
      else {
        const salt = await bcrypt.genSalt(PassWordConfig.Range);

        const registerPayload = {
          ...payload,
          password: await bcrypt.hash(payload.password, salt),
        };

        const user = await User.create(registerPayload);
        return this.handler.sendResponse(
          this.messages.register,
          StatusCodes.CREATED,
          user
        );
      }
    } catch (error) {
      return this.handler.catchHandler(error as Error);
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

          return this.handler.sendResponse(
            this.messages.login,
            StatusCodes.OK,
            currentUser
          );
        } else {
          return this.handler.catchHandler("Password is incorrect");
        }
      } else {
        return this.handler.catchHandler("User does not exist please register");
      }
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async logOut(res: Response) {
    try {
      res.clearCookie("jwt");
      return this.handler.sendResponse(this.messages.logout);
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async changePassword(payload: TUserChangePassword) {
    try {
      const user = await User.findOne({ email: payload.email });
      if (user) {
        const validPassword = await compare(
          payload.currentPassword,
          user.password
        );

        if (validPassword) {
          const hashedPassword = await hashField(payload.newPassword);

          await User.updateOne(
            { email: payload.email },
            { password: hashedPassword }
          );

          return this.handler.sendResponse(this.messages.changedPassword);
        } else {
          return this.handler.catchHandler("Current password does not match");
        }
      } else {
        return this.handler.catchHandler("User not found please register");
      }
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
