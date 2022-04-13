const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamQuestion = new Schema(
  {
    question: { type: String, require: true },
    option1: { type: String, require: true },
    option2: { type: String, require: true },
    option3: { type: String, require: true },
    option4: { type: String, require: true },
    answer: { type: String, require: true },
    explain: { type: String },
    recommend: { type: String },
    examID: { type: Schema.Types.ObjectId, ref: "Exam" },
    catExeID: { type: Schema.Types.ObjectId, ref: "Category-Exercise" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam-Question", ExamQuestion);
