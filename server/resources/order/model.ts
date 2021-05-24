export {};
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  session:{ type: Object },
  date: { type: Date },
  ishandled: { type: Boolean },
  cart: [{ type: Object }],
  userInfo: {type: Object},
  deliveryMethod: { type: Object },
  totalPrice: {type: Number},
  paymentMethod: {type: Object},
});

module.exports = mongoose.model("Order", orderSchema);