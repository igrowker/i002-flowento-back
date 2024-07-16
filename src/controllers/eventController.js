import jwt from "jsonwebtoken";
import { attendEvent, createEvent, deleteEvent, feedbackEvent, getEventById, getEvents, registerEvent, updateEvent } from "../models/Event.js";
import { getUserByEmail, getUserById } from "../models/User.js";
import { emailSender } from "../utilities/emailService.js";
import { getFeedbacks } from "../models/Feedback.js";
import { cloudinary } from '../config/cloudinaryConfig.js';

class Event {
    static getEvents = async (req, res) => {
        try {

            // LO Q PODES HACER ES EN LA DB DE PRISMA GUARDAR LOS ID PUBLICOS DE LAS IMAGENES GUARDAS EN CLOUDINARY
            // ESTO SERIA EN CREATE EVENT

            //esto obtiene todas las imagenees en cloudinary en la carpeta ml_default
            // const { resources } = await cloudinary.search.expression("folder:ml_default").sort_by("public_id", "desc").max_results(30).execute();

            // const publicIds = resources.map(file => file.public_id);

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
            //capaz tenes q modificar en app.js el urlendoded y json minuto 18:30 --> https://www.youtube.com/watch?v=Rw_QeJLnCK4&ab_channel=JamesQQuick
            const { start_date, end_date, max_capacity, current_capacity, online_link, fileStr } = req.body;

            // const fileStr = req.body.data;

            console.log(req.body);

            // const tokenInfo = req.cookies["jwt-cookie"];

            // const decodedInfo = jwt.decode(tokenInfo);

            // const { id, email } = decodedInfo;

            const id = 1;
            const email = "flowentoa@gmail.com";

            //esto xq la fecha la estoy pasando como string en formato yyyy-mm-dd
            const regExDate = /^\d{4}-\d{2}-\d{2}$/;

            if (!start_date.match(regExDate) || !end_date.match(regExDate)) {
                return res.status(400).send({
                    status: "error",
                    payload: "El formato de la fecha debe de ser yyyy-mm-dd"
                });
            }

            const updloaderResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: "ml_default"
            })

            console.log(updloaderResponse);

            const eventInfo = {
                userId: id,
                ...req.body,
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
            const { eventId } = req.body;

            const tokenInfo = req.cookies["jwt-cookie"];

            const decodedInfo = jwt.decode(tokenInfo);

            const { id, email } = decodedInfo;

            // const id = 1;
            // const email = "uliisesrodriguez809@gmail.com";

            if (!eventId) {
                return res.status(400).send({
                    status: "error",
                    payload: "Datos incompletos"
                });
            }

            const user = await getUserById(parseInt(id));

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
                userId: parseInt(id),
                eventId: parseInt(eventId),
                attendance_confirmed: "no"
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
            const tokenInfo = req.cookies["jwt-cookie"];

            const decodedInfo = jwt.decode(tokenInfo);

            const { email } = decodedInfo;
            // const email = "tino@gmail.com";

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