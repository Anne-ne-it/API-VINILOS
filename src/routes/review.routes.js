import express from 'express' //Importa express para poder crear un router de rutas HTTP
import * as reviewController from "../controllers/review.controller.js" //Importa todas las funciones del controlador de reseñas

const router = express.Router(); //Crea una instacia del router de express para definir rutas modulares

router.get("/review", reviewController.getAllReview) //Ruta GET para ontener todas las reseñas

router.get("/review/:id", reviewController.getReviewById) //Ruta GET para obtener una reseña por su ID

router.get("/review/product/:productId", reviewController.getReviewByProduct) //Ruta para obtener una reseña en relación a un producto

router.post("/review", reviewController.createReview) //Ruta POST para crear una nueva reseña

router.put("/review/:id", reviewController.updateReview) //Ruta PUT para actualizar una reseña existente

router.delete("/review/:id", reviewController.deleteReview) //Ruta DELETE para eliminar una reseña existente

export default router