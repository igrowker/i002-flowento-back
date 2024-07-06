import { Router } from 'express';
import { Event } from '../controllers/eventController.js';

const router = Router();

router.get("/", Event.getEvents);

router.get("/:id", Event.getEventById);

router.post("/", Event.createEvent);

router.put("/:id", Event.updateEvent);

router.delete("/:id", Event.deleteEvent);

router.post("/register", Event.registerForEvent);

router.put("/attend", Event.confirmAttendance);

router.post("", Event.submitFeedback);

export default router;