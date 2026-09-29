const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        sku: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            trim: true,
            default: "General",
        },
        buyingPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        lowStockAlert: {
            type: Number,
            default: 5,
            min: 0,
        },
        unit: {
            type: String,
            default: "pcs",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure SKU is unique per store (tenant isolation)
productSchema.index({ storeId: 1, sku: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);