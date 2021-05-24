export { };
import { profile } from "console";
import express from "express";
const Account = require("./model");


// Create new
exports.newAccount = async (req: express.Request, res: express.Response) => {
  const account = new Account({
    userName: req.body.userName,
    fullName: req.body.fullName,
    role: "plebian",
    password: req.body.password,
    email: req.body.email,
    address: req.body.address
  });

  await account.save();
  res.status(201).json(account);
};

// Get all
exports.getAllAccounts = async (
  req: express.Request,
  res: express.Response
) => {
  const account = await Account.find();

  res.status(200).json(account);
};

// get specific 
exports.getSpecificAccount = async (
  req: express.Request,
  res: express.Response
) => {
  // Långa id crashar server? problem eller okej?
  const specificAccount = await Account.findOne({ _id: req.params.id });
  if (!specificAccount) {
    res.status(404).json("Account does not exist.")
  } else {
    res.status(201).json(specificAccount)
  }
};


// Delete
exports.deleteAccount = async (req: express.Request, res: express.Response) => {
  const deletedAccount = await Account.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(deletedAccount);

};

// Edit
exports.editAccount = async (req: express.Request, res: express.Response) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        userName: req.body.userName,
        role: req.body.role,
        password: req.body.password,
      },
    },
    { new: true }
  );
  res.status(200).json(account);
};
