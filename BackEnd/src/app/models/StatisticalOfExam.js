const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticalOfExam = new Schema(
  {
    score: { type: Number, require: true },
    isDone: { type: Boolean, require: true },
    time: { type: Number, require: true },
    totalAnswerTrue: { type: Number, require: true },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    examID: { type: Schema.Types.ObjectId, ref: "Exam" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Statistical-Of-Exam", StatisticalOfExam);
