const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  fileName: String,
  uploadTime: Date
});
module.exports = mongoose.model("File", schema);
