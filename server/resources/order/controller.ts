export {};
import express from "express";
const Order = require("./model");

exports.newOrder = async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    const order = new Order({
        session: req.body.session,
        date:  new Date(),
        isHandled: false,
        cart: req.body.cart,
        userInfo: req.body.userInfo,
        deliveryMethod: req.body.deliveryMethod,
        totalPrice: req.body.totalPrice,
        paymentMethod: req.body.paymentMethod
      });
    
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