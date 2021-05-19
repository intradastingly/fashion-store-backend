/* export {}
const express = require("express");
const cookieRouter = express.Router();
const cookieSession = require("cookie-session");

cookieRouter
        .cookieSession({
                name: "session",
                secret: "SuperSecretKey",
                secure: false,
                maxAge: 100000 * 10,
                httpOnly: false,
                path: "/",
        })

module.exports = cookieRouter */