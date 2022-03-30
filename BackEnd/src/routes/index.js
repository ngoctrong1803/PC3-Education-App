const express = require("express");
const router = express.Router();

const testRouter = require("./test");
const userRouter = require("./user");

function route(app) {
  app.use("/api/test", testRouter);
  app.use("/api/user", userRouter);
}

module.exports = route;
