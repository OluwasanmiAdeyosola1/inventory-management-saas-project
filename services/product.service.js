const Product = require("../models/Product");

const createProduct = async (storeId, productData) => {
    const existingProduct = await Product.findOne({ storeId, sku: productData.sku });
    if (existingProduct) {
        throw new Error("Product with this SKU already exists in your store.");
    }
    const product = await Product.create({ ...productData, storeId });
    return product;
};

const getProducts = async (storeId) => {
    const products = await Product.find({ storeId }).sort({ createdAt: -1 });
    return products;
};

const getProductById = async (storeId, productId) => {
    const product = await Product.findOne({ _id: productId, storeId });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

const updateProduct = async (storeId, productId, productData) => {
    if (productData.sku) {
        const existingSku = await Product.findOne({ storeId, sku: productData.sku, _id: { $ne: productId } });
        if (existingSku) {
            throw new Error("Another product with this SKU already exists.");
        }
    }

    const product = await Product.findOneAndUpdate(
        { _id: productId, storeId },
        productData,
        { new: true, runValidators: true }
    );

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

const deleteProduct = async (storeId, productId) => {
    const product = await Product.findOneAndDelete({ _id: productId, storeId });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};