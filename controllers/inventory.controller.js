const mongoose = require("mongoose");
const inventoryService = require("../services/inventory.service");

const {
  createInventoryValidation,
  stockValidation,
  updateStockValidation,
} = require("../validations/inventory.validation");

// Create inventory
async function createInventory(req, res, next) {
  try {
    const { error } = createInventoryValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { productId, quantity } = req.body;
    const storeId = req.user.storeId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const inventory = await inventoryService.createInventory(
      storeId,
      productId,
      quantity
    );

    return res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
}

// Get all inventory
async function getInventory(req, res, next) {
  try {
    const storeId = req.user.storeId;

    const inventory = await inventoryService.getInventory(storeId);

    return res.status(200).json({
      success: true,
      message: "Inventory retrieved successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
}

// Get inventory for one product
async function getInventoryByProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const storeId = req.user.storeId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const inventory = await inventoryService.getInventoryByProduct(
      storeId,
      productId
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inventory retrieved successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
}

// Add stock
async function addStock(req, res, next) {
  try {
    const { error } = stockValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { productId, amount } = req.body;
    const storeId = req.user.storeId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const inventory = await inventoryService.addStock(
      storeId,
      productId,
      amount
    );

    return res.status(200).json({
      success: true,
      message: "Stock added successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
}

// Remove stock
async function removeStock(req, res, next) {
  try {
    const { error } = stockValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { productId, amount } = req.body;
    const storeId = req.user.storeId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const inventory = await inventoryService.removeStock(
      storeId,
      productId,
      amount
    );

    return res.status(200).json({
      success: true,
      message: "Stock removed successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
}

// Update stock
async function updateStock(req, res, next) {
  try {
    const { error } = updateStockValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { productId, quantity } = req.body;
    const storeId = req.user.storeId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const inventory = await inventoryService.updateStock(
      storeId,
      productId,
      quantity
    );

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
}

// Delete inventory
async function deleteInventory(req, res, next) {
  try {
    const { productId } = req.params;
    const storeId = req.user.storeId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    await inventoryService.deleteInventory(storeId, productId);

    return res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createInventory,
  getInventory,
  getInventoryByProduct,
  addStock,
  removeStock,
  updateStock,
  deleteInventory,
};