export { };
  import {MongooseDocument, model, Schema} from "mongoose";
import bcrypt from 'bcrypt';
const saltRounds = 10;

interface AccountDocument extends MongooseDocument {
  userName: string,
  role: string,
  password: string,
}

const accountSchema = new Schema<AccountDocument>({
  // productID: {},
  userName: { type: String },
  role: { type: String },
  password: { type: String, select: false }
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
