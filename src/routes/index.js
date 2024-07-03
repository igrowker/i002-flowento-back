import express from 'express';
import userRoutes from './Routers/userRoutes.js';
import authRoutes from './Routers/authRoutes.js';
import eventRoutes from './Routers/eventRoutes.js';
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Hola back");

    res.send({
        status: "success",
        msg: "Hola front"
    });
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/events", eventRoutes);


export default router;
