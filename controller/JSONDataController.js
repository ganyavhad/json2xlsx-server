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
      console.log("File", req.file);
      await JSONDataModel.upload(req.file);
      res.status(201).send("File uploaded successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
module.exports = Router;
