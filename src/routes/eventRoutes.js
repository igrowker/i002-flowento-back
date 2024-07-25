import { Router } from 'express';
import { Event } from '../controllers/eventController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';
import { authCheck } from '../middlewares/authMiddleware.js';
import {uploader} from '../middlewares/uploader.js';

const router = Router();

// router.get("/", authCheck(), Event.getEvents);
router.get("/", Event.getEvents);

router.get("/:id", authCheck(), Event.getEventById);
// router.get("/:id", Event.getEventById);

//uploader.single("file") tiene q coincidir este nombre con el del input
// router.post("/", authCheck(),checkRol(["admin","organizador"]), uploader.single("file") ,Event.createEvent);
// router.post("/", uploader.single("file"), Event.createEvent);
router.post("/", Event.createEvent);

router.put("/:id", authCheck(), checkRol(["organizador"]), Event.updateEvent);
// router.put("/:id", Event.updateEvent);

router.delete("/:id",authCheck(), checkRol(["admin"]),Event.deleteEvent);
// router.delete("/:id", Event.deleteEvent);

// router.post("/register",authCheck(), Event.registerForEvent);
router.post("/register", Event.registerForEvent);

router.put("/attend",authCheck(), Event.confirmAttendance);
// router.put("/attend/:id", Event.confirmAttendance);

router.post("/feedback",authCheck(), Event.submitFeedback);
// router.post("/feedback/:id", Event.submitFeedback);

export default router;