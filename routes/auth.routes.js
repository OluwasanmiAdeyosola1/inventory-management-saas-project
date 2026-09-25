const express = require("express");
const router = express.Router();
const {registerOwner , registerStaff , login , getMe} = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
router.post("/register",registerOwner);
router.post("/register-staff", authenticate , authorize("owner","admin"),registerStaff);
router.post("/login",login);
router.get("/me",authenticate, getMe);

module.exports = router ;