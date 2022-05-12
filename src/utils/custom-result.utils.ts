export enum StatusCode {
  Success         = 200,
  Created         = 201,
  NoContent       = 204,
  BadRequest      = 400,
  Unauthorized    = 401,
  Forbidden       = 403,
  NotFound        = 404,
  ServerError     = 500,
}

export class CustomResult<T> {
  status: StatusCode;
  entity?: T;

  constructor(status: StatusCode, entity?: T) {
    this.status = status;
    this.entity = entity;
  }
}

