const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  detailUrl: {
    type: String,
  },
  title: {
    type: Object,
  },
  price: {
    type: Object,
  },
  description: {
    type: String,
  },
  discount: {
    type: String,
  },
  tagline: {
    type: String,
  },
});

ProductSchema.statics.getProducts = async function () {
  try {
    const products = await this.find({});

    return products;
  } catch (error) {
    // if validate fail throw error here
    console.log("error in get products: ", error);
  }
};

ProductSchema.statics.getSpecificProduct = async function (productId) {
  try {
    const product = await this.findOne({ _id: productId });

    return product;
  } catch (error) {
    // if validate fail throw error here
    console.log("error on get specific product: ", error);
    throw error;
  }
};

ProductSchema.statics.getLatestProduct = async function () {
  try {
    const latestProduct = await this.findOne().sort({ createdAt: -1 }).limit(1);

    return latestProduct;
  } catch (error) {
    console.log("error on get latest product: ", error);
    throw error;
  }
};

ProductSchema.statics.insertAProduct = async function (doc) {
  try {
    const product = await this.create(doc);
    return product;
  } catch (error) {
    // if validate fail throw error here
    throw error;
  }
};

ProductSchema.statics.updateAProduct = async function (filter, doc, options) {
  try {
    const updateDoc = {
      $set: doc,
    };

    const result = await this.findOneAndUpdate(
      filter,
      updateDoc,
      options,
      function (err, doc) {}
    );

    return result;
  } catch (error) {
    console.log("error on update a product: ", error);
    throw error;
  }
};

ProductSchema.statics.deleteAProduct = async function (productId) {
  const filter = { _id: productId };
  try {
    const result = await this.findOneAndDelete(filter);

    return result;
  } catch (error) {
    console.log("error on delete a product: ", error);
  }
};

const products = mongoose.model("products", ProductSchema);

module.exports = products;
