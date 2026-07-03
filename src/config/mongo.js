import "dotenv/config"
import mongoose from "mongoose"; //Importa la libreria de mongoose para conectar y trabajar con mongodb

const connectMongo = async () => { //Exporta una función asincrona que se encargará de trabajar conectar con mongodb
    try { //Inicia el bloque de código donde se intenta hacer la conexión
        await mongoose.connect(process.env.MONGO_URI) //Intenta conectarse a mongodb usando la variable almacenada con URI
        console.log("¡Mongo conectado!") //Mensaje de que la conexión fue exitosa
    } catch (error) { //Captura cualquier error que ocurra durante el intento de conexión
        console.error("Error al conectar MongoDB: ", error.message) //Muestra en consola el mensaje de error recibido
    }
}

export default connectMongo