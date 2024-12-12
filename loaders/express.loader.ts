import { createExpressServer } from "routing-controllers";
import { env } from "../lib/env";
import { Application } from "express";
import { getOsPaths } from "../utils";

const expressLoader: Application = createExpressServer({
  cors: true,
  classTransformer: true,
  routePrefix: env.RoutePrefix,
  defaultErrorHandler: false,
  controllers: getOsPaths("Controllers"),
  middlewares: getOsPaths("Middlewares"),
  validation: { validationError: { target: false } },
});

export { expressLoader };
