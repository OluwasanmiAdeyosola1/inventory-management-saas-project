const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authenticate = require("../middleware/auth.middleware"); // <-- import as authenticate

// Protect all product routes
router.use(authenticate); // <-- use authenticate here

router.route("/")
    .post(productController.createProduct)
    .get(productController.getProducts);

router.route("/:id")
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;