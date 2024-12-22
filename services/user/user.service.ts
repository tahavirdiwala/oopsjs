import { Service } from "typedi";
import User from "../../models/user.model";
import { StatusCodes } from "../../lib/constant";
import { IUserAuthRequest } from "../../types/express/express.type";
import { ResponseHandlers } from "../responser/response-handlers";
import { ResponseMessages } from "../../lib/constant/messages";

@Service()
export class UserService {
  constructor(private handler: ResponseHandlers) {}
  private messages = ResponseMessages.user;

  async getAllUsers(req: IUserAuthRequest) {
    try {
      const users = await User.find();
      return this.handler.sendResponse(this.messages.getAll, users);
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async getUser(_id: string) {
    try {
      const user = await User.findOne({ _id });
      return this.handler.sendResponse(this.messages.get, user);
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
