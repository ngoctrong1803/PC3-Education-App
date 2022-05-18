const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Subject = new Schema(
  {
    name: { type: String, required: true },
    gradeID: { type: Number, ref: "Grade" },
    image: { type: String },
    slug: { type: String, slug: ["name", "gradeID"], unique: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Subject", Subject);
