const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 6969;
const app = express();
const productRouter = require("./resources/product/router");

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
    app.use(express.json());
    app.use("/api", productRouter);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
