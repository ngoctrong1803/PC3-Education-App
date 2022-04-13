const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExamType = new Schema(
  {
    typeName: { type: String, require: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam-Type", ExamType);
