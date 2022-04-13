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
const statisticalOfExerciseRouter = require("./statisticalofexercise");
const resultOfExerciseRouter = require("./resultofexercise");
const listenExerciseRouter = require("./listenexercise");
const rewSenExerciseRouter = require("./rewsenexercise");
const gapfillExerciseRouter = require("./gapfillexercise");
const examTypeRouter = require("./examtype");
const examRouter = require("./exam");
const statisticalOfExamRouter = require("./statisticalofExam");
const examQuestionRouter = require("./examquestion");
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
  app.use("/api/statistical-of-exercise", statisticalOfExerciseRouter);
  app.use("/api/result-of-exercise", resultOfExerciseRouter);
  app.use("/api/listen-exercise", listenExerciseRouter);
  app.use("/api/rewrite-sentences-exercise", rewSenExerciseRouter);
  app.use("/api/gap-fill-exercise", gapfillExerciseRouter);
  app.use("/api/exam-type", examTypeRouter);
  app.use("/api/exam", examRouter);
  app.use("/api/statistical-of-exam", statisticalOfExamRouter);
  app.use("/api/exam-question", examQuestionRouter);
}

module.exports = route;
