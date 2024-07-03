import { Router } from 'express';
import { Admin } from '../controllers/adminController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';

const router = Router();

// router.get("/events", checkRol(["admin"]), Admin.getAllEvents);
router.get("/events", Admin.getAllEvents);

// router.put("/events/aprove/:id", checkRol(["admin"]), Admin.approveEvent);
router.put("/events/aprove/:id", Admin.approveEvent);

router.get("/reports", checkRol(["admin"]), Admin.reportEvent);

export default router;
