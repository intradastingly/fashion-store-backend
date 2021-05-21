export {};
import express from "express";
const Product = require("./model");

// Create new product
exports.newProduct = async (req: express.Request, res: express.Response) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    img: req.body.img
  });

  await product.save();
  res.status(201).json(product);
};

// Get all the products
exports.getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const product = await Product.find();

  res.status(200).json(product);
};

// Delete a product
exports.deleteProduct = async (req: express.Request, res: express.Response) => {
  const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(deletedProduct);
};

// Edit a product
exports.editProduct = async (req: express.Request, res: express.Response) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        price: req.body.price,
        img: req.body.img
      },
    },
    { new: true }
  );
  res.status(200).json(product);
};
