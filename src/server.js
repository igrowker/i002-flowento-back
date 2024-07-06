import express from 'express';
import {options} from './config/config.js';

const PORT = options.PORT || 8080;


const app = express();

// const server = app.listen(PORT, () => {
//     console.log(`Escuchando el puerto ${PORT}, iniciando express en http://localhost:${PORT}/`);
// });

export const serverCallback = () => {
    console.log(`Escuchando el puerto ${PORT}, iniciando express en http://localhost:${PORT}/`);
}