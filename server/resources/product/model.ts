export { };
import { model, Schema } from "mongoose";

export interface ProductDocument {
  _id: string,
  title: string,
  description: string,
  category: [string],
  quantity: number,
  price: number,
  img: string,
}

const productSchema = new Schema<ProductDocument>({
  title: { type: String, require: true, trim: true },
  description: { type: String },
  category: { type: Array, trim: true, require: true },
  quantity: { type: Number, require: true },
  price: { type: Number, require: true },
  img: { type: String }
});

module.exports = model("Product", productSchema);
