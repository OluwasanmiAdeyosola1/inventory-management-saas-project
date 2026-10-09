const Sale = require("../models/sale");
const Product = require("../models/Product");

const createSale = async ({
    storeId,
    productId,
    quantity,
}) => {
    const product = await Product.findOne({
        _id: productId,
        storeId,
    });

    if (!product) {
        throw new Error("Product not found");
    }

    if (product.quantity < quantity) {
        throw new Error("Insufficient stock");
    }

    const unitPrice = product.sellingPrice;
    const totalAmount = unitPrice * quantity;

    product.quantity -= quantity;

    await product.save();

    const sale = await Sale.create({
        storeId,
        productId,
        quantity,
        unitPrice,
        totalAmount,
    });

    return sale;
};

module.exports = {
    createSale,
};