import { Router } from 'express';
import { User } from '../controllers/userController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';

const router = Router();

// para probar de momento mientras se termina el login del front no se le pone el middleware q chekea q solo el admin puede acceder a este endpoint (cuando este listo dejar el comentado y sacar el de abajo)
// router.get("/", checkRol(["admin"]), User.allUsers); //agregarselo a todos los enpoints
router.get("/", User.allUsers);

//id de momento se podria buscar por email o otra cosa
router.get("/:id", User.getUserById);

router.put("/:id", User.updateUserById);

router.delete("/:id",User.deleteUserById);

export default router;