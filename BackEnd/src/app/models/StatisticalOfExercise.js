const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticalOfExercise = new Schema(
  {
    score: { type: Number, require: true },
    isDone: { type: Boolean, require: true },
    time: { type: Number, require: true },
    totalAnswerTrue: { type: Number, require: true },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    lessionID: { type: Schema.Types.ObjectId, ref: "Lession" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Statistical-Of-Exercise",
  StatisticalOfExercise
);
