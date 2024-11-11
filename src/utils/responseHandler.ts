// responseHandler.ts
import { Response } from 'express';

export function sendResponse(res: Response, statusCode: number, data: object) {
  if (!res.headersSent) {
    // Check if headers are already sent
    res.status(statusCode).json(data);
  }
}
