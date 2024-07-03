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


/* 
proyecto adopcion de perritos de la calle
filtrado de perritos por las caracteristicas ingresadas, ejem : espacio de la casa, horarios de trabajo, cantidad de comida requerida, etc

match estilo tinder para mostrar los perritos

descripcion del perrito, ejem perro grande necesita cierta cantidad de espacio, cantidad de comida requerida al dia
vacunas necesaria, posibles problemas de salud, cantidad de tiempo para sacarlo a pasear, miedos del perrito (ansidad, ruidos fuertes o q suele hacer si se queda solo)

roles para si queres adoptar o ser transitorio y cuanto tiempo (requisitos para promover adopcion responsable)

pasarela de pago para en caso de no poder adoptar o ser transitorio poder hacer donativos o poder acercar comida o otro tipo de recursos a los lugares de adopcion

posible test / requisitos minimos como validar datos para garantizar adopcion responsable

login/registro

informacion con veterinarias cerca de tu zona

cada determinado tiempo, q el adoptador suba un video o foto para ver en las condiciones q esta, algun sistema de puntos para q cuando suma cierta cantidad se le de algun beneficio como regalarle una bolsa de alimento o algo asi, a su ves poder 
*/

// desarrolladme un documento del alcanzae de este proyecto