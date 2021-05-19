export {};
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // orderID: {},
  date: { type: Date },
  ishandled: { type: Boolean },
  product: [{ type: Object }],
  user: {type: String},
  shipping: [{ type: String }],
  priceTotal: {type: Number}
});

module.exports = mongoose.model("Order", orderSchema);