const mongoose = require("mongoose");

const ratting = new mongoose.Schema(
  { 
    ratting: {
      type: Number,
      required : true, 
      default: 0,
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