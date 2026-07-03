//Se registra después de todas las rutas en app.js, captura cualquier error en una url inexistente
export const notFound = (req, res, next) => { //Middleware para manejar rutas no encontradas
    res.status(404).json({ //Devuelve una respuesta con estado 404 y un mensaje de error
        ok: false,  //Indica que la operación no fue exitosa
        error: `Ruta no encontrada: ${req.method} ${req.url}`, //Mensaje de error indicando que la ruta no fue encontrada, incluye el método HTTP y la URL solicitada
    })

    next(); //Pasa el control al siguiente middleware, que en este caso sería el middleware de manejo de errores para capturar esta situación y devolver una respuesta adecuada
}