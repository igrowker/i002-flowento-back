import jwt from "jsonwebtoken";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../models/Event.js";

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
            const { start_date, end_date } = req.body;

            //esto xq la fecha la estoy pasando como string en formato yyyy-mm-dd
            const regExDate = /^\d{4}-\d{2}-\d{2}$/;

            if (!start_date.match(regExDate) || !end_date.match(regExDate)) {
                return res.status(400).send({
                    status: "error",
                    payload: "El formato de la fecha debe de ser yyyy-mm-dd"
                });
            }

            //esto cuando este el form del front listo agregalo, de momento lo saco del body pero la idea es obtenerlo del token
            // const tokenInfo = req.cookies["jwt-cookie"];

            // const decodedInfo = jwt.decode(tokenInfo);

            //valor hardcodeado para probar
            const id_user = 1;

            const eventInfo = {
                userId : id_user,
                ...req.body,
            }

            const event = await createEvent(eventInfo);

            console.log(event);

            if (!event) {
                return res.status(400).send({
                    status: "error",
                    payload: "No se logro crear el evento"
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
                id_event : parseInt(id), 
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

        } catch (error) {
            console.log(error);
        }
    }

    static confirmAttendance = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    static submitFeedback = async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }
}

export { Event };