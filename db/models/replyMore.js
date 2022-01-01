const mongoose = require("mongoose");

const moreReply = new mongoose.Schema(
  { 
    moreReply: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reply",
      required: true,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("moreReply", moreReply);
