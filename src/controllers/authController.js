// authController.js: Maneja la autenticación y registro de usuarios
import jwt from 'jsonwebtoken';
// import {optionsUser} from '../models/User.js';
import { getUsers, getUserByEmail, createUser } from '../models/User.js';
import { createHashPassword, isValidPassword } from '../utils.js'
import { options } from '../config/config.js';


class AuthController {
    static login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email) {
                return res.status(400).send({
                    status: "error",
                    payload: "Usuario no encontrado"
                });
            }

            if (!password) {
                return res.status(400).send({
                    status: "error",
                    payload: "Contraseña invalida"
                });
            }

            const user = await getUserByEmail(email);

            const isValid = await isValidPassword(password, user);

            if (!isValid) {
                return res.status(400).send({
                    status : "error",
                    payload : "La contraseña es invalida"
                })
            }

            if (options.ADMIN_EMAIL === email && options.ADMIN_PASSWORD === password) {
                user = {
                    email,
                    rol: "admin"
                }
            }
            else{
                user = {
                    email,
                    rol : "user"
                }
            }
            

            const token = jwt.sign(user, "jwt-secret-word", { expiresIn: "8h" }); //el exprire podriamos sacarlo, es mas q nada para q se te desconecte automaticamente pasada cierta cantidad de tiempo

            //setamos la cookie
            //con maxAge indicamos el tiempo de vida osea cuando expira
            //HttpOnly atributo de navegador creado para impedir que las aplicaciones del lado del cliente, creo q ademas evita q puedas sobreescribir la cookie (osea si la modificas q te tire de la pagina y te mande al login devuelta)
            res.cookie("jwt-cookie", token, { HttpOnly: true, maxAge: 900000 }).send({
                status: "success",
                payload: token
            });

        } catch (error) {
            console.log(error);
        }
    }

    static register = async (req, res) => {
        try {
            const { first_name, last_name, email, password, passwordRepeat } = req.body;

            console.log(req.body);

            const DB = await getUsers();

            //check para ver si falta algun dato
            if (!email || !first_name || !last_name || !password || !passwordRepeat) {
                return res.status(400).send({
                    status: "error",
                    payload: "Alguno de los datos no esta completo"
                });
            }

            //compruebo si el email esta ya registrado
            if (DB.find(user => user.email === email)) {
                return res.status(409).send({
                    status: "error",
                    payload: `El email: ${email} ya se encuentra en uso`
                });
            }

            //check para ver si las contraseñas coinciden
            if (password !== passwordRepeat) {
                return res.status(400).send({
                    status: "error",
                    payload: "Las contraseñas no coinciden"
                });
            }

            //hash la contraseña
            const hashPassword = await createHashPassword(password);

            const user = {
                name: `${first_name} ${last_name}`,
                email,
                password: hashPassword,
                // phone,
                // gender,
                // country,
                // birthDate
            }

            //creamos el usuario y lo guardamos en la DB
            const newUser = await createUser(user);

            res.send({
                status: "success",
                payload: newUser
            });

        } catch (error) {
            console.log(error);
        }
    }
}

export { AuthController };