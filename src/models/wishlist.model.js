import mongoose from "mongoose" //Importa la librería mongoose para definir esquemas y modelos mongoDB

const wishlistSchema = new mongoose.Schema({ //Crea un esquema que define la estructura de los documentos de lista de deseos
    userId: { //Campo que almacena el ID del usuario propietario de la lista de deseos
        type: String, //El valor debe ser una cadena de texto
        required: true, //El campo es obligatorio
    },
    productId: { //Campo que almacena el ID del producto añadido a la lista de deseos
        type: String, //El valor debe ser una cadena de texto
        required: true, //El campo es obligatorio
    },
    createdAt: { //Campo que almacena la fecha de creación del registro
        type: Date, //El valor debe ser una fecha
        default: Date.now, //Añade automáticamente la fecha y hora actuales al crear el documento
    },
})

export const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema) //Crea y exporta el modelo Wishlist para interactuar con la colección