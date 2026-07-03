import "dotenv/config"
import app from "./app.js"; //Importa la configuración de la aplicación express
import connectMongo from "./config/mongo.js"; //Importa la función encargada de conectar con MongoDB

const PORT = process.env.PORT || 3000;

const startServer = async () => { //Declara la función asincrona encargada de ejecutar el servidor
    connectMongo() //Ejecuta la conexión con la base de datos MongoDB

    app.listen(PORT, () => { //Inicia el servidor en el puerto antes definido
    console.log(`Servidor escuchando en http://localhost:${PORT}`) //Muestra un mensaje de éxito en la consola
    });
}

startServer() //Ejecuta la función para arrancar el servidor