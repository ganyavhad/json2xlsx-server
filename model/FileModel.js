const File = require("../service/File");

let model = {
  saveFile: async function (fileName) {
    try {
      let file = new File({fileName: fileName, uploadTime: new Date()});
      return await file.save();
    } catch (error) {
      throw error;
    }
  },
  fetchFiles: async function () {
    try {
      return await File.find({}).sort({_id: -1});
    } catch (error) {
      throw error;
    }
  }
};
module.exports = model;
