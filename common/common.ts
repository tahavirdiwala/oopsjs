import { Response } from "express";

class ResponseHandlers {
  sendResponse<T>(
    res: Response,
    statusCode: number,
    dispatch: string | Error,
    data?: T
  ) {
    if (dispatch instanceof Error) dispatch = dispatch['message'];
    return res.status(statusCode).json({ statusCode, message: dispatch, data });
  }
}

export { ResponseHandlers }