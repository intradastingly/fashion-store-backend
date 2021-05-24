export {};
import { model, Schema } from "mongoose";


interface OrderDocument {
  session: Object,
  date: Date,
  isHandled: Boolean,
  cart: Object,
  userInfo: Object,
  deliveryMethod: string,
  totalPrice: number,
  paymentMethod: Object
}

const orderSchema = new Schema<OrderDocument>({
  session:{ type: Object },
  date: { type: Date },
  isHandled: { type: Boolean },
  cart: [{ type: Object }],
  userInfo: {type: Object},
  deliveryMethod: { type: Object },
  totalPrice: {type: Number},
  paymentMethod: {type: Object},
});

module.exports = model("Order", orderSchema);