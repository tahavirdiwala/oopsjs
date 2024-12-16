import { JsonController, Res } from "routing-controllers";
import { UserService } from "../../services/user/user.service";
import { ResponseHandlers } from "../../common/common";
import { Response } from "express";

@JsonController("/users")
export class UserController {
  constructor(
    private userService: UserService,
    private responser: ResponseHandlers,
  ) { }
  async getAll(@Res() res: Response) {
    const data = await this.userService.getAllUsers();
    return this.responser.apiResponser(res, data)
  }

}
