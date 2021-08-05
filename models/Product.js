const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  id: {
    type: String,
  },
  url: {
    type: String,
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

const products = mongoose.model("products", ProductSchema);

module.exports = products;
