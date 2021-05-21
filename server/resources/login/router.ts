export {};
const express = require("express");
const loginRouter = express.Router();
const controller = require("./controller");

loginRouter
  .post("/login", controller.login)
  .delete("/logout", controller.logout)
  .get("/authenticated", controller.authenticate);

module.exports = loginRouter;
