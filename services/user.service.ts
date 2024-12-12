import { Service } from "typedi";
import User from "../models/user.model";
import { TUser } from "../types/user";

@Service()
export class UserService {
  async createUser(userData: TUser) {
    return new Promise((resolve, reject) => {
      User.create(userData).then(resolve).catch(reject);
    });
  }
}
