import { Body, Get, JsonController, Post, Res } from "routing-controllers";
import { AuthService } from "../../services/auth/auth.service";
import { Response } from "express";
import { TUser } from "../../types/user";
import { ResponseHandler } from "../../services/responser/response-handlers";

@JsonController("/auth")
export class AuthController {
  constructor(private auth: AuthService, private responser: ResponseHandler) {}

  @Post("/register")
  async register(@Res() res: Response, @Body() payload: TUser) {
    const data = await this.auth.registerUser(payload);
    return this.responser.apiResponser(res, data);
  }

  @Post("/")
  async login(@Res() res: Response, @Body() payload: TUser) {
    const data = await this.auth.loginUser(res, payload);
    return this.responser.apiResponser(res, data);
  }

  @Get("/")
  async logout(@Res() res: Response) {
    const data = await this.auth.logOut(res);
    return this.responser.apiResponser(res, data);
  }
}
