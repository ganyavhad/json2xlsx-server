const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  ts: {
    type: Number,
    required: true
  },
  val: {
    type: Number,
    required: true
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  }
});
module.exports = mongoose.model("JSONData", schema);
