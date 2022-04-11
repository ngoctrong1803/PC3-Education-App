const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const loginRouter = require("./login");
const adminRouter = require("./admin");
const authRouter = require("./auth");
const subjectRouter = require("./subject");
const unitRouter = require("./unit");
const lessionRouter = require("./lession");
const theoryRouter = require("./theory");
const cateExerRouter = require("./categoryexercise");
const mcExerciseRouter = require("./mcexercise");

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/subjects", subjectRouter);
  app.use("/api/units", unitRouter);
  // note: lession haven't check admin
  app.use("/api/lession", lessionRouter);
  // note: theory haven't check admin
  app.use("/api/theory", theoryRouter);
  app.use("/api/category-exercise", cateExerRouter);
  app.use("/api/mcexercise", mcExerciseRouter);
}

module.exports = route;
