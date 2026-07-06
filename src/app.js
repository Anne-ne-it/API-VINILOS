import express from 'express'; //Importa la librería express para crear el servidor y gestionar rutas
import cookieParser from 'cookie-parser'; //Importa el middleware que permite leer y procesar cookies
import helmet from 'helmet'; //Importa helmet para añadir cabeceras de seguridad HTTP

import cors from "cors"; //Importa cors para controlar qué orígenes pueden acceder a la API
import rateLimit from 'express-rate-limit'; //Importa el middleware que limita el número de peticiones

import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from './config/swagger.js';

import indexRoutes from "./routes/index.routes.js"; //Inporta las rutas generales
import authRoutes from "./routes/auth.routes.js"; //Importa las rutas relacionadas con autenticación
import reviewRoutes from "./routes/review.routes.js"; //Importa las rutas relacionadas con las reseñas
import wishlistRoutes from "./routes/wishlist.routes.js" //Importa las rutas relacionadas con la lista de deseos
import cartRoutes from "./routes/cart.routes.js"
import cloudinaryRoutes from "./routes/cloudinary.routes.js";

import { notFound } from "./middlewares/notFound.js"; //Importa el middleware para manejar rutas no encontradas
import { errorHandler } from "./middlewares/errorHandler.js"; //Importa el middleware para manejar errores


const app = express(); //Crea la solicitud de la aplicación express

app.use(express.json()); //Permite que express entienda datos en json
app.use(cookieParser()); //Permite acceder a las cookies desde req.cookies
app.use(helmet()); //Añade medidas de seguridad mediante cabeceras HTTP

app.use( //Crea una configuración para limitar peticiones
    cors({ //Configura las reglas de acceso entre distintos dominios
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"], //Permite peticiones desde el origen indicado
        credentials: true, //Permite enviar cookies y credenciales entre el cliente y el servidor
        methods: ["GET", "POST", "PUT", "DELETE"], //Define los metodos HTTP permitidos
        allowedHeaders: ["Content-type"], //Define las cabeceras permitidas en las peticiones
    }),
)

const limiter = rateLimit({ //Crea la configuración para limitar el número de peticiones
    windowMs: 60 * 1000, //Establece una ventana de tiempo de 1 minuto en milisegundos
    max: 10, //Permite un máximo de 10 peticiones por minuto desde desde el mismo IP
    message: { //Establece el mensaje que recibirá el cliente al superar el limite de peticiones
        ok: false, //Indica que la operación no fue exitosa
        error: "Demasiadas peticiones, inténtalo de nuevo en 1 minuto." //Mensaje de error mostrado al usuario
    }
})
app.use(limiter); //Aplica el limitador de peticiones a toda la aplicación

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api", indexRoutes); //Asigna el prefijo /api a las rutas generales
app.use("/api/auth", authRoutes); //Asigna el prefijo /api/auth a las rutas de autenticación
app.use("/api", reviewRoutes) //Asigna el prefijo /api a las rutas de reseñas
app.use("/api", wishlistRoutes) //Asigna el prefijo /api a las rutas de la lista de deseos
app.use("/api/cart", cartRoutes); //Asigna el prefijo /api/cart a las rutas del carrito
app.use("/api/products", cloudinaryRoutes);

app.use(notFound); //Maneja las rutas no encontradas
app.use(errorHandler); //Maneja los errores de la aplicación

export default app; //Exporta la configuración para que server.js pueda usarla