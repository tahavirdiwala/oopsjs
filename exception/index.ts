import { HttpError } from "routing-controllers";

export class customError extends HttpError {
    constructor(httpCode: number, message: string) {
        super(httpCode, message)
    }
}