const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Lession = new Schema(
  {
    lessionName: { type: String, require: true },
    unitID: { type: Schema.Types.ObjectId, ref: "Unit" },
    lessionNumber: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Lession", Lession);
