import { Router } from 'express';
import { Admin } from '../controllers/adminController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = Router();

// router.get("/events", authCheck(),checkRol(["admin"]), Admin.getAllEvents);
router.get("/events", Admin.getPendingEvents);

// router.put("/events/aprove/:id", authCheck(),checkRol(["admin"]), Admin.approveEvent);
router.put("/events/aprove/:id", Admin.approveEvent);

// router.get("/reports", authCheck(),checkRol(["admin"]), Admin.reportEvent);
router.get("/reports", Admin.reportEvent);

export default router;
