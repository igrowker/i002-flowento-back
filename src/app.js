import express from 'express';
import cors from 'cors';
import __dirname from './utils.js';

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


// rutas:
// podes trabajar con funciones de flecha o comunes
// los parametros q toman los metodos son 2: 
// 1- la ruta "/api/le-podes-agregar-mas/mas/...." 
// 2- una funcion callback q tiene el objeto req (request) y res (response) --> esto esta mas explicado en la doc de express js o podes hacer un console.log(req) por ejem para q veas todo lo q te trae
app.get('/api',  (req, res)=> {
    console.log("Hola back");

    // esta es la respuesta q da el servidor osea lo q le manda al front y finaliza la peticion GET en este caso, el objeto q le paso no tiene xq ser eso puodes poner lo q quieras
    res.send({
        status : "success",
        msg : "Hola front"
    });
});

// para probar estos endpoint te recomiendo usar "postman" hay una extencion en VS q sirve para lo mismo pero no recuerdo el nombre
app.post('/', function (req, res) {
    console.log(req.body);
    res.send({
        status : "success",
        msg : "peticion post correcta"
    });
});

// iniciamos el servidor esto es necesario xq sino el server no te funciona xq no lo estas iniciando
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando el puerto ${PORT}, iniciando express en http://localhost:${PORT}/`);
})