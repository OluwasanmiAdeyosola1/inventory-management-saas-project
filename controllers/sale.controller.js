const saleService = require("../services/sale.service");

const createSale = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        const sale = await saleService.createSale({
            storeId: req.user.storeId,
            productId,
            quantity,
        });

        res.status(201).json({
            success: true,
            message: "Sale created successfully",
            data: sale,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSale,
};