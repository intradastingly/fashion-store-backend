export {};
import { model, Schema} from "mongoose";

export interface ProductDocument{
  _id: string,
  title: string,
  description: string,
  category: [string],
  quantity: number,
  price: number,
  img: string,
}

const productSchema = new Schema<ProductDocument>({
  title: { type: String },
  description: { type: String },
  category: { type: Array, trim: true },
  quantity: { type: Number },
  price: { type: Number},
  img: { type: String }
});

module.exports = model("Product", productSchema);
