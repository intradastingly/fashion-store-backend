export {};
const express = require("express");
const fileUploadRouter = express.Router();
const controller = require("./controller");

fileUploadRouter
    .post("/upload", controller.upload)
    .get("/upload", controller.allImages)

module.exports = fileUploadRouter;