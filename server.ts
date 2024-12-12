import express from "express";
import { env } from "./lib/env";
import { connectDB } from "./database/connect";
import { expressLoader as app } from "./loaders/express.loader";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

start();

async function start() {
  try {
    await connectDB(env.MongoUri);
    app.listen(env.Port, () => {
      console.log("server is running at port " + env.Port);
    });
  } catch (error) {
    console.log(error);
  }
}
