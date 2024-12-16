import { JsonController } from "routing-controllers";
import { UserService } from "../../services/user/user.service";

@JsonController("/users")
export class UserController {
  constructor(
    private userService: UserService,
  ) { }


}
