const express = require("express");
const router = express.Router();

const saleController = require("../controllers/sale.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/", authenticate, saleController.createSale);

module.exports = router;