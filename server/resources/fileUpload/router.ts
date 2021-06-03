export { };
const express = require("express");
const fileUploadRouter = express.Router();
const controller = require("./controller");
const upload = require("./multer")

fileUploadRouter
    .post("/upload", upload.uploadImg, controller.upload)
    .delete("/upload", controller.delete)

export default fileUploadRouter;
