const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema(
  {
    content: { type: String, require: true },
    summary: { type: String, require: true },
    userID: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", Report);
