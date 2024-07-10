import { Router } from 'express';
import { QR } from '../controllers/qrController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = Router();

router.post("/", authCheck(), checkRol(["user","asistente","organizador"]), User.allUsers);

export default router;