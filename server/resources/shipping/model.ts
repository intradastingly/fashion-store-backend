export { };
import { model, Schema } from "mongoose";

export interface ShippingDocument {
  shipmentCompany: string,
  deliveryTime: number,
  shippingPrice: number,
}

const shippingSchema = new Schema<ShippingDocument>({
  shipmentCompany: { type: String, required: true },
  deliveryTime: { type: Number, required: true },
  shippingPrice: {
    type: Number,
    required: true,
    validate: {
      validator: (value: Number) => {
        return /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/.test(value.toString())
      },
      message: "Prices can only be positive numbers"
    }
  },
});

module.exports = model("shipping", shippingSchema);
