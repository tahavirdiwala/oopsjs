import {
  Get,
  JsonController,
  Param,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { authMiddleware } from "../../auth/auth";
import { IUserAuthRequest } from "../../types/express.type";
import { ApiResponser } from "../../services/responser/response-handlers";

@JsonController("/users")
export class UserController {
  constructor(
    private userService: UserService,
    private handler: ApiResponser
  ) {}

  @Get("/")
  @UseBefore(authMiddleware())
  async getAll(@Req() req: IUserAuthRequest, @Res() res: Response) {
    const data = await this.userService.getAllUsers(req);
    return this.handler.responser(res, data);
  }

  @Get("/:id")
  async get(@Param("id") id: string, @Res() res: Response) {
    const user = await this.userService.getUser(id);
    return this.handler.responser(res, user);
  }
}
