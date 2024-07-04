import { findIndex } from '../utils.js';

const arrayEvents = [
    {
        id: 1,
        name: "evento1",
        approve : false,
    },
    {
        id: 2,
        name: "evento2",
        approve : false,
    },
    {
        id: 3,
        name: "evento3",
        approve : false,
    }
]

class Admin {
    static getAllEvents = async (req, res) => {
        try {
            res.send({
                status: "success",
                payload: arrayEvents
            })
        } catch (error) {
            console.log(error);
        }
    }

    static approveEvent = async (req, res) => {
        try {
            const id = req.params.id;

            const eventIndex = findIndex(id,arrayEvents);

            if (eventIndex === -1) {
                return res.status(400).send({
                    status : "error",
                    payload : `No se encontro el evento con el ID : ${id}`
                });
            }

            const {approve} = req.body;

            arrayEvents[eventIndex].approve = approve;
            
            res.send({
                status : "success",
                payload : {
                    msg : `Se aprobo el evento con el ID: ${id}`,
                    data : arrayEvents[eventIndex]
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    static reportEvent = async (req, res) => {
        try {
            //aca supongo q sera con Chart.js para generar los graficos

            res.send({
                status : "success",
                payload : "mensaje provicinal"
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export { Admin };