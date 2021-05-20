export {};
const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  // orderID: {},
  userName: { type: String },
  role: { type: String },
});

module.exports = mongoose.model("Guest", guestSchema);