// import { StatusCodes } from '../../constants/StatusCodes';
import { StatusCodes } from '../../constants/StatusCodes';
import { sendResponse } from '../../utils/responseHandler';
import { BaseAdminController } from './BaseAdminController';
import { Request, Response } from 'express';

export class AuthController extends BaseAdminController {
  async login(req: Request, res: Response) {
    try {
      const requiredFields: string[] = ['username', 'test1'];
      const fields = req.body;
      // Check for missing required fields using Object.prototype.hasOwnProperty.call()
      const missingFields: string[] = requiredFields.filter(
        (field) => !Object.prototype.hasOwnProperty.call(fields, field)
      );
      if (missingFields.length > 0) {
        return res.status(200).json({
          status: true,
          message: 'User Unique Identifier updated successfully.',
        });
      }

      sendResponse(res, StatusCodes.HTTP_BAD_REQUEST, {
        status: false,
        message: 'Test!',
      });
    } catch (error) {
      console.log('test!!!');
      console.log(error);
      //this.handleError(res, error);
    }
  }
}
