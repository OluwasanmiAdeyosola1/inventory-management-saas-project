const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
    {
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
            index: true,
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true,
        },

        type: {
            type: String,
            enum: ["IN", "OUT"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        note: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

stockMovementSchema.index({
    storeId: 1,
    productId: 1,
    createdAt: -1,
});

module.exports = mongoose.model("StockMovement", stockMovementSchema);