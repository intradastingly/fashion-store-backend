export {};
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // orderID: {},
  date: { type: Date },
  ishandled: { type: Boolean },
  product: [{ type: String }, { type: Number }],
  user: {type: String},
  shipping: [{ type: String }],
});

module.exports = mongoose.model("Order", orderSchema);