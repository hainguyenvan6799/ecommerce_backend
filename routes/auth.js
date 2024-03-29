const express = require("express");
const authController = require("../controllers/authController");
const verifyAuth = require("../middleware/auth");
const router = express.Router();

const validation = require("../middleware/validation");
const loginSchema = require("../middleware/login/loginSchema");

// middlewares
const { encode } = require("../middleware/jwt");

// @route GET /api/auth/current-user
// @desc Get current user is logged in
// @access Private
router.get("/current-user", verifyAuth, authController.getCurrentUser);

// @route POST /api/auth/login
// @desc Do login
// @access Public
router.post("/login", [validation(loginSchema), encode], authController.login);

// @route POST /api/auth/signup
// @desc Do register
// @access Public
router.post("/signup", authController.signup);

module.exports = router;
