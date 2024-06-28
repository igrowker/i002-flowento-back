// authController.js: Maneja la autenticación y registro de usuarios

import crypto from 'crypto';

//DB provicinal para probar los enpoints y mientras se eleige si trabajar con Prisma o sequelize
const arrayUsuariosReg = [
    {
        id : crypto.randomUUID(),
        name : "juan",
        email : "juan@gmail.com"
    },
    {
        id : crypto.randomUUID(),
        name : "martin",
        email : "martin@gmail.com"
    },
    {
        id : crypto.randomUUID(),
        name : "facu",
        email : "facu@gmail.com"
    },
];


class AuthController{
    static login = async(req,res)=>{
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    static register = async (req,res)=>{
        try {
            // console.log(req);
            console.log(req.body);
            const {email, first_name, last_name} = req.body;
    
            //compruebo si el email esta ya registrado
            if (arrayUsuariosReg.find(user => user.email === email)) {
                return res.status(409).send({
                    status : "error",
                    payload : `El email: ${email} ya se encuentra en uso` 
                });
            }

            arrayUsuariosReg.push({
                // id : arrayUsuariosReg[arrayUsuariosReg.length-1].id + 1, //esto si definieramos nostros los id 
                id : crypto.randomUUID(),
                name : {
                    first_name,
                    last_name
                },
                email
            });
    
            res.send({
                status : "success",
                payload : arrayUsuariosReg
            });

        } catch (error) {
            console.log(error);
        }
    }
}

export {AuthController};