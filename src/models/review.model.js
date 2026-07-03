import mongoose from "mongoose" //Importa la librería Mongoose para definir esquemas y modelos MongoDB

const reviewSchema = new mongoose.Schema({ //Crea un esquema que define la estructura de los documentos de reseñas
  productId: { 
    type: String, //ID del vinilo al que pertenece la reseña
    required: true //El campo es obligatorio
  },
  userId:  { 
    type: String, //ID del usuario que escribió la reseña,
    required: true //El campo es obligatorio
  },
  rating:  { 
    type: Number, //Puntuación de la reseña
    min: 1, max: 5, //Puntuación entre 1 y 5
    required: true //El campo es obligatorio
  },
  comment: { 
    type: String //Comentario opcional en la reseña
  } 
}, 
{ timestamps: true }) //Añade automaticamente los campos createdAt y updatedAt

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema) //Usando un framework como Next.js o herramientas de desarrollo que recargan eñ código en caliente (Hot Reload), Mongoose intentará duplicar el modelo y la app lanzará un error. Con esta validación te aseguras de que solo se cree si no existe.