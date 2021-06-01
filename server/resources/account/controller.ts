export { };
import { Request, Response } from "express";
const Account = require("./model");


// Create new
exports.newAccount = async (req: Request, res: Response) => {
  const account = new Account({
    userName: req.body.userName,
    fullName: req.body.fullName,
    role: req.body.role ? req.body.role : "plebian",
    password: req.body.password,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber
  });

  await account.save();
  res.status(201).json(account);
};

// Get all
exports.getAllAccounts = async (
  req: Request,
  res: Response
) => {
  const account = await Account.find();

  res.status(200).json(account);
};


// get specific 
exports.getSpecificAccount = async (
  req: Request,
  res: Response
) => {
  // Långa id crashar server? problem eller okej?
  const specificAccount = await Account.findOne({ _id: req.params.id });
  if (!specificAccount) {
    res.status(404).json("Account does not exist.")
  } else {
    res.status(201).json(specificAccount)
  }
};

//patch request for password updating
exports.updatePassword = async (
  req: Request,
  res: Response
) => {
  const oldAccount = await Account.findOne({ _id: req.params.id });
  if (req.body.password !== null && oldAccount){
    oldAccount.password = req.body.password
  }
  const updatedAccount = await oldAccount.save();
  res.status(201).json('Password updated ✔')
}


// Delete
exports.deleteAccount = async (req: Request, res: Response) => {
  const deletedAccount = await Account.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(deletedAccount);

};

// Edit
exports.editAccount = async (req: Request, res: Response) => {
  console.log(req.params.id, req.body, "THIS IS WHAT THE SERVER RECEIVES");

  const incomingAccount = req.body;
  const oldAccount = await Account.findOne({ _id: req.params.id });

  if (oldAccount) {
    const account = await Account.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: incomingAccount
      },
      { new: true }
    );
    res.status(200).json(account);
  } else {
    res.status(404).json("No account with this ID exists.");
  }
};
