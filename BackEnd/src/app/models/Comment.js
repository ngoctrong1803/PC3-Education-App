const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    content: { type: String, require: true },
    like: { type: Number, require: true, default: 0 },
    userID: { type: Schema.Types.ObjectId, ref: "User", require: true },
    questionID: {
      type: Schema.Types.ObjectId,
      ref: "Question-In-Forum",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comment", Comment);
