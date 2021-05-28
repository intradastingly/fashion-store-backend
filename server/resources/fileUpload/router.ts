export {};
const express = require("express");
const fileUploadRouter = express.Router();
const controller = require("./controller");
const multer = require("multer")
const upload = multer({dest: '../client/public/assets'})

fileUploadRouter
    .post("/upload", upload.single('img'), controller.upload)
    .get("/upload", controller.allImages)

module.exports = fileUploadRouter;