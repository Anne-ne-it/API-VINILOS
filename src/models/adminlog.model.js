import mongoose from "mongoose" //Importa la librería Mongoose para definir esquemas y modelos MongoDB

const adminlogSchema = new mongoose.Schema({
    adminId: { 
        type: String,
         required: true 
        },
    action: { 
        type: String, 
        required: true 
    },
    resource: { 
        type: String 
    },
},
{timestamps: true})

export const Adminlog = mongoose.models.Adminlog || mongoose.model("Adminlog", adminlogSchema) //Usando un framework como Next.js o herramientas de desarrollo que recargan eñ código en caliente (Hot Reload), Mongoose intentará duplicar el modelo y la app lanzará un error. Con esta validación te aseguras de que solo se cree si no existe.