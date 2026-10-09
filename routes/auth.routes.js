const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");

// Register store owner
router.post("/register", authController.registerOwner);

// Register staff
router.post("/register/staff", authenticate, authController.registerStaff);

// Login
router.post("/login", authController.login);

// Get current user
router.get("/me", authenticate, authController.getMe);

// Update current user profile
router.put("/me", authenticate, authController.updateMe);

module.exports = router;