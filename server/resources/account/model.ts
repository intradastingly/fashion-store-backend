export { };
import { MongooseDocument, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;

interface Address {
  street: String;
  zipCode: Number;
  city: String;
  country: String;
}
export interface AccountDocument extends MongooseDocument {
  userName: String;
  fullName: String;
  phoneNumber: String;
  role: String;
  password: String;
  email: String;
  address: Address;
}

const AddressSchema = new Schema<Address>({
  street: { type: String },
  zipCode: { type: String },
  city: { type: String },
  country: { type: String },
});

const AccountSchema = new Schema<AccountDocument>({
  userName: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, select: false, required: true },
  email: { type: String, required: true },
  address: { type: AddressSchema, required: true },
});

// Hashing password middleware
AccountSchema.pre("save", async function (next) {
  const account = this;
  account.userName = account.userName.trim();
  if (this.isModified("password") || this.isNew) {
    const hashedPassword = await bcrypt.hash(account.password, saltRounds);
    account.password = hashedPassword;
    next();
  } else {
    return next();
  }
});

module.exports = model("Account", AccountSchema);
