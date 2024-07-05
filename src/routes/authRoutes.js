import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import {getUsers} from '../models/User.js'

const router = Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get("/allUsers", async(req,res)=>{
    const users = await getUsers();

    res.json({
        status : "success",
        payload : users
    })
})

export default router;