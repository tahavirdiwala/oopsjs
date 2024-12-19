import mongoose from "mongoose";
import { TUser } from "../../../types/user";

const statics = {
  async findBy(this: mongoose.Model<TUser>, field = {}) {
    try {
      const getUser = await this.findOne(field);

      const { password, ...user } = getUser?.toJSON() as TUser;

      return { password, user };
    } catch (error) {
      throw error;
    }
  },
};

export { statics };
