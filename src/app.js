import express from 'express';
import { options } from './config/config.js'
import cors from 'cors';
import __dirname from './utils.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import evnetRoutes from './routes/eventRoutes.js';
import { serverCallback } from './server.js';

// indicamos en el puerto que queremos q corra el server (puede ser cualquier numero q no este ocupado)
const PORT = options.PORT || 8080;

// inicializamos express
const app = express();

// middleware para permitir q el server se pueda acceder desde otro dominio
// esto por si el front esta trabajando en por ejem: http://localhost:3030/ y nosotros en el back http://localhost:8080/ darle permiso al front para poder acceder al server
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));

app.use(express.static(__dirname + "/public"));

// middlewares para trasnformar el req.body a un json (lo que llega en el body desde el front en un json), esto es necesario xq sino cuando desde el front te mandan algo en el body de fetch por ejem en el back cuando queres acceder al body (esto con req.body ejem mas abajo) te llega como undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser("palabraSuperSecreta", {}));
app.use(cookieParser());

// rutas:
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/admin", adminRoutes);
app.use("/events", evnetRoutes);


// const server = app.listen(PORT, () => {
//     console.log(`Escuchando el puerto ${PORT}, iniciando express en http://localhost:${PORT}/`);
// });

const server = app.listen(PORT, serverCallback);