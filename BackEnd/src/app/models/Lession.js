const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lession = new Schema(
  {
    lessionName: { type: String, require: true },
    unitID: { type: Schema.Types.ObjectId, ref: "Unit" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Lession", Lession);
