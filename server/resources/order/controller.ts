export { };
import express from "express";
import { ObjectId } from "mongodb";
const Order = require("./model");
const Product = require("../product/model")
import { ProductDocument } from "../product/model"

exports.newOrder = async (req: express.Request, res: express.Response) => {

  const order = new Order({
    session: req.body.session,
    date: new Date(),
    isHandled: false,
    cart: req.body.cart,
    userInfo: req.body.userInfo,
    deliveryMethod: req.body.deliveryMethod,
    totalPrice: req.body.totalPrice,
    paymentMethod: req.body.paymentMethod
  });

  orderProductSubtractor(req.body.cart)

  await order.save();
  res.status(201).json(order);
}

exports.getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  const order = await Order.find();

  res.status(200).json(order);
};

exports.getCurrentOrder = async (req: express.Request, res: express.Response) => {
  const order = await Order.findOne({ _id: req.params.id });
  res.status(200).json(order);
}

// get specific orders that corresponds with the logged in user
exports.getUserSpecificOrders = async (
  req: express.Request,
  res: express.Response
) => {
  const userSpecificOrders = await Order.find({ "session.id": req.params.id });

  res.status(200).json(userSpecificOrders);
}


async function orderProductSubtractor(orderedProducts: any) {
  const existingProducts = await Product.find()
  for (const p of orderedProducts) {
    for (const e of existingProducts) {
      if (e._id == p.product._id) {
        const updatedVolume = e.quantity - p.quantity;
        await Product.findOneAndUpdate(
          { _id: p.product._id },
          {
            $set: {
              quantity: updatedVolume,
            },
          },
          { new: true }
        );
      }
    }
  }
}
