import { HttpError } from "routing-controllers";

export class CustomError extends HttpError {
  constructor(httpCode: number, message: string) {
    super(httpCode, message);
  }

  toJSON() {
    return {
      statusCode: this.httpCode,
      type: "Err",
      message: this.message,
    };
  }
}
