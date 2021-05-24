export {};
import express from "express";
const Order = require("./model");
const Product = require("../product/model")

exports.newOrder = async (req: express.Request, res: express.Response) => {
    
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

async function orderProductSubtractor(orderedProducts: any){
  const existingProducts = await Product.find();
  for(const p of orderedProducts){
    const updatedVolume = p.product.quantity - p.quantity;
    const product = await Product.findOneAndUpdate(
        { _id: p.product._id },
        {
          $set: {
            quantity: updatedVolume,
          },
        },
        { new: true }
      );
      console.log(product)
  }
}

// Edit a product
/* exports.editProduct = async (req: express.Request, res: express.Response) => {
  const product = await Product.findOne({ _id: req.params.id });
  // const user = await User.findOne({ _id: req.session.userId });

  // if (req.session.userId === post.user.toString() || user.role === "admin") {
    const updatedPost = new Product(Object.assign(product, req.body));
    await updatedPost.save();
    return res.json("Your post have been updated");

  // } else {
  //   return res.status(400).json("Not your post");
  // }
  // const product = await Product.findOneAndUpdate(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       title: req.body.title,
  //       description: req.body.description,
  //       category: req.body.category,
  //       quantity: req.body.quantity,
  //       price: req.body.price,
  //       img: req.body.img
  //     },
  //   },
  //   { new: true }
  // );
  // res.status(200).json(product);
}; */