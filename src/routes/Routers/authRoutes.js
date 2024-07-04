import { Router } from "express";

const authRoutes = Router();

authRoutes.get('/', (req, res) => {
    console.log("Hola back aca en el router de auth");

    res.send({
        status: "success",
        msg: "Hola front aca en el router de auth"
    });
});

export default authRoutes;
