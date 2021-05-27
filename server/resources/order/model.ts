export { };
import { model, Schema } from "mongoose";
import { AccountDocument } from "../account/model"
import { ProductDocument } from "../product/model"
import { ShippingDocument } from "../shipping/model"

interface Cart extends OrderDocument {
  product: ProductDocument,
  quantity: Number,
}

interface UserInfo extends OrderDocument {
  name: string,
  email: string,
  phone: number,
  street: string,
  zipcode: number,
  city: string,
}

export interface OrderDocument {
  userId: String;
  session: AccountDocument,
  date: Date,
  isHanddled: Boolean,
  cart: Cart,
  userInfo: UserInfo,
  deliveryMethod: ShippingDocument,
  paymentMethod: object,
}

const orderSchema = new Schema<OrderDocument>({
  userId: { type: String },
  session: { type: Object },
  date: { type: Date },
  isHandled: { type: Boolean },
  cart: [{ type: Object }],
  userInfo: { type: Object },
  deliveryMethod: { type: Object },
  totalPrice: { type: Number },
  paymentMethod: { type: Object },
});

module.exports = model("Order", orderSchema);

