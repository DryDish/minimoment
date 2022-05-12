import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendErrorResponse } from "../utils/responses.utils";

// Constants
const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

export default (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(" ")[1] : null;  

  if (token === null) {
    sendErrorResponse(res, "Unauthorized.", 401);
  } else {
    jwt.verify(token, SECRET_KEY, (error, _) => {
      if (error) {
        sendErrorResponse(res, "Forbidden.", 403);
        return;
      }
      next();
    });
  }
};
