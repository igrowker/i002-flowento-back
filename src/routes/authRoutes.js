import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const router = Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get('/logout', AuthController.logout);

router.post('/recoverPassword', AuthController.revocerPassword);

router.post('/resetPassword', AuthController.resetPassword);

export default router;