const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewriteSentencesExercise = new Schema(
  {
    question: { type: String, require: true },
    answer: { type: String, require: true },
    recommend: { type: String, require: true },
    explain: { type: String, require: true },
    lessionID: { type: Schema.Types.ObjectId, ref: "Lession", require: true },
    catExeID: {
      type: Schema.Types.ObjectId,
      ref: "Category-Exercise",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(
  "Rewrite-Sentences-Exercise",
  RewriteSentencesExercise
);
