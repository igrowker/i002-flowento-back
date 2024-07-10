import jwt from 'jsonwebtoken';
import { deleteUser, getUserByEmail, getUsers, updateUser } from '../models/User.js';

class User {
    static allUsers = async (req, res) => {
        try {
            const users = await getUsers();

            res.send({
                stattus: "success",
                payload: users
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getUserByEmail = async (req, res) => {
        try {
            //ESTO DE MOMENTO ASI POR PARAMTRO LUEGO CUANDO EN EL FRONT ESTE LA VISTA DE ADMIN PARA BUSCAR INFO O BORRAR USUARIOS
            //lo ideal seria un formulario q venga del front y sacarlo del body
            const email = req.params.email; //se podria obtener del body todo depende de como se haga el formulario en el front

            const userFind = await getUserByEmail(email);

            if (!userFind) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el EMAIL: ${email} no se a encontrado`
                });
            }

            res.send({
                status: "success",
                payload: userFind
            });
        } catch (error) {
            console.log(error);
        }
    }

    static updateUserByEmail = async (req, res) => {
        try {
            const email = req.params.email;

            const userFind = await getUserByEmail(email);

            if (!userFind) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el EMAIL: ${email} no se a encontrado`
                });
            }

            const user = {
                ...req.body
            }

            const updatedUser = await updateUser(user);

            res.send({
                status: "success",
                payload: updatedUser
            })

        } catch (error) {
            console.log(error);
        }
    }

    static deleteUserByEmail = async (req, res) => {
        try {
            const email = req.params.email;

            const userFind = await getUserByEmail(email);

            if (!userFind) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el EMAIL: ${email} no se a encontrado`
                });
            }

            const deletedUser = await deleteUser(email);

            res.send({
                status: "success",
                payload: {
                    msg: `El usuario con el EMAIL: ${email} se elimino con exito`,
                    data: deletedUser
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export { User };