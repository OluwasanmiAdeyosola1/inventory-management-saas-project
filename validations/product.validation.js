const Joi = require("joi");

const createProductValidation = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Product name is required",
        "any.required": "Product name is required",
    }),
    sku: Joi.string().trim().required().messages({
        "string.empty": "SKU is required",
        "any.required": "SKU is required",
    }),
    description: Joi.string().trim().allow(""),
    category: Joi.string().trim().default("General"),
    buyingPrice: Joi.number().min(0).required().messages({
        "number.base": "Buying price must be a number",
        "any.required": "Buying price is required",
    }),
    sellingPrice: Joi.number().min(0).required().messages({
        "number.base": "Selling price must be a number",
        "any.required": "Selling price is required",
    }),
    quantity: Joi.number().integer().min(0).default(0),
    lowStockAlert: Joi.number().integer().min(0).default(5),
    unit: Joi.string().trim().default("pcs"),
});

const updateProductValidation = Joi.object({
    name: Joi.string().trim(),
    sku: Joi.string().trim(),
    description: Joi.string().trim().allow(""),
    category: Joi.string().trim(),
    buyingPrice: Joi.number().min(0),
    sellingPrice: Joi.number().min(0),
    quantity: Joi.number().integer().min(0),
    lowStockAlert: Joi.number().integer().min(0),
    unit: Joi.string().trim(),
}).min(1);

module.exports = {
    createProductValidation,
    updateProductValidation,
};