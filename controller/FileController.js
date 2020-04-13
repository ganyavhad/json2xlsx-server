const Router = require("express").Router();

const FileModel = require("../model/FileModel");

Router.get("/", (req, res) => {
  res.json("Testing");
});

module.exports = Router;
