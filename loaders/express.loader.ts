import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { env } from "../lib/env";
import { Application } from "express";
import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from "microframework-w3tec";
import express from "express";
import { getOsPaths } from "../utils";

const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const app: Application = createExpressServer({
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
      classTransformer: true,
      routePrefix: env.RoutePrefix,
      defaultErrorHandler: false,
      controllers: getOsPaths("Controllers"),
      middlewares: getOsPaths("Middlewares"),
      validation: { validationError: { target: false } },
    });

    app.use(express.json());

    const server = app.listen(env.Port);
    settings.setData("express_server", server);
  }
};

export { expressLoader };
