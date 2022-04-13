const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListenExercise = new Schema(
  {
    audio: { type: String, require: true },
    question: { type: String, require: true },
    option1: { type: String, require: true },
    option2: { type: String, require: true },
    option3: { type: String, require: true },
    option4: { type: String, require: true },
    content: { type: String, require: true },
    answer: { type: String, require: true },
    lessionID: { type: Schema.Types.ObjectId, ref: "Lession", require: true },
    catExeID: {
      type: Schema.Types.ObjectId,
      ref: "Category-Exercise",
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Listen-Exercise", ListenExercise);
