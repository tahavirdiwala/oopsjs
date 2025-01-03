import { ValidationError } from "class-validator";
import * as express from "express";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { StatusCodes } from "../lib/constant";
import logger from "../decorators/logger";

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public error(
    error: HttpError & { errors: ValidationError },
    req: express.Request,
    res: express.Response
  ): void {
    if (
      Array.isArray(error.errors) &&
      error.errors[0] instanceof ValidationError
    ) {
      const exception = this.formatValidationError(error.errors);
      this.exception(res, "Invalid input", exception, StatusCodes.BAD_REQUEST);
    } else {
      logger.error({ ...error, message: error?.message });
      this.exception(res, error?.message, error, error.httpCode, "Err");
    }
  }

  private exception<T>(
    res: express.Response,
    message: string,
    error: T,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    type = "Validation Error"
  ) {
    res.status(statusCode).json({
      statusCode,
      type,
      message,
      error,
      data: null,
    });
  }

  private formatValidationError(errors: ValidationError[]) {
    return errors.map((item) => ({
      [item.property]: item.constraints,
    }));
  }
}
