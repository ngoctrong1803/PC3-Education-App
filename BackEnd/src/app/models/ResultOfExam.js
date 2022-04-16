const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultOfExam = new Schema({
  option: { type: String, require: true },
  statisticalID: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Statistical-Of-Exam",
  },
  exaQuesID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Exam-Question",
  },
});

module.exports = mongoose.model("Result-Of-Exam", ResultOfExam);
