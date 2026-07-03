import express from "express"; //Importa express para poder crear rutas
import { authController } from "../controllers/auth.controller.js"; //Importa con controladores de autenticación
import { authMiddleware } from "../middlewares/authenticate.js"; //Importa el middleware que verifica que el usuario está autenticado
import { requireRole } from "../middlewares/reqireRole.js"; //Importa el middleware que comprueba si el usuario tiene el rol requerido

const router = express.Router(); //Crea una instancia del enrutador de express

router.post("/api/auth/registre", authController.registre); //Ruta POST para registrar un nuevo usuario 
router.post("/api/auth/login", authController.login); //Ruta POST para iniciar sesión
router.post("/api/auth/logout", authController.logout); //Ruta POST para cerrar sesión

router.get("/profile", authMiddleware, authController.getProfile); //Ruta GET protegida que devuelve el perfil del usuario autenticado
router.get("/admin", authMiddleware, requireRole("admin"), authController.getAdmin); //Ruta GET protegida a la que solo pueden acceder usuarios con el rol admin

export default router; //Exporta las router para utilizarlo en el servidor