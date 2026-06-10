import joi from "joi";

export const categoriaSchema = joi.object({
    nombre: joi.string().min(3).required().messages({
        "string.base": "El nombre debe ser una cadena de texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos 3 caracteres"

    }),
    descripcion: joi.string().min(5).required().messages({
        "string.base": "La descripción debe ser una cadena de texto",
        "string.empty": "La descripción no puede estar vacía",
        "string.min": "La descripción debe tener al menos 5 caracteres"
    })
});

export const actualizarCategoriaSchema = joi.object({
    nombre: joi.string().min(3).messages({
        "string.base": "El nombre debe ser una cadena de texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos 3 caracteres"
    }),
    descripcion: joi.string().min(5).messages({
        "string.base": "La descripción debe ser una cadena de texto",
        "string.empty": "La descripción no puede estar vacía",
        "string.min": "La descripción debe tener al menos 5 caracteres"
    })
});