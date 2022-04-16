const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoryBlog = new Schema(
  {
    category: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category-Blog", CategoryBlog);
