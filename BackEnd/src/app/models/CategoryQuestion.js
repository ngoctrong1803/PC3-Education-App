const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryQuestion = new Schema(
  {
    catQueName: { type: String, require: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category-Question", CategoryQuestion);
