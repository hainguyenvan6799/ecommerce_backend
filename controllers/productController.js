const ProductModel = require("../models/Product");

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await ProductModel.find({});
      return res.json({ products });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await ProductModel.findOne({ id: productId });

      if (!product) {
        return res.json({
          success: false,
          message: "Invalid product",
        });
      }

      return res.json({
        success: true,
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    return res.json({ productId });
  },
};

module.exports = productController;
