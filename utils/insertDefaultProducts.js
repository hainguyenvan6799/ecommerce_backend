const productsData = require("./defaultValue");
const ProductModel = require("../models/Product");

const insertProducts = async () => {
  await ProductModel.insertMany(productsData);

  console.log("Imported successfully");
};

module.exports = insertProducts;
