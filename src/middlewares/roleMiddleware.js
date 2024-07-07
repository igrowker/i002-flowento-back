import jwt from 'jsonwebtoken';

export const checkRol = (roles)=>{
    return (req,res,next)=>{

        const tokenInfo = req.cookies["jwt-cookie"]; //nombre provicinal

        const decodedInfo = jwt.decode(tokenInfo);

        if (!roles.includes(decodedInfo.rol)) {
            return res.status(401).send({
                status : "error",
                payload : "El usuario no esta autorizado para entrar a esta pagina"
            }) 
        }

        next();
    }
}
