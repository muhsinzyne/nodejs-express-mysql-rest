import { Router } from 'express';
import { AuthController } from '../controllers/Admin/AuthController';

const adminApi = Router();

const authController = new AuthController();

//adminApi.get('/auth/login', authController.login.bind(authController));
//adminApi.get('/auth/login', (req, res) => authController.login(req, res));

adminApi.get('/auth/login', async (req, res) => {
  await authController.login(req, res);
});

// adminApi.get('/auth/login', authController.login);
export default adminApi;
