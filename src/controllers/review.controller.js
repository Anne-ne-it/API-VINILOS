import * as reviewService from "../services/review.service.js" //Importa todas las funciones del servicio de reseñas y las agrupa con el nombre reviewService

export const getAllReview = async (req, res) => { //Controlador para obtener todas las reseñas
  const review = await reviewService.getAllReview() //LLama al servicio para recuperar todas las reseñas de la base de datos
  res.json({ success: true, data: review }) //Devuelve una respuesta JSON con las reseñas obtenidas
}

export const getReviewById = async (req, res) => {
  const review = await reviewService.getReviewById(req.params.id)
  res.json({ success: true, data: review })
}

export const getReviewByProduct = async (req, res) => {
  const review = await reviewService.getReviewByProduct(req.params.productId)
  res.json({ success: true, dara: review})
}

export const createReview = async (req, res) => { //Controlador para crear una nueva reseña
  const review = await reviewService.createReview(req.body) //Envia los datos recividos en el body al servicio para crear una nueva reseña
  res.status(201).json({ success: true, data: review }) //Devuelve 201 creado, con la nueva reseña
}

export const updateReview = async (req, res) => { //Controlador para actualizar una reseña existente
  const review = await reviewService.updateReview(req.params.id, req.body) //Envia el ID de la URL y los nuevos datos del body al servicio para actualizar la reseña
  res.json({ success: true, data: review }) //Devuelve una respuesta JSON con la reseña actualizada
}

export const deleteReview = async (req, res) => { //Controlador para eliminar una reseña
  await reviewService.deleteReview(req.params.id) //Envia el ID de la URL al servicio para eliminar la reseña correspondiente
  res.json({ success: true }) //Devuelve una respuesta indicando que se realizó correctamente
}

export const reviewController = { getAllReview, getReviewById, getReviewByProduct, createReview, updateReview, deleteReview }