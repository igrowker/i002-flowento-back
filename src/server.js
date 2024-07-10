import express from 'express';
import { options } from './config/config.js';
import { Server } from 'socket.io';

const PORT = options.PORT || 8080;

const app = express();

export const serverCallback = () => {
    console.log(`Escuchando el puerto ${PORT}, iniciando express en http://localhost:${PORT}/`);
}

export const initWebSockets = (server) => {
    const io = new Server(server, {
        cors: {
            origin: true,
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        // Aquí puedes manejar otros eventos de WebSocket
    });
}