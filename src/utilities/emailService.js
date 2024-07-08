import nodemailer from "nodemailer";
// import { options } from "./config.js";

// flowentoNodemailer
// adnv uisq hptw mmbu

//credenciales
const adminEmail = process.env.EMAIL_NODEMAILER || "flowentoa@gmail.com";
const adminPass = process.env.EMAIL_PASSWORD || "adnvuisqhptwmmbu";

//configurar el canal de comunicacion entre node y gmail
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: adminEmail,
        pass: adminPass
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
})

export const emailSender = async (email, template, subject = "Atencion al cliente") => {
    try {

        const contenido = await transporter.sendMail({
            //Estructura del correo
            from: "Flowento",
            to: email,
            subject,
            html: template
        })

        return true;

    } catch (error) {
        console.log(error.message);

        return false;
    }
}


export const generateEmailToken = (email, expireTime) => {
    const token = jwt.sign({ email }, process.env.EMAIL_TOKEN, { expiresIn: expireTime });

    return token;
}

export const verifyEmailToken = (token) => {
    try {
        const info = jwt.verify(token, process.env.EMAIL_TOKEN);

        return info.email;

    } catch (error) {
        console.log(error);
        return null;
    }
}

// funcion de recuperacion de contraseña
export const sendRecoverPassword = async (email, token, hostname) => {
    
    let link = "";

    if (hostname.includes("onrender")) {
        link = `https://i002-flowento-back.onrender.com/resetPassword?token=${token}`;
    }
    else{
        link = `http://localhost:8080/resetPassword?token=${token}`;
    }

    const template = `
    <div>
        <h1>Solicitaste un cambio de contraseña!!</h1>
        <p>El siguiente link permitira restablecer tu contraseña</p>
        <a href="${link}">Restablecer contraseña</a>
    </div>
    `

    const subject = "Restablecer contraseña";

    const resultEmail = await emailSender(email, template, subject);

    return resultEmail;
}