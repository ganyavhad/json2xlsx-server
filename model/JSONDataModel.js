const JSONData = require("../service/JSONData");
const fs = require("fs");

let model = {
  upload: async (data) => {
    try {
      console.log(data.filename);
      let uploadedData = fs.readFileSync(`uploads/${data.filename}`, "utf8");
      console.log(JSON.parse(uploadedData).length);
      const dataToSave = JSON.parse(uploadedData);
      await JSONData.insertMany(dataToSave);
      return;
    } catch (err) {
      throw err;
    }
  }
};
module.exports = model;
