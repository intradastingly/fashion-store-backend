export { };
import {MongooseDocument, model, Schema} from "mongoose";
import bcrypt from 'bcrypt';
const saltRounds = 10;

interface Address {
  street: String, 
  zipCode: Number,
  city: String
}
export interface AccountDocument extends MongooseDocument {
  userName: String,
  fullName: String,
  role: String,
  password: String,
  email: String;
  address: Address;
}

const accountSchema = new Schema<AccountDocument>({
  userName: { type: String },
  fullName: {type: String},
  role: { type: String },
  password: { type: String, select: false },
  email: {type: String},
  address: { type: Object}
});

accountSchema.pre('save', async function (next) {
  const account = this;

  if (this.isModified("password") || this.isNew) {
    const hashedPassword = await bcrypt.hash(account.password, saltRounds)
    account.password = hashedPassword;
    next();
  } else {
    return next();
  }
})

module.exports = model("Account", accountSchema);
