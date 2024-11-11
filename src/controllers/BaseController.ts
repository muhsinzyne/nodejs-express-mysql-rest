// src/controllers/BaseController.ts
import { Response } from 'express';

export abstract class BaseController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handleError(res: Response, error: any) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'An error occurred', error });
  }
}
