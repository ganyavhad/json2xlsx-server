const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  fileName: String
});
module.exports = mongoose.model("File", schema);
