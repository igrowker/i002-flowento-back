import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { findIndex } from '../utils.js';

// array provicinal hasta q pueda hacer andar la DB
const arrayUsers = [
    {
        id: 1,
        name: "Pepe",
        email: "pepe@gmail.com"
    },
    {
        id: crypto.randomUUID(),
        name: "Juan",
        email: "juan@gmail.com"
    },
    {
        id: crypto.randomUUID(),
        name: "Tino",
        email: "tino@gmail.com"
    }
]

class User {
    static allUsers = async (req, res) => {
        try {
            res.send({
                stattus: "success",
                payload: arrayUsers
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getUserById = async (req, res) => {
        try {
            const id = req.params.id; //se podria obtener del body todo depende de como se haga el formulario en el front

            const userFind = arrayUsers.find(user => user.id !== id);

            if (userFind === undefined) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el ID: ${id} no se a encontrado`
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

    static updateUserById = async (req, res) => {
        try {
            const id = req.params.id;
            
            const userIndex = findIndex(id,arrayUsers);

            if (userIndex === -1) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el ID: ${id} no se a encontrado`
                });
            }

            arrayUsers[userIndex] = {...req.body}; //capaz esto hay q convertirlo a javascript xq te viene un json, provicional mientras esta la db
            // tambien puede variar loa asignacion dependiendo de como se haga el formulario en el front, si se mandan todos los campos o solo los q se modificican

            res.send({
                status: "success",
                payload: arrayUsers[userIndex]
            })

        } catch (error) {
            console.log(error);
        }
    }

    static deleteUserById = async (req, res) => {
        try {

            const id = req.params.id;

            const userIndex = findIndex(id,arrayUsers);

            if (userIndex === -1) {
                return res.status(400).send({
                    status: "error",
                    payload: `El usuario con el ID: ${id} no se a encontrado`
                });
            }

            arrayUsers.splice(userIndex,1);

            res.send({
                status: "success",
                payload: {
                    msg: `El usuario con el ID: ${id} se elimino con exito`,
                    data: arrayUsers
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export { User };