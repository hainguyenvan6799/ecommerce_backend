const ProductModel = require("../models/Product");
const { uploadFile } = require("../services/AWS");

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await ProductModel.getProducts();
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
      const product = await ProductModel.getSpecificProduct(productId);

      // productId false
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
      // validate false ==> return like this
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getLatestProduct: async (req, res) => {
    const latestProduct = await ProductModel.getLatestProduct();
    return res.json({ success: true, product: latestProduct });
  },

  insertAProduct: async (req, res) => {
    try {
      const { data } = req.body;

      const dataInObject = JSON.parse(data);

      let {
        shortTitle,
        longTitle,
        mrp,
        cost,
        discountInPercent,
        description,
        discount,
        tagline,
      } = dataInObject;

      let url = null;
      let detailUrl = null;

      if (req.file) {
        const result = await uploadFile(req.file);

        const urlFile = await result.Location;

        if (urlFile) {
          url = urlFile;
          detailUrl = urlFile;
        }
      }

      const doc = {
        url,
        detailUrl,
        title: {
          shortTitle,
          longTitle,
        },
        price: {
          mrp,
          cost,
          discount: discountInPercent,
        },
        description,
        discount,
        tagline,
      };
      const newProduct = await ProductModel.insertAProduct(doc);
      if (newProduct) {
        return res.json({ success: true, product: newProduct });
      } else {
        return res.json({
          success: false,
          message: "Dont have any product create.",
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  updateAProduct: async (req, res) => {
    const { data } = req.body;

    const dataInObject = JSON.parse(data);

    let {
      productId,
      url,
      detailUrl,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discountInPercent,
      description,
      discount,
      tagline,
    } = dataInObject;

    if (req.file) {
      const result = await uploadFile(req.file);

      const urlFile = await result.Location;

      if (urlFile) {
        url = urlFile;
        detailUrl = urlFile;
      }
    }

    // create a filter for a product
    const filter = { _id: productId };

    const doc = {
      url,
      detailUrl,
      title: {
        shortTitle,
        longTitle,
      },
      price: {
        mrp,
        cost,
        discount: discountInPercent,
      },
      description,
      discount,
      tagline,
    };

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };

    try {
      const updatedProduct = await ProductModel.updateAProduct(
        filter,
        doc,
        options
      );
      if (updatedProduct) {
        return res.json({ success: true, product: updatedProduct });
      }
      return res.json({
        success: false,
        message: "Can not find productId to update.",
      });
    } catch (error) {
      // validate false will return in here
      return res.status(500).json({
        success: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  },

  deleteAProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await ProductModel.deleteAProduct(productId);
      if (deletedProduct) {
        return res.json({ success: true, product: deletedProduct });
      }
      return res.json({
        success: false,
        message: "Can not find productId to delete.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  },
};

module.exports = productController;
