export { };
import { MongooseDocument, model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
const saltRounds = 10;

interface Address {
  street: String,
  zipCode: Number,
  city: String,
  country: String
}
export interface AccountDocument extends MongooseDocument {
  userName: String,
  fullName: String,
  phoneNumber: String,
  role: String,
  password: String,
  email: String;
  address: Address,
}

const AddressSchema = new Schema<Address>({
  street: { type: String },
  zipCode: { type: Number },
  city: { type: String },
  country: { type: String }
})

const AccountSchema = new Schema<AccountDocument>({
  userName: { type: String, unique: true },
  fullName: { type: String },
  phoneNumber: { type: String },
  role: { type: String },
  password: { type: String, select: false },
  email: { type: String },
  address: { type: AddressSchema },
});

// Hashing password middleware
AccountSchema.pre('save', async function (next) {
  const account = this;
  account.userName = account.userName.trim();
  if (this.isModified("password") || this.isNew) {
    const hashedPassword = await bcrypt.hash(account.password, saltRounds)
    account.password = hashedPassword;
    next();
  } else {
    return next();
  }
})

module.exports = model("Account", AccountSchema);
