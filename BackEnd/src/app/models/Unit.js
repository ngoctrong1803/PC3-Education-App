const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Unit = new Schema(
  {
    unitName: { type: String, required: true },
    subjectID: { type: Schema.Types.ObjectId, ref: "Subject" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Unit", Unit);
