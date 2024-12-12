import "reflect-metadata";
import express from "express";
import { env } from "./lib/env";
import { connectDB } from "./database/connect";
import { app } from "./loaders/express.loader";
import Container from "typedi";
import { useContainer } from "routing-controllers";

app.use(express.json());

start();


async function start() {
    try {
        await connectDB(env.MongoUri);

    } catch (error) {
        console.log(error);
    }
}
