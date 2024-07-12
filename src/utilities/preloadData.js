import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
//import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const prisma = new PrismaClient();

async function preloadData() {
  try {
    // Datos a precargar
    const users = [
      {
        image: 'imagen1.jpg',
        first_name: 'Juan',
        last_name: 'Pérez',
        email: 'juan@example.com',
        password: 'hashedPassword1',
        phone: '555-123456',
        gender: 'masculino',
        country: 'Argentina',
        birthDate: '1990-05-15',
      },
      {
        image: 'imagen2.jpg',
        first_name: 'María',
        last_name: 'Gómez',
        email: 'maria@example.com',
        password: 'hashedPassword2',
        phone: '555-654321',
        gender: 'femenino',
        country: 'Chile',
        birthDate: '1985-08-20',
      },
      // Agrega más datos según sea necesario
    ];

    const events = [
        {
            name: 'Conferencia de Tecnología',
            description: 'Una conferencia sobre las últimas tecnologías en desarrollo web y móvil.',
            start_date: '2024-08-15',
            end_date: '2024-08-16',
            max_capacity: 100,
            current_capacity: 0,
            type: 'in_person',
            online_link: false,
            state: 'approve', // Estado aprobado
            creation_date: new Date(),
          },
          {
            name: 'Taller de Diseño Gráfico',
            description: 'Aprende técnicas avanzadas de diseño gráfico con expertos del sector.',
            start_date: '2024-09-10',
            end_date: '2024-09-10',
            max_capacity: 50,
            current_capacity: 0,
            type: 'in_person',
            online_link: false,
            state: 'approve', // Estado aprobado
            creation_date: new Date(),
          },
          {

            name: 'Curso Online de Marketing Digital',
            description: 'Un curso intensivo para dominar las estrategias de marketing digital más efectivas.',
            start_date: '2024-07-20',
            end_date: '2024-08-20',
            max_capacity: 200,
            current_capacity: 0,
            type: 'online',
            online_link: true,
            state: 'approve', // Estado aprobado
            creation_date: new Date(),
          }
    ]

    const spaces = [
        {   
            name: 'Sala de Conferencias A',
            capacity: 50,
            description: 'Una sala de conferencias equipada con proyector y pantalla.',
            location: 'Edificio Principal, Piso 2',
            available: true,
          },
          {
            name: 'Sala de Reuniones B',
            capacity: 20,
            description: 'Una sala pequeña para reuniones de equipo.',
            location: 'Edificio Secundario, Piso 1',
            available: true,
          },
          { 
            name: 'Auditorio Principal',
            capacity: 200,
            description: 'El auditorio principal para eventos grandes y conferencias.',
            location: 'Edificio Principal, Auditorio',
            available: true,
          }
    ]

    // Insertar usuarios utilizando Prisma
    const createdUsers = await prisma.user.createMany({
      data: users,
    });

    const createdEvents = await prisma.event.createMany({
      data: events,
    });

    const createdSpaces = await prisma.space.createMany({
      data: spaces,
    });

    console.log('Datos precargados correctamente:', createdUsers);
    console.log('Datos precargados correctamente:', createdEvents);
    console.log('Datos precargados correctamente:', createdSpaces);
  } catch (error) {
    console.error('Error al precargar datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la función de precarga al iniciar el servidor
export default async function preloadMiddleware(req, res, next) {
    await preloadData();
    next();
  }