const mongoose = require("mongoose");
const followSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
module.exports = mongoose.model("follow", followSchema);
