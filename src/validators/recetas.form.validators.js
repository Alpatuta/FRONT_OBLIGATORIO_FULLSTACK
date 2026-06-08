import joi from "joi";
import { crearRecetaSchema } from "./recetas.validators";

export const crearRecetaFormSchema = crearRecetaSchema.keys({
    ingredientes: joi.string().min(1).required().messages({
        "string.empty": "Los ingredientes son obligatorios",
        "any.required": "Los ingredientes son obligatorios",
    }),
    pasos: joi.string().min(1).required().messages({
        "string.empty": "Los pasos son obligatorios",
        "any.required": "Los pasos son obligatorios",
    }),
    categoria: joi.string().required().messages({
        "any.required": "La categoría es obligatoria",
        "string.empty": "La categoría es obligatoria",
    }),
});