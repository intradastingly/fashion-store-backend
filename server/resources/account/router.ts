export {};
const express = require("express");
const accountRouter = express.Router();
const controller = require("./controller");

accountRouter
  .post("/accounts", controller.newAccount)
  .get("/accounts", controller.getAllAccounts)
  .delete("/accounts/:id", controller.deleteAccount)
  .put("/accounts/:id", controller.editAccount)
  .get("/accounts/:id", controller.getSpecificAccount);

module.exports = accountRouter;
