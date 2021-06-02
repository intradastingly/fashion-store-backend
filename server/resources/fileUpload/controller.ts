import express from "express";
const fs = require('fs')



exports.upload = async (req: any, res: express.Response) => {
    console.log(req.file.path, "hello")
    res.status(200).json(req.file.filename);  
}

exports.delete = async(req: any, res: express.Response) => {
    console.log(req.body)
    const src = "..\client\public\" + req.body
    try{
        fs.unlinkSync(src)
    } catch(err){
        console.log(err)
    } 
    res.status(200).json();
} 

