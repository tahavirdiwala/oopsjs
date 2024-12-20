import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Res,
} from "routing-controllers";
import { AuthService } from "../../services/auth/auth.service";
import { Response } from "express";
import { TUser } from "../../types/user";
import { ApiResponser } from "../../services/responser/response-handlers";
import { UserChangePasswordValidation } from "../../dto/auth.validator";

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

  @Post("/change-password")
  async changePassword(
    @Body() payload: UserChangePasswordValidation,
    @Res() res: Response
  ) {
    const data = await this.auth.changePassword(payload);
    return this.handler.responser(res, data);
  }

  @Post("/forgot-password")
  async forgotPassword(@Body() payload: TUser, @Res() res: Response) {
    const data = await this.auth.forgotPassword(payload);
    return this.handler.responser(res, data);
  }

  @Post("/reset-password/:token")
  async resetPassword(
    @Param("token") token: string,
    @Body() payload: TUser,
    @Res() res: Response
  ) {
    const data = await this.auth.resetPassword(token, payload);
    return this.handler.responser(res, data);
  }
}
