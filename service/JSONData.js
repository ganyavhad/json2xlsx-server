const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  ts: {
    type: Number,
    required: true
  },
  val: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("JSONData", schema);
