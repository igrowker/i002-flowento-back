import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const userDB = prisma.user;

export default userDB;

//cuando le das prisma. deberia de aprecer todas las opciones de prisma cliente pero ademas los schemas q creaste

const USERS_GET_ALL = prisma.user.findMany() //si no le pasas nada al findMany te trae todos los usuarios
// const CREATE_USER = prisma.user.create({
//     data: {
//         name : name,
//         email,
//         password,
//         phone,
//         gender,
//         registration_date,
//     }
// })



export const optionsUser = {
    USERS_GET_ALL,
    // CREATE_USER,
}
