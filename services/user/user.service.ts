import { Service } from "typedi";
import User from "../../models/user.model";
import { StatusCodes } from "../../lib/constant";
import { IUserAuthRequest } from "../../types/express.type";
import { ResponseHandlers } from "../responser/response-handlers";
import { ResponseMessages } from "../../lib/constant/messages";

@Service()
export class UserService {
  constructor(private handler: ResponseHandlers) { }
  private messages = ResponseMessages.user;

  async getAllUsers(req: IUserAuthRequest) {
    try {
      throw new Error("this is an error");
      const users = await User.find();
      return this.handler.sendResponse(
        this.messages.getAll,
        StatusCodes.OK,
        users
      );
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }

  async getUser(_id: string) {
    try {
      const user = await User.findOne({ _id });
      return this.handler.sendResponse(this.messages.get, StatusCodes.OK, user);
    } catch (error) {
      return this.handler.catchHandler(error as Error);
    }
  }
}
