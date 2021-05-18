export {};
const Product = require("./model");
const express = require("express");
const productRouter = express.Router();

productRouter.post("/products", async (req: any, res: any) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity,
  });

  await product.save();
  res.status(201).json(product);
});

module.exports = productRouter;
