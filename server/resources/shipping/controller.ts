export {};
import express from "express";
const Shipping = require("./model");


exports.getAllShippings = async (req: express.Request, res: express.Response) => {
    const shippment = await Shipping.find();
    res.status(200).json(shippment);
}

exports.newShipping = async (req: express.Request, res: express.Response) => {
    const shipping = new Shipping({
        shipmentCompany: req.body.shipmentCompany,
        deliveryTime: req.body.deliveryTime,
        shippingPrice: req.body.shippingPrice
    })

    await shipping.save()
    res.status(201).json(shipping)
}
exports.deleteShipping = async (req: express.Request, res: express.Response) => {
    const removedShipping = await Shipping.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json("Shipment removed");
}
exports.editShipping = async (req: express.Request, res: express.Response) => {
     const updatedShipping = await Shipping.updateOne(
      { _id: req.params.id }, {
        $set: {
          shipmentCompany: req.body.shipmentCompany,
          deliveryTime: req.body.deliveryTime,
          shippingPrice: req.body.shippingPrice,
        },
      }
    );
    res.status(200).json(updatedShipping)

}
