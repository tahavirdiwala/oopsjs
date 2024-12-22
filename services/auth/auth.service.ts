import { Service } from "typedi";
import { TUser, TUserChangePassword } from "../../types/user/user";
import User from "../../models/user.model";
import bcrypt, { compare } from "bcryptjs";
import { JwtConfig, PassWordConfig, StatusCodes } from "../../lib/constant";
import { env } from "../../lib/env";
import { createTokenFor, hashField, verifyToken } from "../../auth/jwt";
import { Response } from "express";
import { ResponseHandlers } from "../responser/response-handlers";
import { ResponseMessages } from "../../lib/constant/messages";
import nodemailer from "nodemailer";

@Service()
export class AuthService {
  constructor(private handler: ResponseHandlers) {}
  private messages = ResponseMessages.auth;

  async registerUser(payload: TUser) {
    try {
      const userExist = await User.findOne({ email: payload.email });

      if (userExist) return this.handler.catchHandler(this.messages.userExist);
      else {
        const salt = await bcrypt.genSalt(PassWordConfig.Range);

        const registerUserPayload = {
          ...payload,
          password: await bcrypt.hash(payload.password, salt),
        };

        const user = await User.create(registerUserPayload);
        return this.handler.sendResponse(
          this.messages.register,
          user,
          StatusCodes.CREATED
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
            maxAge: JwtConfig.MaxAge, // expiry till 1 day
            httpOnly: true,
          });

          return this.handler.sendResponse(this.messages.login, currentUser);
        } else {
          return this.handler.catchHandler(this.messages.inCorrectPassword);
        }
      } else {
        return this.handler.catchHandler(this.messages.notFound);
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
          return this.handler.catchHandler(this.messages.passWordNotMatch);
        }
      } else {
        return this.handler.catchHandler(this.messages.notFound);
      }
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async forgotPassword(payload: Pick<TUser, "email">) {
    try {
      const getUser = await User.findBy({ email: payload.email });

      if (getUser) {
        const token = createTokenFor(getUser.user, env.JwtPasswordExpiry);

        const url = `${env.ClientUrl}/auth/reset-password/${token}`;

        const transporter = nodemailer.createTransport(
          this.messages.transporter
        );

        const options = {
          ...this.messages.receiver,
          text: this.messages.receiver.text(url),
          to: getUser.user.email,
        };

        await transporter.sendMail(options);

        return this.handler.sendResponse(this.messages.forgotPassword);
      } else {
        return this.handler.catchHandler(this.messages.notFound);
      }
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async resetPassword(token: string, payload: TUser) {
    try {
      if (payload.password) {
        const decode = verifyToken(token) as TUser;
        const user = await User.findOne({ email: decode.email });

        if (user) {
          const newPassword = await hashField(payload.password);

          user.password = newPassword;

          await user.save();

          return this.handler.sendResponse(this.messages.resetPassword);
        } else {
          return this.handler.catchHandler(this.messages.notFound);
        }
      } else {
        return this.handler.catchHandler(this.messages.providePassword);
      }
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
