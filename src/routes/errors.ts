import { Express } from 'express';
import { StatusCodes } from '../constants/StatusCodes';
export default function setErrors(app: Express) {
  app.use((req, res) => {
    res.status(StatusCodes.HTTP_NOT_FOUND).json({
      message: `Cannot GET ${req.originalUrl}`,
      status: StatusCodes.HTTP_NOT_FOUND,
    });
  }); // Main API routes
}
