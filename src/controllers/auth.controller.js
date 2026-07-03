import { authService } from "../services/auth.service.js"; //Importa el servicio de autenticación que contiene la lógica de negocio

const cookieOptions = { //Objeto con la configuración de las cookies
    httpOnly: true, //Impide que el javascrypt del navegador acceda a la cookie
    secure: process.env.NODE_ENV === "production", //Permite enviar la cookie por HTTP
    maxAge: 2 * 60 * 60 * 1000, //Duración de la cookie: 2h en milisegundos
}

const registre = async (req, res) => { //Controlador para registar un nuevo usuario
    try { //Intenta ejecutar el código de registro
        const newUser = await authService.registre (req.body) //Envia los datos recibidos en el body al sevidor para crear un usuario
        res.status(201).json({ //Devuelve una respuesta HTTP 201 (creado)
            ok: true, //Indica que la operación fue exitosa
            data: newUser //Devuelve los datos del usuario creado
        })
    } catch (error){ //Captura cualquier error durante el nuevo registro
        res.status(500).json({ //Devuelve error interno del servidor
            ok: false, //Indica que la operación no fue exitosa
            error: "Error interno del servidor" //Devuelve un mensaje de error
        })
    }
}

const login = async (req, res) => { //Controlador para iniciar sesión
    try { //Intenta ejecutar el proceso de login
        const { email, password } = req.body //Extrae emial y password del cuerpo de la petición

        const token = await authService.login(email, password) //Verifica credenciales y genera un token con JWT

        res.cookie("token", token, cookieOptions) //Guarda el token en una cookie

        res.json({ //Si todo va bien...
            ok: true, //Indica que el login fue correcto
            message: "El login se realizó con éxito" //Muestra un mensaje de confirmación
        })
    } catch (error) { //Captura cualquier error del login
        res.status(401).json({ //Devuelve error 401 no autorizado
            ok: false, //Indica que la operación no fue exitosa
            error: error.message, //Muestra el mensaje de error recibido
        })
    }
}


const logout = (req, res) => { //Controlador para cerrar sesión
    res.clearCookie("token") //Elimina la cookie donde guardamos el token
    res.json({ //Si todo va bien...
        ok: true, //Indica que la operación fue un exito
        message: "Sesión cerrada" //Muestra un mensaje de confirmación
    })
}

const getProfile = (req, res) => { //Controlador para obtener el perfil del usuario utenticado
    res.json({ //Si todo va bien...
        ok: true, //Indica que la operación fue exitosa
        data: { //Devuelve un objeto con los datos del usuario
            id: req.user.id, //ID del usuario obtenido del middleware de autenticación
            email: req.user.email, //Email del usuario autenticado
            role: req.user.role, //Rol del usuario (user, admin, etc)
        },
    })
}

const getAdmin = (req, res) => { //Controlador para una ruta exclusiva de admins
    res.json({ //Si todo va bien...
        ok: true, //Indica que la operación fue exitosa
        message: `Bienvenido al panel de admin, ${req.user.email}`, //Devuelve un mensaje personalizado con el email de la persona autenticada
    })
}

export const authController = { registre, login, logout, getProfile, getAdmin } //Exporta un objeto que agrupa todos los controladores de autenticación 