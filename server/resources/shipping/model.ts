export {};
import { model, Schema } from "mongoose";

interface ShippingDocument {
  shipmentCompany: string,
  deliveryTime: string, 
  shippingPrice: string
}

const shippingSchema = new Schema<ShippingDocument>({
  shipmentCompany: { type: String, required: true },
  deliveryTime: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
});

module.exports = model("shipping", shippingSchema);
