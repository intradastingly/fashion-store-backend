export {};
const mongoose = require("mongoose");

function getDatabase() {
  const uri =
    "mongodb+srv://admin:admin@cluster0.4v0hr.mongodb.net/yousef?retryWrites=true&w=majority";

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("You're now connected to the database.");
    });
}

module.exports = getDatabase;
