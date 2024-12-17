import { Body, Get, JsonController, Post, Res } from "routing-controllers";
import { AuthService } from "../../services/auth/auth.service";
import { Response } from "express";
import { TUser } from "../../types/user";
import { ApiResponser } from "../../services/responser/response-handlers";

@JsonController("/auth")
export class AuthController {
  constructor(private auth: AuthService, private handler: ApiResponser) {}

  @Post("/register")
  async register(@Res() res: Response, @Body() payload: TUser) {
    const data = await this.auth.registerUser(payload);
    return this.handler.responser(res, data);
  }

  @Post("/")
  async login(@Res() res: Response, @Body() payload: TUser) {
    const data = await this.auth.loginUser(res, payload);
    return this.handler.responser(res, data);
  }

  @Get("/")
  async logout(@Res() res: Response) {
    const data = await this.auth.logOut(res);
    return this.handler.responser(res, data);
  }
}
