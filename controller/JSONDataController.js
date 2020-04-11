const Router = require("express").Router();

const JSONDataModel = require("../model/JSONDataModel");

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
      await JSONDataModel.upload(req.file.filename);
      let end = new Date() - start;
      res.status(201).send(`File uploaded successfully in ${end} seconds`);
    } catch (error) {
      console.log("error==>", error);
      res.status(500).send(error);
    }
  }
);

module.exports = Router;
