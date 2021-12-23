const mongoose = require("mongoose");
const user = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordCode: {
      type: String,
    },
    activeCode: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    avatar: {
      type: String,
      require: true,
      default:
        "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png",
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    //     {
    //         following(ref: follow)
    // followers(ref: follow)
    //     }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", user);
