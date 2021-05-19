export {};
const express = require("express");
const orderRouter = express.Router();
const controller = require("./controller");

orderRouter
  .post("/order", controller.newOrder)
/*   .get("/order", controller.getAllOrders)
  .delete("/orders/:id", controller.deleteOrder)
  .put("/orders/:id", controller.editOrder); */

module.exports = orderRouter;
