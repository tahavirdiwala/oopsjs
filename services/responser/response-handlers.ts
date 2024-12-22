import { StatusCodes } from "../../lib/constant";
import { Response } from "express";
import { CustomError } from "./custom-error.service";

class ResponseHandlers {
  sendResponse<T>(
    message: string,
    data?: T,
    statusCode: number = StatusCodes.OK
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
}

class ApiResponser {
  responser<T>(res: Response, data?: T) {
    return res.json(data).end();
  }
}

export { ResponseHandlers, ApiResponser };
