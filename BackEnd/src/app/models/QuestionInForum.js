const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionInForum = new Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    like: { type: Number, require: true, default: 0 },
    status: { type: Boolean },
    userID: { type: Schema.Types.ObjectId, ref: "User", require: true },
    catQueID: {
      type: Schema.Types.ObjectId,
      ref: "Category-Question",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Question-In-Forum", QuestionInForum);
