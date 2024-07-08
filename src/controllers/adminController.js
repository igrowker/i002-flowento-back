import { attendEvent, getEventById, getEvents, updateEvent } from "../models/Event.js";

class Admin {
    static getPendingEvents = async (req, res) => {
        try {
            const events = await getEvents();

            const pendingEvents = events.filter(event => event.state === "pending");

            res.send({
                status: "success",
                payload: pendingEvents
            })
        } catch (error) {
            console.log(error);
        }
    }

    static approveEvent = async (req, res) => {
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

    static reportEvent = async (req, res) => {
        try {
            const events = await getEvents();
            // const attend = await attendEvent();

            const reports = [];

            //ACA VA A FALTAR HACER EL MODELO DE INSCRIPCIONES Q AHI OBTENES CUANTA GENTE DICE Q VA Y CUANTOS TERMINAN LLENDOo
            for (let i = 0; i < events.length; i++) {
                const element = events[i];
                
                const aux = {
                    id_event : element.id_event,
                    name : element.name,
                    attendance_confirmed : parseInt(max_capacity) - parseInt(current_capacity),
                    max_capacity : element.max_capacity,
                    current_capacity : element.current_capacity,
                }

                reports.push(aux);
            }

            res.send({
                status : "success",
                payload : reports
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export { Admin };