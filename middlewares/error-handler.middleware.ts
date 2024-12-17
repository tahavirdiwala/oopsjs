import * as express from "express";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public error(
    error: HttpError,
    req: express.Request,
    res: express.Response
  ): void {
    res.status(error.httpCode || 500);
    res.json({
      status: error.httpCode,
      type: "Err",
      message: error?.message,
      error: {
        message: error?.message,
        code: error?.httpCode,
      },
      data: null,
    });

    console.log(error.name, error.message, error.stack);
  }
}
