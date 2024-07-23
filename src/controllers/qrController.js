import crypto from 'crypto';
import {createQR} from '../models/QrCode.js';
import { getUserByEmail } from '../models/User.js';
import QrCode from 'qrcode';

class QR {
    static getQr = async (req,res)=>{
        try {
            const url = "http://localhost:8080/qrInscription?eventId=1";

            QrCode.toDataURL(url,(err, qrCodeUrl)=>{
                if (err) {
                    res.status(500).send({
                        status : "error",
                        payload : "Error en el servidor"
                    })
                } else {
                    res.send(`
                        <img src="${qrCodeUrl}" alt="QR" />
                    `)
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    static qrInscription = async (req, res) => {
        try {
            const idEvent = req.query.eventId;

            const qrInfo = {
                eventId : idEvent,
                code : crypto.randomUUID(),
            }

            const qr = await createQR(qrInfo);

            if (!qr) {
                return res.status(400).send({
                    status: "error",
                    payload: "No se logro crear el qr para la inscripcion del evento"
                });
            }

            res.send({
                status: "success",
                payload: qr
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export { QR };