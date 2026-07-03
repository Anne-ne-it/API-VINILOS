//Validar datos, Manejar errores, Llamar a los servicios, Devolver respuestas

import { productService } from '../services/products.service.js'; //Importa el servicio de productos para interactuar con la lógica de relacionada con los productos

const getAllProducts = async (req, res, next) => { //Controlador para obtener todos los productos
    try { //Intenta ejecutar el bloque de código para obtener todos los productos
        const data = await productService.getAllProducts(); //Llama al servicio para obtener todos los productos
        res.json({ //Devuelve una respuesta json con los productos obtenidos
            ok: true, //Indica que la operación fue exitosa
            data: data, //Los productos obtenidos del servidor
        })
    } catch (error) { //Si ocurre un error durante la ejecución del bloque try, se captura el error y se maneja aquí
        next(error); //En caso de error, pasa el error al middleware de manejo de errores
    }
}

const getProductById = async (req, res, next) => { //Controlador para obtener un producto por su id
   try { //Intenta ejecitar el bloque de código para obtener un producto por su id
    const id = parseInt(req.params.id); //Obtiene el id del producto desde los parámetros de la solicitud y lo convierte a un número entero
    const product = await productService.getProductById(id); //Llama al servicio para obtener un producto por su id

    if (!product) { //Si no se encuentra el producto con el id proporcionado
        return res.status(404).json({ //Devuelve una respuesta con estado 404 y un mensaje indicando el error
            ok: false, //Indica que la operación no fue exitosa
            message: `Producto con id ${id} no encontrado`, //Mensaje de error indicando que el producto no fue encontrado
        })
    }
    res.json({ //Si el producto se encuentra, devuelve una respuesta json con el producto encontrado
        ok: true, //Indica que la operación fue exitosa
        data: product, //El producto encontrado con el id proporcionado
        })
   } catch (error) { //Si ocurre un error durante la ejecución del bloque try, se captura el error y se maneja aquí
        next(error); //En caso de error, pasa el error al middleware de manejo de errores
   }
}

const createProduct = async (req, res, next) => { //Controlador para crear un nuevo producto
    try { //Intenta ejecutar el bloque de código para crear un nuevo producto
        const { title, author, price, stock } = req.body; //Obtiene los datos del nuevo producto desde el cuerpo de la solicitud
        const newProdcut = await productService.createProduct({ title, author, price, stock }); //Llama al servicio para crear un nuevo producto con los datos proporcionados
    
    res.status(201).json({ //Devuelve una respuesta con estado 201 indicando que el recurso fue creado exitosamente, junto con el nuevo producto creado
        ok: true, //Indica que la operación fue exitosa
        data: newProduct, //El nuevo producto creado con los datos proporcionados
    })
    } catch (error){
        next(error); //En caso de error, pasa el error al middleware de manejo de errores
    }
}

const updateProduct = async (req, res, next) => { //Controlador para actualizar un producto existente por su id
    try { //Intenta ejecutar el bloque de código para actualizar un producto por su id
        const id = parseInt(req.params.id); //Obtiene el id del producto a actualizar desde los parámetros de la solicitud y lo convierte a un número entero
        const updatedProduct = await productService.updateProduct(id, req.body); //Llama al servicio para actualizar un producto específico por su id con los nuevos datos proporcionados en el body

        if (!updatedProduct) { //Si no se encuentra el producto con el id proporcionado
            return res.status(404).json({ //Devuelve una respuesta con estado 404 y un mensaje indicando el error
                ok: false, //Indica que la operación no fue exitosa
                message: `Producto con id ${id} no encontrado`, //Mensaje de error indicando que el producto no fue encontrado
            })
        }
        res.json({ //Si el producto se encuentra, devuelve una respuesta json con el producto actualizado
            ok: true, //Indica que la operación fue exitosa
            data: updatedProduct, //El producto actualizado con los nuevos datos proporcionados
        })
    } catch (error) { //Si ocurre un error durante la ejecución del bloque try, se captura el error y se maneja aquí
        next(error); //En caso de error, pasa el error al middleware de manejo de errores
    }
}

const deleteProduct = async (req, res, next) => { //Controlador para eliminar un producto por su id
    try { //Intenta ejecutar el bloque de código para eliminar un producto por su id
        const id = parseInt(req.params.id); //Obtiene el id del producto a eliminar desde los parámetros de la solicitud y lo convierte a un número entero
        const deletedProduct = await productService.deleteProduct(id); //Llama al servicio para eliminar un producto específico por su id

        if (!deletedProduct) { //Si no se encuentra el producto con el id proporcionado
            return res.status(404).json({ //Devuelve una respuesta con estado 404 y un mensaje indicando el error
                ok: false, //Indica que la operación no fue exitosa
                message: `Producto con id ${id} no encontrado`, //Mensaje de error indicando que el producto no fue encontrado
            })
        }
        res.json({ //Si el producto se encuentra, devuelve una respuesta json con el producto eliminado
            ok: true, //Indica que la operación fue exitosa
            data: deletedProduct, //El producto eliminado
        })
    } catch (error) { //Si ocurre un error durante la ejecución del bloque try, se captura el error y se maneja aquí
        next(error); //En caso de error, pasa el error al middleware de manejo de errores
    }
}

export const productsController = { //Exporta un objeto con todas las funciones del controlador de productos para que puedan ser utilizadas en otras partes de la aplicación
    getAllProducts, //Controlador para obtener todos los productos
    getProductById, //Controlador para obtener un producto por su id
    createProduct, //Controlador para crear un nuevo producto
    updateProduct, //Controlador para actualizar un producto existente por su id
    deleteProduct, //Controlador para eliminar un producto por su id
}