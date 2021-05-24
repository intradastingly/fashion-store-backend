export {};
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // productID: {},
  title: { type: String },
  description: { type: String },
  category: { type: Array, trim: true },
  quantity: { type: Number },
  price: { type: Number},
  img: { type: String }

});

module.exports = mongoose.model("Product", productSchema);
