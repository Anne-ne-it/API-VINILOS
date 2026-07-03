import { Wishlist } from "../models/wishlist.model.js" //Importa el modelo wishlist para interactuar con la colección de lista de deseos

export const addToWishlist = async (userId, productId) => { //Función que añade un producto a la lista de deseos
    const wishlist = new Wishlist({ userId, productId }) //Crea una nueva instancia del modelo Wishlist con el usuario y el producto recibidos
    return await wishlist.save() //Lo guarda y devuelve el registro creado
}

export const getWishlistByUser = async (userId) => { //Función que obtiene la lista de deseos de un usuario
    return await Wishlist.find({ userId }) //Busca y devuelve todos los deseos cuyo userId coincide con el proporcionado
}

export const removeFromWishlist = async (id) => { //Función para eliminar un elemento de la lista de deseos
    return await Wishlist.findByIdAndDelete(id) //Busca el documento por su ID y lo elimina
}




//Funciones puras para test

//Añade un vinilo a la lista de deseos. No añade duplicados
export const addProductToWhislist = (list, productId) => {
    if (list.includes(productId)) {
        return list
    }
    return [...list, productId]
}

//Eliminar un vinilo de la lista de deseos
export const removeProductFromWishlist = (list, productId) => {
    return list.filter((id) => id !== productId)
}

//Comprobar si un vinilo está en la lista de deseos
export const isProductInWishlist = (list, productId) => {
    return list.includes(productId)
}