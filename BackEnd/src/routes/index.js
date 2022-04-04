const express = require("express");
const router = express.Router();

const testRouter = require("./test");
const userRouter = require("./user");
const loginRouter = require("./login");
const adminRouter = require("./admin");
const authRouter = require("./auth")

function route(app) {
  app.use("/api/test", testRouter);
  app.use("/api/user", userRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/auth", authRouter)
}

module.exports = route;
