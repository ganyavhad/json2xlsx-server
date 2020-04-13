const Router = require("express").Router();

const JSONDataModel = require("../model/JSONDataModel");
const FileModel = require("../model/FileModel");

var multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, name);
  }
});

Router.get("/", (req, res) => {
  res.json("Testing");
});
Router.post(
  "/upload",
  multer({storage: storage}).single("file"),
  async (req, res) => {
    try {
      let start = new Date();
      let fileData = await FileModel.saveFile(req.file.filename);
      await JSONDataModel.upload(req.file.filename, fileData._id);
      let end = new Date() - start;
      res
        .status(201)
        .send({message: `File uploaded successfully in ${end} seconds`});
    } catch (error) {
      console.log("error==>", error);
      res.status(500).send(error);
    }
  }
);

Router.get("/downloadExcel/:id", async (req, res) => {
  try {
    let start = new Date();
    console.log("req.params.id", req.params.id);
    await JSONDataModel.downloadExcel({file: req.params.id});
    res.download("data.xlsx");
  } catch (error) {
    console.log("error==>", error);
    res.status(500).send(error);
  }
});

module.exports = Router;
