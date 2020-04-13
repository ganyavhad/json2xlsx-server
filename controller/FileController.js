const Router = require("express").Router();

const FileModel = require("../model/FileModel");

Router.get("/", async (req, res) => {
  try {
    let files = await FileModel.fetchFiles();
    if (files && files[0]) {
      res.status(200).send(files);
    } else {
      res.status(404).send({message: "FileNotFound"});
    }
  } catch (error) {
    res.status(500).send(files);
  }
});

module.exports = Router;
