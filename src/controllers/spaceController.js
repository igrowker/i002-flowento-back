import {getSpaces, createSpace, getSpaceById, updateSpace, deleteSpace} from '../models/Space.js';

class Space {
    static allSpaces = async(req,res)=>{
        try {
            const spaces = await getSpaces();

            res.send({
                stattus: "success",
                payload: spaces
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getSpaceById = async(req,res)=>{
        try {
            const id = req.params.id;

            const space = await getSpaceById(parseInt(id));

            res.send({
                stattus: "success",
                payload: space
            })
        } catch (error) {
            console.log(error);
        }
    }

    static createSpace = async(req,res)=>{
        try {

            const space = await createSpace();

            res.send({
                stattus: "success",
                payload: space
            })
        } catch (error) {
            console.log(error);
        }
    }

    static updateSpace = async(req,res)=>{
        try {
            const id = req.params.id;

            const sapceNewInfo = { ...req.body, id };

            const updatedSpace = await updateSpace(sapceNewInfo);

            res.send({
                stattus: "success",
                payload: updatedSpace
            })
        } catch (error) {
            console.log(error);
        }
    }

    static deleteSpace = async(req,res)=>{
        try {
            const id = req.params.id;

            const deletedSpace = await deleteSpace(parseInt(id));

            res.send({
                stattus: "success",
                payload: deletedSpace
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export { Space };