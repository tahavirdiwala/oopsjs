import { Service } from "typedi";
import { ResponseHandlers } from "../../common/common";
import { TUser } from "../../types/user";
import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import { PassWordConfig } from "../../lib/constant";

@Service()
export class AuthService {
    constructor(
        private responer: ResponseHandlers
    ) { }
    async register(payload: TUser) {
        return new Promise(async (resolve, reject) => {
            try {
                const userExist = await User.findOne({ email: payload.email });

                if (userExist) reject("User already exist try login");
                else {
                    const salt = await bcrypt.genSalt(PassWordConfig.Range);
                    const registerPayload = { ...payload, password: await bcrypt.hash(payload.password, salt) }
                    User.create(registerPayload).then(resolve).catch(reject);
                }

            } catch (error) {
                reject(error);
            }
        })
    }
}