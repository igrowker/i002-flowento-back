import { PrismaClient } from '@prisma/client';
import { createFeedback } from './Feedback.js';
import { createInscription, updateInscription } from './Registration.js';

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

export const registerEvent = async (body) => {
    const registeredEvent = await createInscription(body);

    return registeredEvent;
}

export const attendEvent = async (body) => {
    const attendedEvent = await updateInscription(body);

    return attendedEvent;
}

export const feedbackEvent = async (body) => {
    const {user_id,event_id,comment,rating} = body;

    const createdFeedback = await createFeedback({
        userId : user_id,
        eventId : event_id,
        comment,
        rating,
    })

    return createdFeedback;
}