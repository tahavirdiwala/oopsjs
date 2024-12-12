import { connect } from "mongoose";

const connectDB = (url: string) => {
  try {
    return connect(url).then(() => {
      console.log("database connected");
    });
  } catch (error) {
    console.log("error", error);
  }
};

export { connectDB };
