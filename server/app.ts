const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 6969;
const app = express();
const cookieSession = require("cookie-session");
const productRouter = require("./resources/product/router");
const accountRouter = require("./resources/account/router");
const orderRouter = require("./resources/order/router");
const loginRouter = require("./resources/login/router");
/* const cookieRouter = require("./cookies") */
const shippingRouter = require("./resources/shipping/router");

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

    app.use(cookieSession({
      name: "session",
      secret: "SuperSecretKey",
      secure: false,
      maxAge: 100000 * 10,
      httpOnly: false,
      path: "/",
    }));
    app.use("/api", loginRouter);
    app.use("/api", productRouter);
    app.use("/api", accountRouter);
    app.use("/api", orderRouter);
    app.use("/api", shippingRouter);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
