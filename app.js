const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const mongoose = require("mongoose");
const JSONDataController = require("./controller/JSONDataController");
const FileController = require("./controller/FileController");
mongoose
  .connect("mongodb://localhost:27017/Assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("connection failed"));

app.use("/JSONData", JSONDataController);
app.use("/File", FileController);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
