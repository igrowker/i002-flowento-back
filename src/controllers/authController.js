// authController.js: Maneja la autenticación y registro de usuarios
import jwt from 'jsonwebtoken';
// import {optionsUser} from '../models/User.js';
import { getUsers, getUserByEmail, createUser, updateUser } from '../models/User.js';
import { createHashPassword, isValidPassword } from '../utils.js'
import { options } from '../config/config.js';
import { emailSender, generateEmailToken, sendRecoverPassword } from '../utilities/emailService.js';


class AuthController {
    static login = async (req, res) => {
        try {
            // res.header("Access-Control-Allow-Origin", "*");

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

            let user = {
                email,
                rol : "user"
            }

            if (options.ADMIN_EMAIL === email && options.ADMIN_PASSWORD === password) {
                user = {
                    email,
                    rol: "admin"
                }
            }
            else {
                const userFind = await getUserByEmail(email);

                if (!userFind) {
                    return res.status(400).send({
                        status: "error",
                        payload: "El usuari no se encuentra registrado"
                    })
                }

                const {user_id} = userFind;

                const isValid = await isValidPassword(password, userFind);

                if (!isValid) {
                    return res.status(400).send({
                        status: "error",
                        payload: "La contraseña es invalida"
                    })
                }

                user = {
                    id : user_id,
                    email,
                    rol: "user"
                }
            }

            const token = jwt.sign(user, "jwt-secret-word", { expiresIn: "2h" }); //el exprire podriamos sacarlo, es mas q nada para q se te desconecte automaticamente pasada cierta cantidad de tiempo

            //setamos la cookie
            //con maxAge indicamos el tiempo de vida osea cuando expira
            //HttpOnly atributo de navegador creado para impedir que las aplicaciones del lado del cliente, creo q ademas evita q puedas sobreescribir la cookie (osea si la modificas q te tire de la pagina y te mande al login devuelta)
            res.cookie("jwt-cookie", token, { httpOnly: true, maxAge: 3600000 }).json({
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
                first_name,
                last_name,
                email,
                password: hashPassword
            }

            //creamos el usuario y lo guardamos en la DB
            const newUser = await createUser(user);

            const response = await emailSender(email, "Te incirbiste con exito al evento", "Registro al evento");

            res.send({
                status: "success",
                payload: newUser
            });

        } catch (error) {
            console.log(error);
        }
    }

    static logout = async (req, res) => {
        try {
            console.log("entro");

            const tokenInfo = req.cookies["jwt-cookie"];

            const decodedToken = jwt.decode(tokenInfo);

            console.log(decodedToken);

            console.log(req.cookies[options.COOKIE_WORD]);

            if (req.cookies[options.COOKIE_WORD]) {

                res.clearCookie(options.COOKIE_WORD);

                // res.redirect('/');

                res.send({
                    status : "success",
                    payload : "Deslogueo exitoso"
                })

            } else {
                res.status(401).send({
                    status: "error",
                    payload: "No se logro desloguear con exito"
                })
            }
        } catch (error) {
            res.status(500).send({
                status: "error",
                message: "No se logro cerrar sesion"
            })
        }
    }

    static revocerPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const hostname = req.hostname;

            // para porbarlo ponele 60 segundos pero para el desafio ponele 3600
            const tokenEmail = generateEmailToken(email, 3600);

            const respond = await sendRecoverPassword(email, tokenEmail, hostname);

            if (!respond) {
                return res.status(400).send({
                    status: "error",
                    payload: "No se logro enviar el mail para restrablecer la contraseña"
                })
            }

            res.send({
                status: "success",
                payload: "email enviado con exito"
            })

        } catch (error) {
            res.status(400).send({
                status: "error",
                payload: "Usuario ya registrado"
            })
        }
    }

    static resetPassword = async (req, res) => {
        try {
            const {email, password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).send({
                    status: "error",
                    payload: "Las contraseñas no coinciden"
                });
            }

            const user = await getUserByEmail(email);

            const samePassword = await isValidPassword(password, user);

            // si la contraseña es la misma q esta guardada en la DB, indicamos q no puede repetir la misma contraseña
            if (samePassword) {
                return res.status(400).send({
                    status: "error",
                    payload: "Error, esta contraseña ya fue usada anteriormente"
                });
            }

            const newPassword = await createHash(password);

            user.password = newPassword;

            const userUpdated = await updateUser(user);

            if (!userUpdated) {
                return res.status(400).send({
                    status: "error",
                    payload: "Error, no se logro actulizar los datos del usuario"
                });
            }

            res.send({
                status: "success",
                payload: "todo bien"
            })

        } catch (error) {
            res.status(400).send({
                status: "error",
                payload: "No se logro cambiar la contraseña"
            })
        }
    }
}

export { AuthController };