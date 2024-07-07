import jwt from 'jsonwebtoken';

export const authCheck = ()=>{
    return (req,res,next)=>{
        const tokenInfo = req.cookies["jwt-cookie"]; //nombre provicinal

        const decodedInfo = jwt.decode(tokenInfo);

        if (!decodedInfo) {
            return res.status(404).send({
                status : "error",
                payload : "El usuario no inicio secion"
            })
        }

        next();
    }
}