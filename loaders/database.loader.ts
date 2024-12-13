import mongoose from "mongoose";
import { env } from "../lib/env";

export default () => {
  const mongoConnect = () => {
    mongoose
      .connect(`${env.MongoUri}`)
      .then(() => {
        return console.info(`Successfully connected to DB `);
      })
      .catch((error) => {
        console.log(error);
        return process.exit(1);
      });
  };
  mongoConnect();
  mongoose.connection.on("disconnected", mongoConnect);
};
