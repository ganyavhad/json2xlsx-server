const File = require("../service/File");

let model = {
  saveFile: async function (fileName) {
    try {
      let file = new File({fileName: fileName});
      return await file.save();
    } catch (error) {
      throw error;
    }
  }
};
module.exports = model;
