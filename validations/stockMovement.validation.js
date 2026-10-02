const Joi = require("joi");

const createStockMovementSchema = Joi.object({
    productId: Joi.string().required(),
    type: Joi.string().valid("IN", "OUT").required(),
    quantity: Joi.number().integer().min(1).required(),
    note: Joi.string().trim().allow(""),
});

module.exports = {
    createStockMovementSchema,
};