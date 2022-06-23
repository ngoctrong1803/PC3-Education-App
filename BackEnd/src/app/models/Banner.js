const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Banner = new Schema(
  {
    image: { type: String, require: true },
    description: { type: String, require: true },
    title: { type: String, require: true },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", Banner);
