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
  street: { type: String, required: true },
  zipCode: {
    type: String, required: true,
    validate: {
      validator: (value: string) => {
        return /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/.test(value)
      },
      message: "This is not a valid zip code"
    }
  },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const AccountSchema = new Schema<AccountDocument>({
  userName: { type: String, unique: true, required: true, trim: true },
  fullName: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return /^(0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/.test(value)
      },
      message: "This is not a valid phone number"
    }
  },
  role: { type: String, required: true },
  password: {
    type: String, select: false, required: true
  },
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
