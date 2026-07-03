//getAllProducts() getProductById(id) createProduct(data) updateProduct(id,data) deleteProduct(id)

import prisma from "../config/prismaClient.js"; //Importa la instancia de PrismaClient para interactuar con la base de datos

const getAllProducts = () => { //Función para obtener todos los productos
    return prisma.product.findMany({ //Utiliza Prisma para encontrar todos los productos en la base de datos
        orderBy: { id: "asc"}, //Ordena los productos por su id en orden ascendente
    })
}

const getProductById = (id) => {  //Función para obtener un producto por su id
    return prisma.product.findUnique({ //Utiliza Prisma para encontrar un producto específico por su id
        where: { id }, //Especifica el id del producto a buscar
    })
}

const createProduct = (data) => { //Función para crear un nuevo producto
    return prisma.product.create({ data }); //Utiliza Prisma para crear un nuevo producto en la base de datos con los datos proporcionados
}

const updateProduct = (id, data) => { //Función para actualizar un producto existente por su id
    return prisma.product.update({ //Utiliza Prisma para actualizar un producto específico por su id con los nuevos datos proporcionados
        where: { id }, //Especifica el id del producto a actualizar
        data, //Los datos proporcionados para actualizar el producto
    })
}

const deleteProduct = (id) => { //Función para eliminar un producto por su id
    return prisma.product.delete({ //Utiliza Prisma para eliminar un producto espicífico por su id
        where: { id }, //El id específico del producto a eliminar
    })
}

export const productService = { //Exporta un objeto con todas las funciones del servicio de productos para que puedan ser utilizadas en otras partes de la aplicación
    getAllProducts, //Función para obtener todos los productos
    getProductById, //Función para obtener un producto por su id
    createProduct, //Función para crear un nuevo producto
    updateProduct, //Función para actualizar un producto existente por su id
    deleteProduct, //Función para eliminar un producto por su id
}