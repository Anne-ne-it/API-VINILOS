import bcrypt from 'bcrypt'; //Importa bcrypt para cifrer y comparar las contraseñas
import jwt from 'jsonwebtoken'; //Importa jsonwebtoken para crear y verificar tokens JWT
import prisma from '../config/prismaClient.js'; //Importa la instancia prisma para poder acceder a la base de datos

const login = async (email, password) => { //Función que gestiona el inicio de sesión del usuario
    if (!email || !password) { //Comprueba uno u otro campo existen
        throw new Error('Email o contraseña no son correctas') //Lanza un error para evitar evitar revelar si el email existe
    }

    const user = await prisma.user.findUnique({ //Busca un usuario en la base de datos
        where: { email } //Busca el usuario por su email
    })

    if (!user) { //Si no encuentra ningún usuario con ese email
        throw new Error('Usuario no existente') //Lanza un error para evitar evitar revelar si el email existe
    }

    const isValid = await bcrypt.compare(password, user.password) //Compara la contraseña recibida con la contraseña cifrada almacenada

    if (!isValid) { //Comprueba si las contraseñas coinciden
        throw new Error('Email o contraseña no son correctas') //Si no coinciden lanza un error de auntenticación
    }

    const token = jwt.sign({ //Genera un token JWT con información del usuario 
        id: user.id, //Guarda el ID del usuario dentro del token
        email: user.email, //Guarda el email del usuario dentro del token
        role: user.role //Guarda el rol del usuario dentro del token
    }, process.env.JWT_SECRET, //Utiliza la clave secreta almacenada en las claves de entorno 
    { expiresIn: '2h'} //Define el limite de tiempo en el que expira el token
)

return token //Devuelve el token generado al controlador
}

const registre = async (email, password, role) => { //Crea una función que registra un nuevo usuario 
    const hash = await bcrypt.hash(password, 10) //Encripta la contraseña utilizando 10 rondas de saltos
    return await prisma.user.create({ //Crea un nuevo usuario en la base de datos
        data: { email, password: hash, role } //Guarda el email, la contraseña cifrada y el rol
    })
}

export const authService = { login, registre } //Exporta las funciones del servicio agrupadas en un objeto
