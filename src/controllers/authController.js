// authController.js: Maneja la autenticación y registro de usuarios

import crypto from 'crypto';
import jwt from 'jsonwebtoken';

//DB provicinal para probar los enpoints y mientras se eleige si trabajar con Prisma o sequelize
const arrayUsuariosReg = [
    {
        id : crypto.randomUUID(),
        name : "juan",
        email : "juan@gmail.com",
        password : "123"
    },
    {
        id : crypto.randomUUID(),
        name : "martin",
        email : "martin@gmail.com",
        password : "12345"
    },
    {
        id : crypto.randomUUID(),
        name : "facu",
        email : "facu@gmail.com",
        password : "12367"
    },
];


class AuthController{
    static login = async(req,res)=>{
        try {
            let user = {};

            const {email,password} = req.body;

            if (!email) {
                return res.status(400).send({
                    status : "error",
                    payload : "Usuario no encontrado"
                });
            }

            if (!password) {
                return res.status(400).send({
                    status : "error",
                    payload : "Contraseña invalida"
                });
            }

            //email y contraseña provicinal (esto tendira q venir de la db o las variables de entorno)
            user = {
                email,
                rol : "admin" //este rol se tendria q obtener desde la DB
            }

            const token = jwt.sign(user, "jwt-secret-word",{expiresIn : "8h"}); //el exprire podriamos sacarlo, es mas q nada para q se te desconecte automaticamente pasada cierta cantidad de tiempo

            //setamos la cookie
            //con maxAge indicamos el tiempo de vida osea cuando expira
            //HttpOnly atributo de navegador creado para impedir que las aplicaciones del lado del cliente, creo q ademas evita q puedas sobreescribir la cookie (osea si la modificas q te tire de la pagina y te mande al login devuelta)
            res.cookie("jwt-cookie",token,{HttpOnly : true, maxAge : 900000}).send({
                status : "success",
                payload : token
            });

        } catch (error) {
            console.log(error);
        }
    }

    static register = async (req,res)=>{
        try {
            // console.log(req);
            console.log(req.body);
            const {first_name, last_name, email, password, passwordRepeat, birthDate, gender, cell, country} = req.body;
    
            //compruebo si el email esta ya registrado
            if (arrayUsuariosReg.find(user => user.email === email)) {
                return res.status(409).send({
                    status : "error",
                    payload : `El email: ${email} ya se encuentra en uso` 
                });
            }

            //preguntarle al sector front si prefiern respuestas mas personalizadas
            if (!email || !first_name || !last_name || !password || !passwordRepeat || !birthDate || !gender || !cell || !country) {
                return res.status(400).send({
                    status : "error",
                    payload : "Alguno de los datos no esta completo"
                });
            }

            if (password !== passwordRepeat) {
                return res.status(400).send({
                    status : "error",
                    payload : "Las contraseñas no coinciden"
                });
            }

            arrayUsuariosReg.push({
                // id provicinal, de esto se encarga la db
                id : crypto.randomUUID(), 
                name : {
                    first_name,
                    last_name,
                    full_name : `${first_name} ${last_name}`
                },
                email,
                password,
                birthDate,
                gender,
                cell,
                country
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