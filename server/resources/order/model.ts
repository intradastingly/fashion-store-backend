export {};
import { model, Schema } from "mongoose";
import { AccountDocument } from "../account/model";
import { ProductDocument } from "../product/model";
import { ShippingDocument } from "../shipping/model";

export interface Cart extends OrderDocument {
  product: ProductDocument;
  quantity: Number;
}

interface UserInfo extends OrderDocument {
  name: string;
  email: string;
  phone: number;
  street: string;
  zipcode: number;
  city: string;
  country: string;
}

export interface OrderDocument {
  session: AccountDocument;
  date: Date;
  isHanddled: Boolean;
  cart: Cart;
  userInfo: UserInfo;
  deliveryMethod: ShippingDocument;
  paymentMethod: object;
}

const orderSchema = new Schema<OrderDocument>({
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
