import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const eventDB = prisma.event;

export const getEvents = async () => {
    const events = await eventDB.findMany();

    return events;
}

export const getEventById = async (id) => {
    const parseId = parseInt(id);

    const event = await eventDB.findUnique({
        where: {
            id_event: parseId
        }
    })

    return event;
}

export const createEvent = async (body) => {
    const newEvent = await eventDB.create({
        data: body
    })

    return newEvent;
}

export const updateEvent = async (body) => {
    const {id_event} = body;

    const updatedEvent = await eventDB.update({
        where: {
            id_event: id_event
        },
        data: { 
            ...body
        }
    })

    return updatedEvent;
}

export const deleteEvent = async (id) => {
    const deletedEvent = await eventDB.delete({
        where: {
            id_event: id
        }
    })

    return deletedEvent;
}