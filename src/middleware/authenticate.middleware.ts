import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomResult, StatusCode } from "../utils/custom-result.utils";
import { resultHandler } from "../utils/response-handler.utils";

// Constants
const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

export default (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(" ")[1] : null;

  if (token === null) {
    resultHandler("Forbidden", new CustomResult(StatusCode.Unauthorized), res);
  } else {
    jwt.verify(token, SECRET_KEY, (error, _) => {
      if (error) {
        resultHandler("Forbidden", new CustomResult(StatusCode.Forbidden), res);
        return;
      }
      next();
    });
  }
};