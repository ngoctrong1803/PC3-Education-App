const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionLike = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    questionID: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Question-In-Forum",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question-Like", QuestionLike);
