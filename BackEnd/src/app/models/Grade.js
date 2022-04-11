const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Grade = new Schema(
  {
    _id: { type: Number, required: true },
    gradeName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Grade", Grade);
