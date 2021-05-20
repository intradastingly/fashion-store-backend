export {};
const express = require('express');
const guestRouter = express.Router();
const controller = require("./controller");

guestRouter
    .post("/guest", controller.guest)

module.exports = guestRouter