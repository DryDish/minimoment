import { Response } from "express";

export const sendErrorResponse = (
  response: Response,
  message?: string,
  status?: number,
  error?: unknown
): void => {
  if (error) {
    console.error(error);
  }

  response.status(status || 500).send({
    error: status,
    message: message || "Bad request.",
  });
};
