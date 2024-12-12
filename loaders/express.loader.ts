import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { env } from "../lib/env";
import { Application } from "express";
import { UserController } from "../controllers/user.controller";
import { useContainer } from "routing-controllers";
import { Container } from "typedi";

useContainer(Container);

const app: Application = createExpressServer({
    cors: true,
    classTransformer: true,
    routePrefix: env.RoutePrefix,
    defaultErrorHandler: false,
    controllers: [UserController],
    validation: { validationError: { target: false } },
});

app.listen(env.Port, () => {
    console.log("server is running at port " + env.Port);
});

export { app };
