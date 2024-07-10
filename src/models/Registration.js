import { PrismaClient } from '@prisma/client';

//PirsmaCliente para crear una conexion a la DB

const prisma = new PrismaClient();

const inscriptionDB = prisma.inscription;

export const getInscriptions = async()=>{
    const inscriptions = await inscriptionDB.findMany();
    return inscriptions;
}

export const getInscriptionById = async(id)=>{
    const inscription = await inscriptionDB.findUnique({
        where : {
            id_registration : id
        }
    })

    return inscription;
}

export const createInscription = async(body)=>{
    const newInscription = await inscriptionDB.create({
        data : body
    })

    return newInscription;
}

export const updateInscription = async(body)=>{
    const {id_registration} = body;

    const updatedInscription = await inscriptionDB.update({
        where : {
            id_registration: id_registration
        },
        data : {...body}
    })

    return updatedInscription;
}

export const deleteInscription = async(id)=>{
    const deletedInscription = await inscriptionDB.delete({
        where : {
            id_registration: id
        }
    })

    return deletedInscription;
}