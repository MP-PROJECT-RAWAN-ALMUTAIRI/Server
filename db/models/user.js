const mongoose = require("mongoose");
const user = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
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
    // passwordCode: {
    //   type: String,
    // },
    // activeCode: {
    //   type: String,
    // },
    // active: {
    //   type: Boolean,
    //   default: false,
    // },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    Bio: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },  
    // <------------------------------------------------------------------->//
    // <------------ if the profile is public setit to true else false ------------> // 
  //   isPublic: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // }, 
   // <------------------------------------------------------------------->//
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", user);