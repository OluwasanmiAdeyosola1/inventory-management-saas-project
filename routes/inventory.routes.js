const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventory.controller");
const authenticate = require("../middleware/auth.middleware");

// All inventory routes require authentication
router.use(authenticate);

// Create inventory
router.post("/", inventoryController.createInventory);

// Get all inventory
router.get("/", inventoryController.getInventory);

// Get inventory for one product
router.get("/product/:productId", inventoryController.getInventoryByProduct);

// Add stock
router.post("/add", inventoryController.addStock);

// Remove stock
router.post("/remove", inventoryController.removeStock);

// Update stock
router.put("/update", inventoryController.updateStock);

// Delete inventory
router.delete("/:productId", inventoryController.deleteInventory);

module.exports = router;