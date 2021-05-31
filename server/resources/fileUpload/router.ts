export {};
const express = require("express");
const fileUploadRouter = express.Router();
const controller = require("./controller");
const upload = require("./multer")

fileUploadRouter
    .post("/upload", upload.uploadImg, controller.upload)
    .get("/upload", controller.allImages)

module.exports = fileUploadRouter;