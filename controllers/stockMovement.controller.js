const stockMovementService = require("../services/stockMovement.service");

const createStockMovement = async (req, res, next) => {
  try {
    const { productId, type, quantity, note } = req.body;

    const movement = await stockMovementService.createStockMovement({
      storeId: req.user.storeId,
      productId,
      type,
      quantity,
      note,
    });

    res.status(201).json({
      success: true,
      message: "Stock movement created successfully",
      data: movement,
    });
  } catch (error) {
    next(error);
  }
};

const getStockMovements = async (req, res, next) => {
  try {
    const movements = await stockMovementService.getStockMovements(
      req.user.storeId
    );

    res.status(200).json({
      success: true,
      message: "Stock movements retrieved successfully",
      data: movements,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStockMovement,
  getStockMovements,
};
