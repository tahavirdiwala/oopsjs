import express from "express";
import { EnvironmentMapper } from "./lib/env";
import { connectDB } from "./database/connect";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes(app);
start();

async function start() {
    try {
        await connectDB(EnvironmentMapper.MongoUri)
        app.listen(EnvironmentMapper.Port, () => {
            console.log("server is running at port " + EnvironmentMapper.Port);
        });
    } catch (error) {
        console.log(error);
    }
}
