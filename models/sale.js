const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
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

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

saleSchema.index({
    storeId: 1,
    productId: 1,
    createdAt: -1,
});

module.exports = mongoose.model("Sale", saleSchema);