export {};
import express from "express";
const Account = require("./model");

// Create new product
exports.newAccount = async (req: express.Request, res: express.Response) => {
  const account = new Account({
    userName: req.body.userName,
    role: "plebian",

    // NEEDS TO BE HASHED
    password: req.body.password
  });

  await account.save();
  res.status(201).json(account);
};

// Get all the products
exports.getAllAccounts = async (
  req: express.Request,
  res: express.Response
) => {
  const account = await Account.find();

  res.status(200).json(account);
};

// Delete a product
exports.deleteAccount = async (req: express.Request, res: express.Response) => {
  const deletedAccount = await Account.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(deletedAccount);
};

// Edit a product
exports.editAccount = async (req: express.Request, res: express.Response) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        userName: req.body.userName,
        role: req.body.role,

        // NEEDS TO BE HASHED
        password: req.body.password
      },
    },
    { new: true }
  );
  res.status(200).json(account);
};
