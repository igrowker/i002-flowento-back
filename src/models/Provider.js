import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const providerDB = prisma.provider;

export const getProviders = async()=>{
    const providers = await providerDB.findMany();
    return providers;
}

export const getProviderById = async(id)=>{
    const provider = await providerDB.findUnique({
        where : {
            id_provider : id
        }
    })

    return provider;
}

export const createProvider = async(body)=>{
    const newProvider = await providerDB.create({
        data : {
            ...body
        }
    })

    return newProvider;
}

export const updateProvider = async(body)=>{
    const {id} = body;

    const updatedProvider = await providerDB.update({
        where : {
            id_provider: id
        },
        data : {...body}
    })

    return updatedProvider;
}

export const deleteProvider = async(id)=>{
    const deletedProvider = await providerDB.delete({
        where : {
            id_provider : id
        }
    })

    return deletedProvider;
}