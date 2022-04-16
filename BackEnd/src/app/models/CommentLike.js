const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentLike = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    commentID: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment-Like", CommentLike);
