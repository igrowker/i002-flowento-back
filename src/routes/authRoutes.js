import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';

const router = Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get("/probandoAuthMiddleware", checkRol(["admin"]),(req,res)=>{
    console.log("estar autorizado ya q sos el admin");
});

router.get("/probandoAuthMiddleware", checkRol(["user"]),(req,res)=>{
    console.log("estar autorizado ya q sos el user");
});

router.get("/probandoAuthMiddleware", checkRol(["admin","organizador"]),(req,res)=>{
    console.log("estar autorizado ya q sos el admin o organizador");
});

export default router;