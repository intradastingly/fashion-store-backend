export {};
import express from "express";
const Guest = require("./model");

exports.guest = async(req:any, res: express.Response) => {
    const guest = new Guest({
        userName: req.body.userName,
        role: req.body.role,
    });

    await guest.save()
    
    console.log(guest)
    
    req.session.username = guest.userName
    req.session.role = "guest"

    res.send(`You are logged in as ${req.session.username}`)
}