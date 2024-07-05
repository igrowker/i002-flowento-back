import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const userDB = prisma.user;

export const getUsers = async()=>{
    const users = await prisma.user.findMany();
    return users;
}

export const getUserByEmail = async(email)=>{
    const user = await prisma.user.findUnique({
        where : {
            email : email
        }
    })

    return user;
}

export const createUser = async(body)=>{
    const newUser = await prisma.user.create({
        data : body
    })

    return newUser;
}


