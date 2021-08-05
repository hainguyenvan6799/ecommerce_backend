const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// @route GET /api/products
// @desc get all products from db
// access Public access
router.get("/", productController.getProducts);

// @route GET /api/products/id
// @desc Get product by id
// @access Public access
router.get("/:id", productController.getProductById);

module.exports = router;
