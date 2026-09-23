const Joi = require("joi");

const createStoreValidation = Joi.object({
  businessName: Joi.string().trim().required().messages({
    "string.empty": "Business name is required",
    "any.required": "Business name is required",
  }),

  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  phone: Joi.string().trim().required().messages({
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),

  address: Joi.string().trim().allow(""),

  city: Joi.string().trim().allow(""),

  state: Joi.string().trim().allow(""),

  country: Joi.string().trim().default("Nigeria"),

  status: Joi.string().valid("active", "inactive").default("active"),
});

const updateStoreValidation = Joi.object({
  businessName: Joi.string().trim(),

  email: Joi.string().email().trim().lowercase(),

  phone: Joi.string().trim(),

  address: Joi.string().trim().allow(""),

  city: Joi.string().trim().allow(""),

  state: Joi.string().trim().allow(""),

  country: Joi.string().trim(),

  status: Joi.string().valid("active", "inactive"),
}).min(1);

module.exports = {
  createStoreValidation,
  updateStoreValidation,
};