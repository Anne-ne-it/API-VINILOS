//Se ejecuta antes del controller en la ruta POST /products, valida que los datos necesarios para crear un producto estén completos
export const validateProduct = (req, res, next) => { //Middleware para validar los datos de un producto antes de crear o actualizar
    const { title, author, price, stock } = req.body; //Obtiene los datos del producto desde el cuerpo de la solicitud

    if (!title || !author || !price || !stock) { //Comprueba si alguno de los campos necesarios para crear un producto no está completo
        return res.status(400).json({ //Si la validación falla, devuelve una respuesta con estado 400 y un mensaje de error
            ok: false, //Indica que la operación no fue exitosa
            error: "Es necesario completar todos los campos: title, author, price, stock", //Mensaje de error indicando que es necesario completar todos los campos para crear un producto
        })

    }
    next() //Si la validación es exitosa, pasa el control al siguiente middleware o al controlador para continuar con la creación o actualización del producto
}