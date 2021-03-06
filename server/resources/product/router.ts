export { };
const express = require("express");
const productRouter = express.Router();
const controller = require("./controller");


productRouter
  .post("/products", controller.newProduct)
  .get("/products", controller.getAllProducts)
  .delete("/products/:id", controller.deleteProduct)
  .put("/products/:id", controller.editProduct);


export default productRouter;