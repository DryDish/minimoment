import { NextFunction, Request, Response } from "express";
import { CustomResult, StatusCode } from "../utils/custom-result.utils";
import { resultHandler } from "../utils/response-handler.utils";

const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (id && id.length !== 24) {
    const result = new CustomResult(
      StatusCode.BadRequest,
      `Mongo IDs must be 24 chars long. The provided ID was of length: ${id.length}`
    );
    const name = req.baseUrl.split("/").pop();
    resultHandler(`/${name}/:id`, result, res);
  } else {
    next();
  }
};

export { validateId };
