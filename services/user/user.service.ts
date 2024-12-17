import { Service } from "typedi";
import { ResponseHandlers } from "../responser/response-handlers";
import User from "../../models/user.model";
import { StatusCodes } from "../../lib/constant";
import { IUserAuthRequest } from "../../types/express.type";

@Service()
export class UserService extends ResponseHandlers {
  async getAllUsers(req: IUserAuthRequest) {
    try {
      const data = await User.find();
      return this.sendResponse(
        "Users fetched successfully",
        StatusCodes.OK,
        data
      );
    } catch (error) {
      return this.catchHandler(error as Error);
    }
  }
}
