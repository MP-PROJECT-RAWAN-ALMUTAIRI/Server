const mongoose = require("mongoose");

const post = new mongoose.Schema(
  {
    GitHubLink:{
      type: String,
      trim: true,
      default: "https://github.com/",
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pic: {
      type: String,
     require: true, 
      default:
        "https://images.prewarcar.com/pics/r2w-1200x800-products/3712/Bavaria_City_Races_2009_500.jpg",
    },
    file: {
      type: String, 
    },
    video: {
      type: String,
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

module.exports = mongoose.model("post", post);
