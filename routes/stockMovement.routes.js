const express = require("express");
const router = express.Router();

const stockMovementController = require("../controllers/stockMovement.controller");
const authenticate = require("../middleware/auth.middleware");

router.get("/", authenticate, stockMovementController.getStockMovements);
router.post("/", authenticate, stockMovementController.createStockMovement);

module.exports = router;
