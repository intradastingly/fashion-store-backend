export {};
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // productID: {},
  title: { type: String },
  description: { type: String },
  category: [{ type: String }],
  quantity: { type: Number },
  priceTotal: {type: Number}
});

module.exports = mongoose.model("Product", productSchema);
