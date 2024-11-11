import { Response } from 'express';
import { StatusCodes } from '../constants/StatusCodes';

export class Rest {
  static respond(
    res: Response,
    message: string,
    data: object = {},
    statusCode: number = StatusCodes.HTTP_OK
  ) {
    if (!res.headersSent) {
      // Ensure headers are not sent already
      const response = {
        status: statusCode >= 200 && statusCode < 300,
        message,
        data,
      };
      return res.status(statusCode).json(response);
    }
  }

  static success(
    res: Response,
    message: string,
    data: object = {},
    statusCode: number = StatusCodes.HTTP_OK
  ) {
    return this.respond(res, message, data, statusCode);
  }

  static error(
    res: Response,
    message: string,
    data: object = {},
    statusCode: number = StatusCodes.HTTP_BAD_REQUEST
  ) {
    return this.respond(res, message, data, statusCode);
  }
}
