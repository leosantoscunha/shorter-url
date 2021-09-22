import { Request, Response, NextFunction } from "express";
import { Controller } from "../../protocols/Controller";

export const adaptRedirectRoute = (controller: Controller) => {
  return async (request: Request, res: Response, next: NextFunction) => {
    const { statusCode, body } = await controller.handle(request);

    if (statusCode >= 200 && statusCode <= 299) {
      const newUrl = (request.url = body.url);
      res.writeHead(301, { Location: newUrl });
      res.end();
    } else {
      res.status(statusCode).json({
        error: body.message,
      });
      next();
    }
  };
};
