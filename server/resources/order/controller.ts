export {};
import express from "express";
const Order = require("./model");

exports.newOrder = async (req: express.Request, res: express.Response) => {
    const order = new Order({
        date: req.body.date,
        isHandled: req.body.isHandled,
        product: req.body.product,
        user: req.body.user,
        shipping: req.body.shipping
      });
    
      await order.save();
      res.status(201).json(order);
}