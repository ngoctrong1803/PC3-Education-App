const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token = new Schema(
  {
    refreshtoken: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Token", Token);
