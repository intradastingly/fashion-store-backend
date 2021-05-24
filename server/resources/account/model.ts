export { };
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const accountSchema = new mongoose.Schema({
  // productID: {},
  userName: { type: String },
  role: { type: String },
  password: { type: String }
});

async function passwordHasher(password: string) {
  const plainText = password;
  const hashedPassword = await bcrypt.hash(plainText, saltRounds)
}

module.exports = mongoose.model("Account", accountSchema);
