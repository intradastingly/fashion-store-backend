export { };
const express = require("express");
const orderRouter = express.Router();
const controller = require("./controller");

orderRouter
  .post("/order", controller.newOrder)
  .get("/order", controller.getAllOrders)
  .get("/order/:id", controller.getUserSpecificOrders)
  // .delete("/orders/:id", controller.deleteOrder)
  .put("/orders/:id", controller.editOrder);


export default orderRouter;