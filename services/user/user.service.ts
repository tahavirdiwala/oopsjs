import { Service } from "typedi";
import User from "../../models/user.model";
import { StatusCodes } from "../../lib/constant";
import { IUserAuthRequest } from "../../types/express.type";
import { ResponseHandlers } from "../responser/response-handlers";

@Service()
export class UserService {
  constructor(private handler: ResponseHandlers) {}

  async getAllUsers(req: IUserAuthRequest) {
    try {
      const data = await User.find();
      return this.handler.sendResponse(
        "Users fetched successfully",
        StatusCodes.OK,
        data
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
