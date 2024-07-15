import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const feedbackDB = prisma.feedback;

export const getFeedbacks = async (id) => {
    const feedbacks = await feedbackDB.findMany({
        where : {
            eventId : id
        }
    });

    return feedbacks;
}

export const getFeedbackById = async (id) => {
    const parseId = parseInt(id);

    const event = await feedbackDB.findUnique({
        where: {
            id_event: parseId
        }
    })

    return event;
}

export const createFeedback = async (body) => {
    const newFeedback = await feedbackDB.create({
        data: body
    })

    return newFeedback;
}

export const updateFeedback = async (body) => {
    const {id_event} = body;

    const updatedFeedback = await feedbackDB.update({
        where: {
            id_event: id_event
        },
        data: { 
            ...body
        }
    })

    return updatedFeedback;
}

export const deleteFeedback = async (id) => {
    const deletedFeedback = await feedbackDB.delete({
        where: {
            id_event: id
        }
    })

    return deletedFeedback;
}