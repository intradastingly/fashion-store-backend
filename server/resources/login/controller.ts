export {};
import express from "express";
const Account = require("../account/model");

exports.login = async (req: any, res: express.Response) => {
    
    const { userName, password } = req.body;
    const account = await Account.findOne({ userName: userName });
    
 /*  if (!profile || !(await bcrypt.compare(password, profile.password))) {
    res.status(401).json("Incorrect password or username");
    return;
  } */

    req.session.id = account.id;
    req.session.userName = account.userName;
    req.session.role =  account.role;
    
    res.send(`You are logged in as ${req.session.userName}`)
    /* res.status(204).json(`You are logged in as ${req.session.userName}`); */
}

exports.logout = async (req: any, res: express.Response) => {
    if (!req.session.id) {
        res.status(400).json("already logged out");
        return;
      }
      req.session = null;
      res.status(200).json("logout succ");
}

exports.authenticate = async (req: any, res: express.Response) => {
    if(req.session){
      res.status(200).json(req.session)
    } else {
      res.status(401).json(null)
    }
}