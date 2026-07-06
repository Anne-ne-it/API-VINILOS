import { uploadImage } from "../services/cloudinary.service.js"
import prisma from "../config/prisma.js"

export async function createProduct(req,res){
    const { title, price } = req.body
    let imageUrl = null

    if(req.file){
        const result = await uploadImage(req.file)
        imageUrl = result.secure_url
    }
    const product = await prisma.product.create({
        data:{ title, price: parseFloat(price), imageUrl}
    })
    res.json(product)
}