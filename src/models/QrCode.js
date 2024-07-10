import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const qrDB = prisma.qr;

export const createQR = async(body)=>{
    const qr = await qrDB.create({
        data : body
    })

    return qr;
}