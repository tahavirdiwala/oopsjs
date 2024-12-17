import { Get, JsonController, Req, Res, UseBefore } from "routing-controllers";
import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { authMiddleware } from "../../auth/auth";
import { IUserAuthRequest } from "../../types/express.type";
import { ResponseHandler } from "../../services/responser/response-handlers";

@JsonController("/users")
export class UserController {
  constructor(
    private userService: UserService,
    private responser: ResponseHandler
  ) {}

  @Get("/")
  @UseBefore(authMiddleware())
  async getAll(@Req() req: IUserAuthRequest, @Res() res: Response) {
    const data = await this.userService.getAllUsers(req);
    return this.responser.apiResponser(res, data);
  }
}
