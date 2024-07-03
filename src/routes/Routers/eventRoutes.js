import { Router } from "express";

const eventRoutes = Router();

eventRoutes.get('/', (req, res) => {
    console.log("Hola back aca en el router de event");

    res.send({
        status: "success",
        msg: "Hola front aca en el router de event"
    });
});

export default eventRoutes;
