const Router = require("express").Router();

const JSONDataModel = require("../model/JSONDataModel");

Router.get("/", (req, res) => {
  res.json("Testing");
});
module.exports = Router;
