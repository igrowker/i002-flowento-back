import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const spaceDB = prisma.space;

export const getSpaces = async()=>{
    const spaces = await spaceDB.findMany();
    return spaces;
}

export const getSpaceById = async(id)=>{
    const space = await spaceDB.findUnique({
        where : {
            id_space : id
        }
    })

    return space;
}

export const createSpace = async(body)=>{
    const newSpace = await spaceDB.create({
        data : body
    })

    return newSpace;
}

export const updateSpace = async(body)=>{
    const {id} = body;

    const updatedSpace = await spaceDB.update({
        where : {
            id_space: id
        },
        data : {...body}
    })

    return updatedSpace;
}

export const deleteSpace = async(id)=>{
    const deletedSpace = await spaceDB.delete({
        where : {
            id_space: id
        }
    })

    return deletedSpace;
}