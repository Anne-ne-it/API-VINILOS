import { Router } from 'express' //Importa el enrutador de express para definir rutas
import productsRoutes from "../routes/products.routes.js"; //Importa las rutas de productos para usarlas

const router = Router(); //Crea una instancia del enrutador para definir rutas separadas

//Rutas de productos
router.use("/products", productsRoutes); //Asigna el prefijo a las rutas

//Ruta raiz
router.get("/", (req, res) => { //Define una ruta get para la url base
res.json({ ok: true, message: "Api funcionando" }); //Envia unas respuesta exitosa con un mensaje de confirmación en formato json
});

//Get health para obtener el estado del sistema
router.get('/health', (req, res) => { //Define una ruta get en /health
    res.json({ //Envia un objeto json con información técnica
        status: "ok", //Indica que el servidor está saludable
        uptime: process.uptime(), //Devuelve el tiempo en seg que el servidor lleva encendido
        timestamp: new Date().toISOString(), //Genera la hora y fecha actual
    });
});

export default router //Exporta el enrutador para que pueda ser importado en app.js