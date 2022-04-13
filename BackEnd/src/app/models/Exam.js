const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exam = new Schema(
  {
    title: { type: String, require: true },
    time: { type: Number, require: true },
    totalQuestion: { type: Number, require: true },
    imageUrl: { type: String },
    subjectID: { type: Schema.Types.ObjectId, require: true, ref: "Subject" },
    exaTypID: { type: Schema.Types.ObjectId, require: true, ref: "Exam-Type" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", Exam);
