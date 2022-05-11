const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    content: { type: String, require: true },
    title: { type: String, require: true },
    view: { type: Number, require: true, default: 0 },
    image: { type: String },
    userID: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    cateBlogID: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Category-Blog",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", Blog);
