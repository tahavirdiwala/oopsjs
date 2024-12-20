import { Response, NextFunction, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "../decorators/logger";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "after" })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request & { id: string }, res: Response, next: NextFunction) {
    req.id = uuidv4();
    logger.info(`Incoming request ${req.method} ${req.path}`, {
      requestId: req.id,
    });

    res.on("finish", () => {
      logger.info(
        `Request completed ${req.method} ${req.path} - ${res.statusCode}`,
        { requestId: req.id }
      );
    });

    next();
  }
}
