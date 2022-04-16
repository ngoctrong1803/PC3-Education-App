const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema(
  {
    roleName: { type: String, require: true, unique: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", Role);
