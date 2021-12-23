const mongoose = require("mongoose");

const like = new mongoose.Schema(
  {
    like: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("like", like);