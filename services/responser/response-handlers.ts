import { StatusCodes } from "../../lib/constant";
import { CustomError } from "../../exception";
import { Response } from "express";

class ResponseHandlers {
  sendResponse<T>(
    message: string,
    statusCode: number = StatusCodes.OK,
    data?: T
  ) {
    return { statusCode, message, data };
  }

  catchHandler(
    dispatch: string | Error,
    statusCode: number = StatusCodes.BAD_REQUEST
  ) {
    if (dispatch instanceof Error) dispatch = dispatch.message;
    throw new CustomError(statusCode, dispatch);
  }

  apiResponser<T>(res: Response, data?: T) {
    return res.json(data).end();
  }
}

export { ResponseHandlers };
