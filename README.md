# Flowento BACK

### Introducción
Este informe proporciona una descripción general del back-end de un proyecto, incluyendo su arquitectura, tecnologías utilizadas, funcionalidades

### Para iniciar el servidor
1. npm install
2. node .\src\app.js 
3. opcion alternatica a 3. : node --watch .\src\app.js (Node JS V.18.11.0 o superior)

### Arquitectura
La arquitectura del back-end se basa en una arquitectura de microservicios, compuesta por una serie de servicios independientes y escalables. Esta arquitectura permite una mayor flexibilidad, modularidad y facilidad de mantenimiento.

Los servicios principales del back-end incluyen:

1. Servicio de autenticación: Responsable de la autenticación y autorización de usuarios.

2. Servicio de datos: Proporciona acceso a la base de datos y a los datos del proyecto.

3. Servicio de lógica de negocio: Implementa la lógica de negocio del proyecto.

### Tecnologías utilizadas
1. Lenguaje de programación: JavaScript
2. Framework web: React JS
3. Servidor: Node JS
4. Framework Back: Express JS
5. Base de datos: PostgreSQL
6. ORM : Prisma ORm
7. Mensajes: Nodemailer
8. Herramientas de testing: Postman

### Funcionalidades
1. Gestión de usuarios: Registro, autenticación y autorización de usuarios.
2. Gestión de datos: Almacenamiento, recuperación y actualización de datos.
3. Lógica de negocio: Implementación de la lógica de negocio del proyecto.
4. Comunicación: Facilita la comunicación entre los microservicios.
5. Manejo de errores: Facilita el manejo de errores

#### Package
1. bcrypt : Para la validacion y encriptacion de la contraseañas
2. cors : Para permitir el acceso al servidor desde otros puertos
3. dotenv (DEV) : Manejo de variables de entorno
4. jsonwebtoken : Manejo de token para guardar informacion no sensible del usuario
5. mongoose : Para la creacion de schemas y manejo de los datos de la DB
6. nodemailer : Manejo de mensajeria, evia emails con informacion sobre registro, adopcion, etc


### Arquitectura de carpetas

* ./src
    1. carpeta contenedora de rutas, controladores, modelos, configuraciones

* ./src/app.js
    1. configuracion para el funcionamiento de express, rutas, cors

* ./src/config
    1. config.js --> manejador de variables de entorno con dotenv
    2. cloudinaryConfig.js --> configuracion cloudinary

* ./src/controllers
    1. adminController.js --> logica de negocios para admin-eventos
    2. authController.js --> logica de negocios para sistema de login / registro
    3. eventController.js --> logica para el manejo de eventos (CRUD, feedback, registro a eventos)
    4. spaceController.js --> logica para la CRUD de espacios
    5. userController.js --> logica para el CRUD de usuarios
    6. qrController.js --> generador de QR con qrcode

* ./src/middelwares
    1. uploader.js --> middelware trabajado con multer para el alamcenamientos de img,docs,etc
    2. roleMiddelware.js --> middelware usado para el check de roles para limitar el acceso a ciertos endpoints
    3. authMiddelware.js --> middelware para comprobar que el usuario autenticado

* ./src/models
    1. Event.js --> manager para los eventos en la DB
    2. Feddback.js --> manager para los comentarios
    3. Provider.js --> manager para la creacion de provedores de eventos
    4. QrCode.js --> manager para la creacion y obtencion de QR
    5. Registration.js --> manager para el registro a eventos
    6. Reservation.js --> manager para la reserva de espacios para eventos
    7. Space.js --> manager para CRUD de espacios
    8. User.js --> manager para CRUD de ususarios

* ./src/public
    1. js --> scripts
    2. img --> imagenes

* ./src/routes
    1. adminRoutes.js --> endpoints admin-eventos
    2. authRoutes.js --> endpoints login, registro, logout, resetpassword
    3. qrRoutes.js --> endpoints obtencion y creacion del QR
    4. spaceRoutes.js --> endpoints para CRUD de espacios para eventos
    5. userRoutes.js --> endpoints para CRUD de usuarios

* ./src/controllers
    1. emailService.js --> implementacion del servico de envio de emails con nodemailer
    2. notas para el manejo de prisma

* ./src/utils.js --> manejo de contraseñas, rutas absolutas

* ./prisma
    1. schema.prisma --> schemas para las tablas de la DB
    2. migrations --> transpilacion de los schemas a codigo PostgreSQL

* .env
    1. variables de entorno
* package.json
    1. archivo de dependencias del proyecto

## Rutas 
```javascript
//ejemplo de rutas
import { Router } from 'express';
import { Space } from '../controllers/spaceController.js';
import { checkRol } from '../middlewares/roleMiddleware.js';
import { authCheck } from '../middlewares/authMiddleware.js';

const router = Router();

router.get("/", authCheck(), checkRol(["admin"]), Space.allSpaces);

export default router;
```

## Controllers 
```javascript
//ejemplo de controllers
import jwt from 'jsonwebtoken';
import { getUsers, getUserByEmail, createUser, updateUser } from '../models/User.js';
import { createHashPassword, isValidPassword } from '../utils.js'
import { options } from '../config/config.js';
import { emailSender, generateEmailToken, sendRecoverPassword } from '../utilities/emailService.js';

class AuthController {
    static logout = async (req, res) => {
        try {
            const tokenInfo = req.cookies[option.COOKIE_WORD];

            const decodedToken = jwt.decode(tokenInfo);

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
}

export { AuthController };
```