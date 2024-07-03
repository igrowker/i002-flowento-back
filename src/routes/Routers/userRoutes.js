import { Router } from "express";

const userRoutes = Router();

userRoutes.get('/', (req, res) => {
    console.log("Hola back aca en el router de user");

    res.send({
        status: "success",
        msg: "Hola front aca en el router de user"
    });
});

export default userRoutes;
