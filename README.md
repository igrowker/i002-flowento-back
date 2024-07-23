# Backend de Flowento

![image](https://github.com/user-attachments/assets/e0d67be2-2bab-4512-b222-f0b665c8aa30)

## Descripción General

Flowento es una aplicación digital mobile-first y SPA (Single Page Application) diseñada para la gestión y comunicación de eventos del Hub de Empresas (HdE) de Valencia. Este backend está destinado a manejar la lógica del servidor, la gestión de la base de datos y la comunicación con el frontend, facilitando la interacción entre organizadores y asistentes.

## Problema que se intenta resolver

HdE enfrenta ineficiencias en la gestión de eventos debido a procesos manuales y falta de digitalización. La propuesta y aprobación de eventos, así como las inscripciones y el control de asistencia, se manejan manualmente, lo que complica el seguimiento y análisis de la participación.

## Solución Propuesta

Crear una API RESTful que centralice la creación, inscripción, seguimiento y evaluación de eventos, reemplazando los procesos manuales con una plataforma automatizada e intuitiva.

## Tecnologías Utilizadas

- **Lenguaje**: Node.js
- **Framework**: Express
- **Base de Datos**: PostgreSQL
- **ORM**: Sequelize
- **Autenticación**: JWT
- **Seguridad**: Bcrypt
- **WebSockets**: Socket.io
- **Generación de QR**: QRCode

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL del repositorio]

Navega al directorio del backend:
bash
Copiar
cd [nombre-del-backend]

Instala las dependencias:
bash
Copiar
npm install
Configuración
Crea un archivo .env en la raíz del proyecto y añade las siguientes variables de entorno:

ini
Copiar
DATABASE_URL=[url de la base de datos]
JWT_SECRET=[secreto para JWT]
PORT=[puerto en el que correrá el servidor]

## Ejecución
Para iniciar el servidor, utiliza el siguiente comando:

bash
Copiar
npm start
Endpoints Principales
Autenticación
POST /auth/register: Registro de nuevos usuarios.
POST /auth/login: Autenticación de usuarios.

## Gestión de Eventos
GET /events: Obtener todos los eventos.
POST /events: Crear un nuevo evento (solo usuarios autorizados).
GET /events/:id: Obtener detalles de un evento específico.
PUT /events/:id: Actualizar un evento específico (solo usuarios autorizados).
DELETE /events/:id: Eliminar un evento específico (solo administradores).

## Inscripciones
POST /events/register: Inscripción a un evento.
POST /events/attend: Confirmación de asistencia a un evento.

## Usuarios
GET /users: Obtener todos los usuarios.
GET /users/:id: Obtener detalles de un usuario específico.
PUT /users/:id: Actualizar información de un usuario específico.
DELETE /users/:id: Eliminar un usuario específico (solo administradores).

## Espacios
GET /spaces: Obtener todos los espacios.
POST /spaces: Crear un nuevo espacio (solo administradores).
GET /spaces/:id: Obtener detalles de un espacio específico.
PUT /spaces/:id: Actualizar un espacio específico (solo administradores).
DELETE /spaces/:id: Eliminar un espacio específico (solo administradores).

## Notificaciones
GET /notifications: Obtener todas las notificaciones.
POST /notifications: Crear una nueva notificación.
Mensajes
GET /messages: Obtener todas las conversaciones.
POST /messages: Enviar un nuevo mensaje.

## Códigos QR
GET /qr/generate/:eventId: Generar código QR para un evento.
POST /qr/scan: Escanear código QR y registrar asistencia.

## Arquitectura
La arquitectura del backend está diseñada para ser modular y escalable. Utiliza controladores para manejar la lógica de negocio y rutas para definir los endpoints de la API. Se implementan middlewares para la autenticación y gestión de roles.

## Controladores
authController.js: Maneja la autenticación y registro de usuarios.
eventController.js: Gestiona la creación, actualización, eliminación y consulta de eventos.
userController.js: Gestiona las operaciones relacionadas con los usuarios.
spaceController.js: Maneja la gestión y reserva de espacios.
notificationController.js: Gestiona el envío y consulta de notificaciones.
messageController.js: Maneja el envío y recepción de mensajes internos.
qrController.js: Gestiona la generación y escaneo de códigos QR para la asistencia a eventos.

## Modelos
Los modelos representan las tablas de la base de datos y definen las relaciones entre ellas. Utilizan Sequelize para mapear las entidades de la base de datos a objetos de JavaScript.

User.js: Representa la tabla de usuarios.
Event.js: Representa la tabla de eventos.
Registration.js: Representa la tabla de inscripciones a eventos.
Feedback.js: Representa la tabla de feedback de eventos.
Notification.js: Representa la tabla de notificaciones.
Message.js: Representa la tabla de mensajes enviados.
QrCode.js: Representa la tabla de códigos QR generados para eventos.
Space.js: Representa la tabla de espacios.
Reservation.js: Representa la tabla de reservas de espacios.

## Seguridad
La autenticación se maneja mediante JWT, asegurando que solo los usuarios autenticados puedan acceder a ciertas rutas. Se implementan prácticas recomendadas para la protección contra ataques comunes.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia [Nombre de la Licencia].
