import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import {optionsUser} from '../models/User.js'

const router = Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get("/allUsers", async(req,res)=>{
    const users = await optionsUser.USERS_GET_ALL;

    res.json({
        status : "success",
        payload : users
    })
})

export default router;