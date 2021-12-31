const mongoose = require("mongoose");

const question = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    //
    // push & pull 
    //
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", question);
