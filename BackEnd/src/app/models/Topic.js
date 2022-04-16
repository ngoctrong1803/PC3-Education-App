const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topic = new Schema(
  {
    topicName: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", Topic);
