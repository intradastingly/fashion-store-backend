export {};
import {MongooseDocument, model, Schema} from "mongoose";

export interface ProductDocument extends MongooseDocument{
  title: string,
  description: string,
  category: [string],
  quantity: number,
  price: number,
  img: string,
}

const productSchema = new Schema<ProductDocument>({
  // productID: {},
  title: { type: String },
  description: { type: String },
  category: [{ type: String }],
  quantity: { type: Number },
  price: { type: Number},
  img: { type: String }

});

module.exports = model("Product", productSchema);
