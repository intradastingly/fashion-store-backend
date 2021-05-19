export {};
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  // productID: {},
  userName: { type: String },
  role: { type: String },
  password: { type: String }
});

module.exports = mongoose.model("Account", accountSchema);
