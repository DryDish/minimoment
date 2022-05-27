import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { CustomResult, StatusCode } from "../utils/custom-result.utils";
import { resultHandler } from "../utils/response-handler.utils";

const validateId = (idName: string = "id") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[idName];

    try {
      if (id.length !== 24) {
        throw Error;
      }
      const _ = new Types.ObjectId(id);
      next();
    } catch (error) {
      const result = new CustomResult(
        StatusCode.BadRequest,
        `Invalid MongoDB id. Id provided: ${id}, provided id length: ${id.length}`
      );
      const name = req.baseUrl.split("/").pop();
      console.error(`ERROR: Invalid ID detected! ${id}`);
      resultHandler(`/${name}/:id`, result, res);
    }
  };
};

export { validateId };
