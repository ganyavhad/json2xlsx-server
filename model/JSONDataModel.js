const JSONData = require("../service/JSONData");
const fs = require("fs");
const json2xls = require("json2xls");
const Promise = require("bluebird");
let model = {
  convertXLSX: async function (data) {
    let obj = {};
    var xls = json2xls(data, {fields: {ts: "number", val: "number"}});
    fs.appendFileSync("data.xlsx", xls, "binary");
    return;
  },
  downloadExcel: async function (data, start = 0, end = 2000000) {
    let arr = this.makeInterator(end, 20);
    await Promise.map(
      arr,
      async (a) => {
        let jsondata = await JSONData.find({file: data.file})
          .skip(a.skip)
          .limit(a.limit);
        if (jsondata && jsondata[0]) {
          this.convertXLSX(jsondata);
        }
      },
      {concurrency: 4}
    );
    return;
  },
  makeInterator: function (count, len) {
    let arr = [];
    for (i = 0; i < len; i++) {
      arr.push({
        limit: Math.ceil(count / len),
        skip: i * Math.ceil(count / len)
      });
    }
    return arr;
  },
  upload: async function (filename, fileId, start = 0, end = 2000000) {
    try {
      let uploadedData = [];
      uploadedData = JSON.parse(
        fs.readFileSync(`uploads/${filename}`, "utf8")
      ).slice(start, end);
      if (uploadedData.length <= 0) {
        fs.unlinkSync(`uploads/${filename}`);
        return;
      }
      let dataToSave = this.chunk(uploadedData, 500000);
      await Promise.map(
        dataToSave,
        async (arr) => {
          await this.bulkPromise(arr, fileId);
        },
        {concurrency: 4}
      );
      return this.upload(filename, fileId, end, end + 2000000);
    } catch (error) {
      throw error;
    }
  },
  chunk: (arr, size) =>
    Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
      arr.slice(i * size, i * size + size)
    ),
  bulkPromise: async (data, fileId) => {
    try {
      let bulk = JSONData.collection.initializeUnorderedBulkOp();
      data.forEach((d) => {
        d.file = fileId;
        bulk.insert(d);
      });
      await bulk.execute();
      return;
    } catch (error) {
      throw error;
    }
  }
};
module.exports = model;
