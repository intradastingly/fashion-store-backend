import express from "express";
const fs = require('fs')



exports.upload = async (req: any, res: express.Response) => {
    res.status(200).json(req.file.filename);  
}

exports.delete = async(req: any, res: express.Response) => {
    const src = "..\\client\\public\\" + req.body.img;
    try{
        fs.unlinkSync(src)
    } catch(err){
        console.log(err)
    } 
    res.status(200).json();
} 

