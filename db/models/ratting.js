const mongoose = require("mongoose");

const ratting = new mongoose.Schema(
  {
    ratting: {
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

module.exports = mongoose.model("ratting", ratting);