export { };
import express from "express";
const Order = require("./model");
const Product = require("../product/model")

exports.newOrder = async (req: express.Request, res: express.Response) => {

  const order = new Order({
    _id: req.body.id,
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

exports.editOrder = async (req: express.Request, res: express.Response) => {
const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        isHandled: req.body.isHandled
      },
    },
    { new: true }
  );
};

// get specific orders that corresponds with the logged in user
exports.getUserSpecificOrders = async (
  req: express.Request,
  res: express.Response
) => {
  const userSpecificOrders = await Order.find({ "session.id": req.params.id });
  res.status(200).json(userSpecificOrders);
};

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
