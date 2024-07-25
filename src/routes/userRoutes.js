import { Router } from 'express';
import { User } from '../controllers/userController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = Router();

// router.get("/profile", authCheck(), User.profile);
router.get("/profile", User.profile);

// para probar de momento mientras se termina el login del front no se le pone el middleware q chekea q solo el admin puede acceder a este endpoint (cuando este listo dejar el comentado y sacar el de abajo)
// router.get("/", authCheck(), checkRol(["admin"]), User.allUsers);
router.get("/", User.allUsers);

// router.get("/:email", authCheck(), checkRol(["admin"]), User.getUserByEmail);
router.get("/:email", User.getUserByEmail);

// router.put("/:email", authCheck(), checkRol(["admin"]), User.updateUserByEmail);
router.put("/:email", User.updateUserByEmail);

// router.delete("/:email", authCheck(), checkRol(["admin"]), User.deleteUserByEmail);
router.delete("/:email", User.deleteUserByEmail);

export default router;