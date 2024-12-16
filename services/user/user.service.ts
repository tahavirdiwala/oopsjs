import { Service } from "typedi";
import { ResponseHandlers } from "../../common/common";
import User from "../../models/user.model";
import { StatusCodes } from "../../lib/constant";

@Service()
export class UserService extends ResponseHandlers {
    async getAllUsers() {
        try {
            const data = await User.find();
            return this.sendResponse("Users fetched successfully", StatusCodes.OK, data);
        } catch (error) {
            return this.catchHandler(error as Error)
        }
    }
}
