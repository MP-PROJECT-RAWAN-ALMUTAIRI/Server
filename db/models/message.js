const mongoose = require("mongoose");
const messcageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  content: { type: String },
});
module.exports = mongoose.model("message", messcageSchema);
