const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Flashcard = new Schema(
  {
    meaningInEnglish: { type: String, require: true },
    meaninfInVietnamese: { type: String, require: true },
    star: { type: Boolean, require: true, default: false },
    forgetfulness: { type: Boolean, require: true, default: false },
    explain: { type: String },
    example: { type: String },
    shared: { type: Boolean, require: true, default: false },
    topicID: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Topic",
    },
    userID: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flashcard", Flashcard);
