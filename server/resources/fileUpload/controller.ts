import express from "express";
const fs = require("fs");

exports.upload = async (req: { fileValidationError: string; file: { filename: string; }; }, res: express.Response) => {
    if(req.fileValidationError){
        res.status(416).json("Invalid file type")
    } else {
        res.status(200).json(req.file.filename); 
    }   
}

exports.delete = async(req: express.Request, res: express.Response) => {
    const src = "..\\client\\public\\" + req.body.img;
    try{
        fs.unlinkSync(src)
    } catch(err){
        console.log(err)
    } 
    res.status(200).json();
} 


