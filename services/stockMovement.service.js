const StockMovement = require("../models/StockMovement");
const Product = require("../models/Product");

const createStockMovement = async ({
    storeId,
    productId,
    type,
    quantity,
    note,
}) => {
    const product = await Product.findOne({
        _id: productId,
        storeId,
    });

    if (!product) {
        throw new Error("Product not found");
    }

    if (type === "OUT" && product.quantity < quantity) {
        throw new Error("Insufficient stock");
    }

    if (type === "IN") {
        product.quantity += quantity;
    }

    if (type === "OUT") {
        product.quantity -= quantity;
    }

    await product.save();

    const movement = await StockMovement.create({
        storeId,
        productId,
        type,
        quantity,
        note,
    });

    return movement;
};

module.exports = {
    createStockMovement,
};