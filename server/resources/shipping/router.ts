export { };
import express from "express";
const shippingRouter = express.Router();
const controller = require("./controller");

shippingRouter
  .post("/shipping", controller.newShipping)
  .get("/shipping", controller.getAllShippings)
  .delete("/shipping/:id", controller.deleteShipping)
  .put("/shipping/:id", controller.editShipping);


export default shippingRouter;
