const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MCExercise = new Schema(
  {
    question: { type: String, require: true },
    option1: { type: String, require: true },
    option2: { type: String, require: true },
    option3: { type: String, require: true },
    option4: { type: String, require: true },
    answer: { type: String, require: true },
    explain: { type: String },
    recommend: { type: String },
    lessionID: { type: Schema.Types.ObjectId, ref: "Lession" },
    catExeID: { type: Schema.Types.ObjectId, ref: "Category-Exercise" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MCExercise", MCExercise);
