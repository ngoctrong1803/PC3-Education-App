const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
    birthday: { type: Date, required: true },
    phone: { type: String, required: true },
    class: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", User);
