const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const productSchema = require("../middleware/product/productSchema");
const validation = require("../middleware/validation");

// @route GET /api/products
// @desc get all products from db
// access Public access
router.get("/", productController.getProducts);

// @route GET /api/products/id
// @desc Get product by id
// @access Public access
router.get("/:id", productController.getProductById);

// @route POST /api/products/addNewProduct
// @desc Create a new product
// @access Private access
router.post(
  "/insertANewProduct",
  validation(productSchema),
  productController.insertAProduct
);

// @route PUT /api/products/updateAProduct
// @desc update a specific product
// @access Private access
router.put("/updateAProduct", productController.updateAProduct);

// @route DELETE /api/products/deleteAProduct/:id
// @desc delete a specific product by _id
// @access Private access
router.delete("/deleteAProduct/:id", productController.deleteAProduct);

module.exports = router;
