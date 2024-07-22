import crypto from 'crypto';
import {createQR} from '../models/QrCode.js';
import { getUserByEmail } from '../models/User.js';
import qr from 'qrcode';

class QR {
    static getQr = async (req,res)=>{
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    static qrInscription = async (req, res) => {
        try {
            // const { id } = req.body;

            const tokenInfo = req.cookies["jwt-cookie"];

            const decodedInfo = jwt.decode(tokenInfo);

            const { id, email, rol } = decodedInfo;

            // const id = 1;
            // const email = "qrPrueba@gmail.com";
            // const id = 1;
            // const email = "qrPrueba@gmail.com";

            const qrInfo = {
                ...req.body,
                code : crypto.randomUUID(),
            }

            const qr = await createQR(qrInfo);

            if (!qr) {
                return res.status(400).send({
                    status: "error",
                    payload: "No se logro crear el qr para la inscripcion del evento"
                });
            }

            const response = await emailSender(email, `Tu confirmacion de asistencia al evento se logro con exito, este es tu codigo: ${qr.code}`, "Confirmacion al evento");

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