import express from "express";
const Account = require("../account/model");
const bcrypt = require("bcrypt");

exports.login = async (req: any, res: express.Response) => {
  const { userName, password } = req.body;

  const account = await Account.findOne({ userName: userName }).select(
    "+password"
  );

  if (!account || !(await bcrypt.compare(password, account.password))) {
    console.log(password, "failed password");

    res.status(401).json("Incorrect password or username");
    return;
  }

  req.session.id = account.id;
  req.session.fullName = account.fullName;
  req.session.username = account.userName;
  req.session.email = account.email;
  req.session.address = account.address;
  
  res.status(200).json({ message: "Login successful", session: req.session });
};

exports.logout = async (req: any, res: express.Response) => {
  if (!req.session.id) {
    res.status(400).json("already logged out");
    return;
  }
  req.session = null;
  res.status(200).json("logout succ");
};

exports.authenticate = async (req: any, res: express.Response) => {
  if (req.session.id) {
    res.status(200).json(req.session);
  } else {
    res.status(401).json(null);
  }
};
