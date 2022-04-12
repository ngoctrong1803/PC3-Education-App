const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultOfExercise = new Schema({
  option: { type: String, require: true },
  statisticalID: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Statistical-Of-Exercise",
  },
  MCExerciseID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "MCExercise",
  },
});

module.exports = mongoose.model("Result-Of-Exercise", ResultOfExercise);
