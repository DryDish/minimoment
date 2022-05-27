import { Response } from "express";

import { CustomResult, StatusCode } from "./custom-result.utils";

export const resultHandler = (name: string, result: CustomResult<any>, res: Response) => {
  switch (result.status) {
    case StatusCode.Success:
      return res.status(200).send(result.entity);
    case StatusCode.Created:
      return res.status(201).send(result.entity);
    case StatusCode.NoContent:
      return res.status(204).send();
    case StatusCode.BadRequest:
      return res.status(400).send({ status: 400, message: `Bad request for ${name}`, body: result.entity });
    case StatusCode.Unauthorized:
      return res.status(401).send({ status: 401, message: "Unauthorized."})
    case StatusCode.Forbidden:
      return res.status(403).send({ status: 403, message: "Forbidden."});
    case StatusCode.NotFound:
      return res.status(404).send({ status: 404, message: `${name} not found.` });
    case StatusCode.ServerError:
      return res.status(500).send({ status: 500, message: "Internal Server Error." });
    default:
      return res.status(500).send({ status: 500, message: "SOMETHING NOT IMPLEMENTED." });
  }
};
