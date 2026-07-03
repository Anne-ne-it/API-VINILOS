export const requireRole = (role) => { //Exporta una función que recibe el rol requerido para acceder a una ruta
    return (req, res, next) => { //Devuelve un middleware que se ejecuta cuando de acceda a la ruta protegida
        if (!req.user || req.user.role !== role) { //Comprueba si no existe un usuario autenticado o si su rol no coincide con el requerido
            return res.status(403).json({ //Devuelve una respuesta HTTP 403 (acceso prohibido)
                ok: false, //Indica que la operación no fue exitosa
                error: `Acceso denegado. Se requiere rol ${role}` //Muestra el rol neceasrio para acceder a la ruta
            })
        }
        next() //Pasa al siguiente middleware o controler
    }
}