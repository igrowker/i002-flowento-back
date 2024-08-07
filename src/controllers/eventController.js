import jwt from "jsonwebtoken";
import { attendEvent, createEvent, deleteEvent, feedbackEvent, getEventById, getEvents, registerEvent, updateEvent } from "../models/Event.js";
import { getUserByEmail, getUserById } from "../models/User.js";
import { emailSender } from "../utilities/emailService.js";
import { getFeedbacks } from "../models/Feedback.js";
import { cloudinary } from '../config/cloudinaryConfig.js';

class Event {
    static getEvents = async (req, res) => {
        try {
            const events = await getEvents();

            res.send({
                status: "success",
                payload: events
            });

        } catch (error) {
            console.log(error);
        }
    }

    static getEventById = async (req, res) => {
        try {
            const id = req.params.id;

            const event = await getEventById(id);

            console.log(event)

            if (!event) {
                return res.status(400).send({
                    status: "error",
                    payload: `El evento con el ID: ${id} no se a encontrado`
                });
            }

            res.send({
                status: "success",
                payload: event
            });

        } catch (error) {
            console.log(error);
        }
    }

    static createEvent = async (req, res) => {
        try {
            
            const {start_date, end_date, max_capacity, current_capacity, online_link, image, price } = req.body;

            // const tokenInfo = req.cookies["jwt-cookie"];

            // const decodedInfo = jwt.decode(tokenInfo);

            // const { id, email } = decodedInfo;

            const id = 7;
            const email = "uliisesrodriguez809@gmail.com";

            //esto xq la fecha la estoy pasando como string en formato yyyy-mm-dd
            const regExDate = /^\d{4}-\d{2}-\d{2}$/;

            if (!start_date.match(regExDate) || !end_date.match(regExDate)) {
                return res.status(400).send({
                    status: "error",
                    payload: "El formato de la fecha debe de ser yyyy-mm-dd"
                });
            }

            //SI PRISMA TIRA ERRO LO MAS SEGURO ES Q TE FALTO PASARLE ALGUN VALOR O ALGUN VALOR ES NAN O NULL O UNDEFINED O ALGUNA MIERDA ASI
            const eventInfo = {
                ...req.body,
                userId: id,
                price : parseInt(price),
                max_capacity: parseInt(max_capacity),
                current_capacity: parseInt(current_capacity),
                online_link: (online_link.toLowerCase() === 'true'),
            }

            const event = await createEvent(eventInfo);

            if (!event) {
                return res.status(400).send({
                    status: "error",
                    payload: "No se logro crear el evento"
                });
            }

            const response = await emailSender(email, "Tu evento fue creado con exito", "Creacion de evento");

            res.send({
                status: "success",
                payload: event
            });
        } catch (error) {
            console.log(error);
        }
    }

    static updateEvent = async (req, res) => {
        try {
            const id = req.params.id;

            const eventFind = await getEventById(id);

            if (!eventFind) {
                return res.status(400).send({
                    status: "error",
                    payload: `El evento con el ID: ${id} no se a encontrado`
                });
            }

            const event = {
                id_event: parseInt(id),
                ...req.body,
            }

            const updatedEvent = await updateEvent(event);

            res.send({
                status: "success",
                payload: updatedEvent
            })
        } catch (error) {
            console.log(error);
        }
    }

    static deleteEvent = async (req, res) => {
        try {
            const id = req.params.id;

            const eventFind = await getEventById(id);

            if (!eventFind) {
                return res.status(400).send({
                    status: "error",
                    payload: `El evento con el ID: ${id} no se a encontrado`
                });
            }

            const deletedEvent = await deleteEvent(parseInt(id));

            res.send({
                status: "success",
                payload: {
                    msg: `El evento con el ID: ${id} se elimino con exito`,
                    data: deletedEvent
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    static registerForEvent = async (req, res) => {
        try {
            const { eventId, email, name } = req.body;

            // const tokenInfo = req.cookies["jwt-cookie"];

            // const decodedInfo = jwt.decode(tokenInfo);

            // const { id, email } = decodedInfo;

            console.log(req.body);

            if (!eventId) {
                return res.status(400).send({
                    status: "error",
                    payload: "Datos incompletos"
                });
            }

            const user = await getUserByEmail(email);

            console.log(user);

            if (!user) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el ID: ${id} no se a encontrado`,
                });
            }

            const event = await getEventById(parseInt(eventId));

            if (!event) {
                return res.status(400).send({
                    status: "error",
                    payload: `El evento con el ID: ${eventId} no se a encontrado`,
                });
            }

            const insciptionInfo = {
                userId: parseInt(user.id_user),
                eventId: parseInt(eventId),
                attendance_confirmed: "yes"
            }

            const regEvent = await registerEvent(insciptionInfo);

            if (!regEvent) {
                return res.status(400).send({
                    status: "error",
                    payload: `No se logro completar el registro al evento con el ID: ${eventId}`,
                });
            }

            //actualizo la cantidad de lugares disponibles
            event.current_capacity += 1;

            const updatedEvent = await updateEvent(event);

            const response = await emailSender(email, "Te incirbiste con exito al evento", "Registro al evento");

            res.send({
                status: "success",
                payload: regEvent
            })
        } catch (error) {
            console.log(error);
        }
    }

    static confirmAttendance = async (req, res) => {
        try {
            const id_registration = req.params.id;
            const { eventId, userId, attendance_confirmed } = req.body;

            const tokenInfo = req.cookies["jwt-cookie"];

            const decodedInfo = jwt.decode(tokenInfo);

            const { id, email, rol } = decodedInfo;

            // const id = 1;
            // const email = "uliisesrodriguez809@gmail.com";

            if (!eventId || !attendance_confirmed) {
                return res.status(400).send({
                    status: "error",
                    payload: "Datos incompletos"
                });
            }

            const user = await getUserById(parseInt(userId));

            if (!user) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el ID: ${userId} no se a encontrado`,
                });
            }

            const event = await getEventById(parseInt(eventId));

            if (!event) {
                return res.status(400).send({
                    status: "error",
                    payload: `El evento con el ID: ${eventId} no se a encontrado`,
                });
            }

            const data = {
                id_registration: parseInt(id_registration),
                userId: parseInt(userId),
                eventId: parseInt(eventId),
                attendance_confirmed
            }

            const attEven = await attendEvent(data);

            if (!attEven) {
                return res.status(400).send({
                    status: "error",
                    payload: `No se logro completar confirmar la inscipcion al evento con el ID: ${eventId}`,
                });
            }

            const response = await emailSender(email, "Te incirbiste con exito al evento", "Registro al evento");

            res.send({
                status: "success",
                payload: attEven
            })
        } catch (error) {
            console.log(error);
        }
    }

    static submitFeedback = async (req, res) => {
        try {
            const id_event = req.params.id;
            const { comment, rating } = req.body;

            //descomentalo cuando este el form del front listo
            // const tokenInfo = req.cookies["jwt-cookie"];

            // const decodedInfo = jwt.decode(tokenInfo);

            // const { email } = decodedInfo;
            // const email = "tino@gmail.com";

            const id = 7;
            const email = "uliisesrodriguez809@gmail.com";

            const user = await getUserByEmail(email);

            const { id_user } = user

            const data = {
                user_id: id_user,
                event_id: parseInt(id_event),
                comment,
                rating
            }

            const feedback = await feedbackEvent(data);

            res.send({
                stauts: "success",
                payload: feedback
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getAllFeedbacks = async (req, res) => {
        try {
            const id = req.params.id;

            const feedbacks = await getFeedbacks(parseInt(id));

            if (!feedbacks) {
                return res.status(500).send({
                    status: "error",
                    payload: "No se logro obtener el feedback"
                })
            }

            res.send({
                status: "success",
                payload: feedbacks
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export { Event };