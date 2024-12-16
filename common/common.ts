import { Response } from "express";

class ResponseHandlers {
  sendResponse<T>(
    res: Response,
    statusCode: number,
    message: string | Error,
    data?: T
  ) {
    if (message instanceof Error) message = message['message'];
    return res.status(statusCode).json({ statusCode, message, data });
  }
}

export { ResponseHandlers }