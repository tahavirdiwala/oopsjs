import { JsonController, Post } from "routing-controllers";
import { UserService } from "../services/user.service";
import { TUser } from "../types/user";

@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/create")
  async createCustomer(user: TUser, res: Response) {
    const data = await this.userService.createUser(user);
    console.log(data);
  }
}
