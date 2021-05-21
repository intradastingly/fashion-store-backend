export {};
import express from "express";
const Guest = require("./model");

exports.guest = async(req:any, res: express.Response) => {
        req.session.username = "guest"
        req.session.role = "guest"
        console.log(req.session.id)
        res.status(200).json(req.session)
}