//Conecta cada endpoint con su controlador
import express from "express"; //Importa el framework express
import { productsController } from "../controllers/products.controller.js"; //Importa el controlador de productos para manejar la lógica de cada ruta
import { validateProduct } from "../middlewares/validateProduct.js"; //Importa el middleware de validación de productos para validar los datos de entrada
import { requireRole } from "../middlewares/reqireRole.js";

const router = express.Router(); //Crea la instancia del enrutador para definir rutas separadas

router.get("/", productsController.getAllProducts); //Define una ruta get para la url base
router.get("/:id", productsController.getProductById); //Define una ruta get para obtener un producto por el id
router.post("/", validateProduct, requireRole, productsController.createProduct); //Define una ruta post para crear un nuevo producto
router.put("/:id", validateProduct, productsController.updateProduct); //Define una ruta put para actualizar un producto existente
router.delete("/:id", productsController.deleteProduct); //Define una ruta delete para eliminar un producto por el id

export default router; //Exporta el enrutador para usarlo en app.js