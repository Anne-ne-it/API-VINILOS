import jwt from "jsonwebtoken"; //Importa la librería jsonwebtoken para verificar y decodificar tokens JWT

export const authMiddleware = (req, res, next) => { //Middleware que protege rutas verificando qu el usuario está autenticado (sesión iniciada)
    const token = req.cookies.token //Obtiene el token JWT almacenado en la cookie llamada "token"

    if(!token) { //Comprueba si no existe ningún token en las cookies
        res.status(401).json({ //Devuelve una respuesta HTTP 401 (no autorizado)
            ok: false, //Indica que la operación no fue exitosa 
            error: "No autenticado", //Mensaje indicando que el usuario no ha iniciado sesión
        })
    }

    try { //Intenta verificar que el token sea valido
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //Verifica el token usando la clave secreta y obtiene su contenido decodificado
        req.user = decoded //Guarda los datos decodificados en req.user para poder usarlos en siguientes middlewares o controladores
        next() //Para que continue con el siguiente middleware o controlador de la ruta
    } catch (error) { //Captura cualquier error si el token no es valido o ha expirado
        res.clearCookie("token") //Elimina la cookie del token para evitar que se siga usando
        res.status(401).json({ //Devuelve una respuesta HTTP 401 (no autorizado)
            ok: false, //Indica que la operación no fue exitosa
            error: "Sesión inválida o expirada" //Mensaje indicando que el token ya no es valido
        })
    }
}