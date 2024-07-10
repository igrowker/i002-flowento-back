import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const userDB = prisma.user;

export const getUsers = async()=>{
    const users = await userDB.findMany();
    return users;
}

export const getUserByEmail = async(email)=>{
    const user = await userDB.findUnique({
        where : {
            email : email
        }
    })

    return user;
}

export const getUserById = async(id)=>{
    const user = await userDB.findUnique({
        where : {
            id_user : id
        }
    })

    return user;
}

export const createUser = async(body)=>{
    const newUser = await userDB.create({
        data : body
    })

    return newUser;
}

export const updateUser = async(body)=>{
    const {email} = body;

    const updatedUser = await userDB.update({
        where : {
            email: email
        },
        data : {...body}
    })

    return updatedUser;
}

export const deleteUser = async(email)=>{
    const deletedUser = await userDB.delete({
        where : {
            email: email
        }
    })

    return deletedUser;
}