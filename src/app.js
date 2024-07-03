import express from 'express';
import cors from 'cors';
import __dirname from './utils.js';
import router from './routes/index.js';

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const server = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}, iniciando express en http://localhost:${PORT}/`);
});
