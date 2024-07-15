import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const reserveDB = prisma.reserve;

export const getReserves = async()=>{
    const reserves = await reserveDB.findMany();
    return reserves;
}

export const getReserveById = async(id)=>{
    const reserve = await reserveDB.findUnique({
        where : {
            id_reservation : id
        }
    })

    return reserve;
}

export const createReserve = async(body)=>{
    const newReserve = await reserveDB.create({
        data : body
    })

    return newReserve;
}

export const updateReserve = async(body)=>{
    const {id} = body;

    const updatedReserve = await reserveDB.update({
        where : {
            id_reservation: id
        },
        data : {...body}
    })

    return updatedReserve;
}

export const deleteUser = async(id)=>{
    const deletedUser = await reserveDB.delete({
        where : {
            id_reservation: id
        }
    })

    return deletedUser;
}