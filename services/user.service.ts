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

  async getAllUsers() {
    return new Promise((resolve, reject) => {
      User.find().then(resolve).catch(reject);
    });
  }

  async deleteUser(id: string) {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ _id: id });
      if (!user) reject("User does not exist");
      User.findByIdAndDelete(id).then(resolve).catch(reject);
    });
  }
}
