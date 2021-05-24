export {};
import { model, Schema} from "mongoose";

export interface ShippingDocument{
  shipmentCompany: string,
  deliveryTime: number,
  shippingPrice: number,
}

const shippingSchema = new Schema<ShippingDocument>({
  shipmentCompany: { type: String, required: true },
  deliveryTime: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
});

module.exports = model("shipping", shippingSchema);
