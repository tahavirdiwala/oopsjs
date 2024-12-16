import { Service } from "typedi";
import { ResponseHandlers } from "../../common/common";
import { TUser } from "../../types/user";
import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import { PassWordConfig, StatusCodes } from "../../lib/constant";

@Service()
export class AuthService extends ResponseHandlers {
    async registerUser(payload: TUser) {
        try {
            const userExist = await User.findOne({ email: payload.email });

            if (userExist) return this.catchHandler("User already exist try login");
            else {
                const salt = await bcrypt.genSalt(PassWordConfig.Range);
                const registerPayload = { ...payload, password: await bcrypt.hash(payload.password, salt) }
                const user = await User.create(registerPayload);
                return this.sendResponse("User created successfully", StatusCodes.CREATED, user)
            }

        } catch (error) {
            return this.catchHandler(error as Error)
        }

    }
}