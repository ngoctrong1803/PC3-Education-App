const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Theory = new Schema(
  {
    content: { type: String },
    lessionID: { type: Schema.Types.ObjectId, ref: "Lession" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Theory", Theory);
