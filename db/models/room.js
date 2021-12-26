const mongoose = require("mongoose");
const rommSchema = new mongoose.Schema({
  from:{type: mongoose.Schema.Types.ObjectId,ref:"users"},
  to:{type: mongoose.Schema.Types.ObjectId,ref:"users"},
  messages:[{type: mongoose.Schema.Types.ObjectId,ref:"message"}]


});
module.exports = mongoose.model("Room", rommSchema); 