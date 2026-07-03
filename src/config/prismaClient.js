import { PrismaPg } from '@prisma/adapter-pg'; //Es un adaptador para conectar Prisma con PostgreSQL
import { PrismaClient } from '@prisma/client'; //Es la herramienta principal de Prisma para hacer peticiones a la base de datos

const adapter = new PrismaPg({connectionString: process.env.DIRECT_URL}); //Crea una instancia del adaptador con la cadena de conexión a la base de datos
const prisma = new PrismaClient ({ adapter }); //Crea una instancia de PrismaClient utilizando el adaptador

export default prisma; //Exporta la instancia de PrismaClient para que pueda ser utilizada en otras partes de la aplicación