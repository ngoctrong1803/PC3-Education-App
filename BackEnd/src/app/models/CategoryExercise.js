const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoryExercise = new Schema(
  {
    typeName: { type: String, require: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category-Exercise", CategoryExercise);
