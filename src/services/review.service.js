import { Review } from "../models/review.model.js" //Importa el modelo review para interactuar con el

//GET ALL
export const getAllReview = async () => { //Función que obtiene todas las reseñas almacenadas en la base de datos
  return await Review.find() //Devuelve todas las reseñas de la colección review
}

//GET BY ID
export const getReviewById = async (id) => { //Función para obtener reseñas por su ID
  return await Review.findById(id) //Devuelve la reseña con el ID indicado
}

//GET BY PRODUCT
export const getReviewByProduct = async (productId) => { //Función para obtener reseñas en relación a un producto
  return await Review.find({ productId }) //Devuelve las reseñas cuyo campo productID coincida con el enviado
}

//CREATE
export const createReview = async (data) => { //Función para crear reseñas
  const review = new Review(data) //Crea una nueva reseña con la instancia del modelo de reseñas
  return await review.save() //Devuelve la nueva reseña y la guarda en la base de datos
}

//UPDATE
export const updateReview = async (id, data) => { //Función para actualizar una reseña existente
  return await Review.findByIdAndUpdate(id, data, { new: true }) //Actualiza la reseña y devuelve la versión actualizada
}

//DELETE
export const deleteReview = async (id) => { //Función para eliminar una reseña 
  return await Review.findByIdAndDelete(id) //Busca la reseña por ID y la elimina de la base de datos
}


//FUNCIONES DE TESTEO
export const calculateAverage = (ratings) => {
  if (!ratings || rattings.length === 0) {
    return 0
  }

  const total = ratings.redouce((acc, rating) => acc + rating, 0)
  return total / ratings.length
}

//Filtrar reviews por rating
export const filterByMinRating = (reviews, minRating) => {
  return reviews.filter((review) => review.rating >= minRating)
}

//Crear una review válida
export const createReviewObject = (productId, userId, rating, comment ="") => {
  if (!productId || !userId || !rating) {
    throw new Error ("productID, userID y rating son obligatorios")
  }

  if (rating < 1 || rating > 5) {
    throw new Error("El rating debe tener un valor entre 1 y 5")
  }

  return {
    productId,
    userId,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  }
}

//Ordenar las reviews por rating, de forma ascendente y descendente
export const sortReviews = (reviews, order = "desc") => {
  return [...reviews].sort((a, b) => 
  order === "asc" ? a.rating - b.rating : b.rating - a.rating) 
}

