const Joi = require("joi");

const createInventoryValidation = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
    "string.empty": "Product ID is required",
  }),

  quantity: Joi.number().min(0).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.min": "Quantity cannot be negative",
  }),
});

const stockValidation = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
    "string.empty": "Product ID is required",
  }),

  amount: Joi.number().positive().required().messages({
    "any.required": "Amount is required",
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be greater than 0",
  }),
});

const updateStockValidation = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
    "string.empty": "Product ID is required",
  }),

  quantity: Joi.number().min(0).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.min": "Quantity cannot be negative",
  }),
});

module.exports = {
  createInventoryValidation,
  stockValidation,
  updateStockValidation,
};