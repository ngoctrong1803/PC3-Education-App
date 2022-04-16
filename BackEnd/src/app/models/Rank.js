const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rank = new Schema(
  {
    score: { type: Number, require: true, default: 0 },
    victory: { type: Number, require: true, default: 0 },
    userID: {
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rank", Rank);
