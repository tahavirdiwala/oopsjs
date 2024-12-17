import { ValidationError } from "class-validator";
import * as express from "express";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { StatusCodes } from "../lib/constant";

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public error(
    error: HttpError & { errors: any },
    req: express.Request,
    res: express.Response
  ): void {

    if (Array.isArray(error.errors) && error.errors[0] instanceof ValidationError) {
      const exception = this.formatValidationError(error.errors);
      this.commonException(res, "Invalid input", exception, StatusCodes.BAD_REQUEST)
    } else {
      this.commonException(res, error?.message, error, error.httpCode, "Err")
      console.log(error.name, error.message, error.stack);
    }
  }

  private commonException<T>(res: express.Response, message: string, error: T, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR, type = "Validation Error") {
    res.status(statusCode).json({
      status: statusCode,
      type,
      message,
      error,
      data: null
    })
  }

  private formatValidationError(erros: Pick<ValidationError, "property" | "constraints">[]): Record<string, any>[] {
    return erros.map((item) => ({ property: item.property, constraints: item.constraints }));
  }
}
