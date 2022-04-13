const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GapFillingExercise = new Schema({
  content: { type: String, require: true },
  totalGap: { type: Number, require: true },
  answer: { type: Array, require: true },
  lessionID: { type: Schema.Types.ObjectId, ref: "Lession", require: true },
  catExeID: {
    type: Schema.Types.ObjectId,
    ref: "Category-Exercise",
    require: true,
  },
});
module.exports = mongoose.model("Gap-Filling-Exercise", GapFillingExercise);
