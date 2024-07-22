import { Router } from 'express';
import { QR } from '../controllers/qrController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = Router();

// router.get("/",authCheck(), checkRol(["user","asistente","organizador"]), QR.getQr);
router.get("/", QR.getQr);

// router.post("/qrInscription", authCheck(), checkRol(["user","asistente","organizador"]), QR.qrInscription);
router.post("/qrInscription", QR.qrInscription);

export default router;