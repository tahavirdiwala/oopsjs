import { Response } from "express";

export class ResponseHandlers {
  sendResponse<T>(
    res: Response,
    statusCode: number,
    message: string | Error,
    data?: T
  ) {
    return res.status(statusCode).json({ statusCode, message, data });
  }
}
