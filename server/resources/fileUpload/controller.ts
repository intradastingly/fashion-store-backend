import express from "express";
const File = require("../fileUpload/model")


exports.upload = async (req: any, res: express.Response) => {
    console.log(req.file)
    try {
        const newFile = await File.create({
          name: req.file.filename,
        });
        res.status(200).json(newFile.name);
      } catch (error) {
        res.json({
          error,
        });
      }
}

exports.allImages = (req: any, res: express.Response) => {
   
}