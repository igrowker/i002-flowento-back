import { Router } from 'express';
import { Space } from '../controllers/spaceController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = Router();

// para probar de momento mientras se termina el login del front no se le pone el middleware q chekea q solo el admin puede acceder a este endpoint (cuando este listo dejar el comentado y sacar el de abajo)
router.get("/", authCheck(), checkRol(["admin"]), Space.allSpaces);

// router.get("/:id", authCheck(), checkRol(["admin"]), User.getUserByEmail);
router.get("/:id", authCheck(), checkRol(["admin"]), Space.getSpaceById);

router.get("/", authCheck(), checkRol(["admin"]), Space.createSpace);

router.put("/:id", authCheck(), checkRol(["admin"]), Space.updateSpace);

router.delete("/:id", authCheck(), checkRol(["admin"]), Space.deleteSpace);

export default router;