import express from "express";
const fs = require("fs");

exports.upload = async (req: any, res: express.Response) => {
  res.status(200).json(req.file.filename);
};

exports.delete = async (req: any, res: express.Response) => {
  /* const path = process.env.PUBLIC_URL + "/" + req.body
    fs.unlinkSync(path)
    const deletedImage = await File.findOneAndDelete({ name: req.body.name });
    res.status(200).json(deletedImage);
    */
};
