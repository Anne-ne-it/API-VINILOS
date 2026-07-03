//Se registra al final de app.js para manejar cualquier error que ocurra, captura cualquier error que ocurra y devuelve una respuesta con el mensaje de error y un estado 500 
export const errorHandler = (error, req, res, next) => { //Middleware para manejar errores en la aplicación

    console.error("Error", error.message); //Imprime el error en la consola para propósitos de depuración

    res.status(500).json({ //Devuelve una respuesta con estado 500 indicando un error interno del servidor
        ok: false, //Indica que la operación no fue exitosa
        message: 'Error interno del servidor', //Mensaje de error genérico
    });
}