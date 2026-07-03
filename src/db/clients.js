import bcrypt from 'bcrypt'; //Importa bcrypt para el hashing de contraseñas
import prisma from "../config/prismaClient.js"; //Importa la instancia de PrismaClient para interactuar con la base de datos

const users = [ //Array de usuarios con sus email, contraseñas y roles
    {email: "ane@example.com", password: "ane123password", role: "admin"},
    {email: "flor@example.com", password: "flor123password", role: "user"},
    {email: "maider@example.com", password: "maider123password", role: "user"},
    {email: "admin@example.com", password: "admin123password", role: "admin"},
]

for (const user of users) { //Itera sobre cada usuario del array
    const hash = await bcrypt.hash(user.password, 10) //Crea una contraseña hasheada usando bcrypt con un loop de 10 rondas

    await prisma.user.upsert({ //Usa el método upsert de Prisma para insertar o actualizar el usuario en la base de datos
        where: { email: user.email }, //Busca el usuario por su email
        update: {}, //Si el usuario ya existe, no hace ninguna actualización
        create: { email: user.email, password: hash, role: user.role } //Si el usuario no existe, lo crea con el email, la contraseña hasheada y el role
    })
}

await prisma.$disconnect() //Desconecta la instancia de PrismaClient después de completar las operaciones en la base de datos