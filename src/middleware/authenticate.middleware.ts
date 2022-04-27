import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Constants
const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

export default (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(" ")[1] : null;

  if (token === null) {
    res.status(401).send("Unauthorized");
  } else {
    jwt.verify(token, SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).send("Forbidden");
      }

      next();
    });
  }
};
