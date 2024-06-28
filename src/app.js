import express from 'express';
import cors from 'cors';
import __dirname from './utils.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

// indicamos en el puerto que queremos q corra el server (puede ser cualquier numero q no este ocupado)
const PORT = 8080;

// inicializamos express
const app = express();

// middleware para permitir q el server se pueda acceder desde otro dominio
// esto por si el front esta trabajando en por ejem: http://localhost:3030/ y nosotros en el back http://localhost:8080/ darle permiso al front para poder acceder al server
app.use(cors());

// para indicar donde esta la carpeta public
// __dirname --> te devulete :  C:\Users\User\Desktop\flowento\i002-flowento-back
// + "/public" --> le une public a C:\Users\User\Desktop\flowento\i002-flowento-back\public
app.use(express.static(__dirname + "/public"));
// para mas data de lo q es __dirname mira el archivo utils.js q esto es para las rutas absolutas

// middlewares para trasnformar el req.body a un json (lo que llega en el body desde el front en un json), esto es necesario xq sino cuando desde el front te mandan algo en el body de fetch por ejem en el back cuando queres acceder al body (esto con req.body ejem mas abajo) te llega como undefined
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Analice Cookieel encabezado y complételo req.cookiescon un objeto codificado por los nombres de las cookies.
//esto para poder obtener informacion del usuario desde la cookie q codificamos cuando el usuario hace login
//con jwt creamos el token q se guarda en la cookie, esto para asi tener una referencia de cierta informacion no sencible del usuario (como por ejem su rol) y q a su ves sepamos si el usuario q intenta ingresar a ciertos endpoints esta o no autenticada o autorizada
app.use(cookieParser("palabraSuperSecreta",{}));

// rutas:
app.use("/",authRoutes);

// iniciamos el servidor esto es necesario xq sino el server no te funciona xq no lo estas iniciando
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando el puerto ${PORT}, iniciando express en http://localhost:${PORT}/`);
})