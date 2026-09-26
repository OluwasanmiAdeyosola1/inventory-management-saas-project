const productService = require("../services/product.service");
const { createProductValidation, updateProductValidation } = require("../validations/product.validation");

const createProduct = async (req, res, next) => {
    try {
        const { error, value } = createProductValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message, data: null });
        }

        const storeId = req.user.storeId; // Injected via JWT / auth middleware
        const product = await productService.createProduct(storeId, value);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const storeId = req.user.storeId;
        const products = await productService.getProducts(storeId);

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const storeId = req.user.storeId;
        const product = await productService.getProductById(storeId, req.params.id);

        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { error, value } = updateProductValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message, data: null });
        }

        const storeId = req.user.storeId;
        const product = await productService.updateProduct(storeId, req.params.id, value);

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const storeId = req.user.storeId;
        await productService.deleteProduct(storeId, req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};