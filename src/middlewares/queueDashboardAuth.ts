import { Request, Response, NextFunction } from 'express';
import { AppRouteValues } from '../constants/AppRouteValues';

export const queueIsSecuredWithAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(AppRouteValues.QUEUE_DASH_LOGIN); // Redirect to login if not authenticated
};
